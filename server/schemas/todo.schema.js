const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    content: {type: String, required: true},
    is_completed: {type: Boolean, default: false},
    completed_time: {type: Date, default: null},
    creation_time: {type: Date, default: Date.now},
  },
);

module.exports =  mongoose.model("todos", Todo);