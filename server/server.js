const express = require('express');
const mongoose = require('mongoose');
const todoRouter = require('./controller/todo.controller');
const cors = require('cors');

var app = express();

var port = process.env.PORT || 3000;


app.use(cors({origin: "*"}));
app.use(express.json());

app.use(todoRouter)


const start = async () => {
try {
    console.log("Starting server ...")
    await mongoose.connect("mongodb://mongo:27017/todo", {
    useNewUrlParser: true
    });
    console.log("Connected to the database todo")
    app.listen(port, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();

module.exports = app;