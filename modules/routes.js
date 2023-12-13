// Handles all routes
const express = require("express");
const path = require("path");
const app = express();
const auth = require("./auth");

app.post("/api/verify", (req,res)=>{
 res.end()
 console.log("Sent")
})

app.post("/signup", auth.signup);

// For rendering
app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/../front/index.html"));
});
module.exports = app;
