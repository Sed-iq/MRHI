// Handles all authentication
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const schema = require("./schema.js");
const { User } = schema;
var cookieopts = {
  maxAge: 60 * 300 * 1000,
  httpOnly: true,
  sameSite: "lax",
};
module.exports.signup = async (req, res) => {
  try {
    const { email, name, password, image } = req.body;
    if (!email || !name || !password) {
      throw "Fill in all Fields";
    } else {
      // All fields filled
      const find = await User.findOne({ email });
      if (find != null) {
        console.log("Email is already used");
        sendErr(400, res);
      } else {
        const $password = await bcrypt.hash(password, 10);
        const user = new User({
          email: email,
          password: $password,
          picture: image || "",
          name: name,
        });
        user
          .save()
          .then((data) => {
            const token = jwt.sign({ id: data._id }, process.env.SECRET, {
              expiresIn: "5hrs",
            });
            console.log(token);
            res.cookie("user", token, cookieopts);
            res.end();
          })
          .catch((err) => {
            console.log(err);
            sendErr(404, res);
          });
      }
    }
  } catch (err) {
    console.log(err);
    sendErr(404, res);
  }
};
module.exports.passive_verify = (req, res, done) => {
  try {
    const { user } = req.cookies;
    if (user) {
      jwt.verify(user, process.env.SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          const { id } = decoded;
          req.user = id;
          done();
        }
      });
    } else throw "No cookie";
  } catch (err) {
    sendErr(404, res);
  }
};
module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw "Fields cannot be blank";
    } else {
      User.findOne({ email })
        .then(async (data) => {
          const $password = await bcrypt.compare(password, data.password);
          if ($password) {
            const token = jwt.sign({ id: data._id }, process.env.SECRET, {
              expiresIn: "5hrs",
            });
            res.cookie("user", token, cookieopts);
            res.end();
          } else throw $password;
        })
        .catch((err) => {
          console.log(err);
          sendErr(500, res);
        });
    }
  } catch (err) {
    console.log(err);
    sendErr(500, res);
  }
};
module.exports.verify = (req, res) => {
  // Regular Verification
  try {
    const { user } = req.cookies;
    if (user) {
      jwt.verify(user, process.env.SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          const { id } = decoded;
          res.end();
        }
      });
    } else {
      throw null;
    }
  } catch (error) {
    // console.log(error);
    sendErr(404, res);
  }
};
function sendErr(status, res) {
  res.status(status).end();
}
