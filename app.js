const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const routes = require("./modules/routes");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname + "/front/assets")));
app.use(routes);
mongoose
  .connect(process.env.DB)
  .then(() =>
    app.listen(
      process.env.PORT,
      console.log(`running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => {
    console.log(err);
    process.exit(4);
  });
