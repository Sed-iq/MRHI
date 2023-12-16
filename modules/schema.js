const mongoose = require("mongoose");

module.exports.Event = mongoose.model(
  "event",
  mongoose.Schema(
    {
      title: {
        type: String,
        requried: true,
      },
      creator: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      type: {
        type: String,
        requried: true,
      },
      date: {
        type: Date,
        requried: true,
      },
      tags: {
        type: Array,
        required: true,
      },
      duration: {
        type: Array,
        required: true,
      },
    },
    { timestamps: true }
  )
);
module.exports.User = mongoose.model(
  "user",
  mongoose.Schema(
    {
      name: {
        type: String,
        requried: true,
      },
      email: {
        type: String,
        requried: true,
      },
      password: {
        type: String,
        requried: true,
      },
      picture: {
        type: String,
      },
    },
    { timestamps: true }
  )
);
