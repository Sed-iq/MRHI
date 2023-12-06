const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use("/assets", express.static(path.join(__dirname + "/front/assets")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/front/index.html"));
});
app.listen(
  process.env.PORT,
  console.log(`running on port ${process.env.PORT}`)
);
