// Handles all routes
const express = require("express");
const path = require("path");
const app = express();
const auth = require("./auth");
const cookie = require("cookie-parser");
const controllers = require("./controllers");

app.use(cookie(process.env.SECRET));
app.post("/api/verify", auth.verify); // To check if authenticated

app.post("/api/events", controllers.Events_Getter); // Get all events
app.post("/api/events/:id", controllers.Event);
app.post("/api/profile", auth.passive_verify, controllers.Dashboard);
app.post("/api/signup", auth.signup);
app.post("/api/signin", auth.signin);
app.post("/api/create_event", auth.passive_verify, controllers.Create_Event);

app.delete("/api/logout", auth.passive_verify, controllers.Logout);
// For rendering
app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/../front/index.html"));
});
module.exports = app;
