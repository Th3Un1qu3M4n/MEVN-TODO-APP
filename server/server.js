const express = require('express');
const mongoose = require('mongoose');
const todoRouter = require('./controller/todo.controller');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

console.log("process.env", process.env)

// "mongodb://mongo:27017/todo"
const dbUrl = process.env.MongoUrl || "mongodb://127.0.0.1:27017/todo"


app.use(cors({origin: "*"}));
app.use(express.json());

app.use(todoRouter)


const start = async () => {
try {
    console.log("Starting server ...")
    await mongoose.connect(dbUrl, {
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