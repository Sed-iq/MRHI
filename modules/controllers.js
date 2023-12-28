// Contains a bunch of controllers needed
const schema = require("./schema");
const { User, Event } = schema;
module.exports.Logout = (req, res) => {
  res.clearCookie("user").end();
};
module.exports.Dashboard = (req, res) => {
  try {
    const { user } = req;

    User.findById(user)
      .then((data) => {
        if (data) {
          const body = {
            name: data.name,
            id: data._id,
            email: data.email,
            image: data.picture,
          };
          res.json({ body });
        } else throw data;
      })
      .catch((err) => {
        console.log(err);
        sendErr(500, res);
      });
  } catch (error) {
    sendErr(500, res);
    console.log(error);
  }
};
module.exports.Create_Event = async (req, res) => {
  try {
    const { title, type, date, tags, duration, description } = req.body;
    if (!title || !type || !date || !tags || !duration || !description) {
      console.log(req.body);
      throw "Fill in all fields";
    } else {
      const event = new Event({
        title,
        type,
        date,
        creator: req.user,
        tags,
        duration,
        description,
      });
      event
        .save()
        .then((data) => {
          if (data) {
            console.log(data);
            res.json({ body: data._id });
          } else throw "Error";
        })
        .catch((err) => {
          console.log(err);
          sendErr(500, res);
        });
    }
  } catch (error) {
    console.log(error);
    sendErr(500, res);
  }
};

module.exports.Events_Getter = async (req, res) => {
  try {
    Event.find()
      .then((data) => {
        if (data) {
          res.json(data);
        } else throw data;
      })
      .catch((err) => sendErr(404, res));
  } catch (error) {
    console.log(error);
    sendErr(500, res);
  }
};

module.exports.Events = async (req, res) => {
  try {
    const seminars = await Event.find({ type: "seminar" });
    const webinars = await Event.find({ type: "webinar" });
    res.json({ seminars, webinars });
  } catch (error) {
    console.log(error);
    sendErr(500, res);
  }
};

module.exports.Event = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      Event.findById(id)
        .then((data) => {
          if (data) {
            res.json(data);
          } else throw "Not Found";
        })
        .catch((err) => {
          sendErr(404, res);
        });
    } else throw "No id";
  } catch (error) {
    console.log(error);
    sendErr(500, res);
  }
};

function sendErr(status, res) {
  res.status(status).end();
}
