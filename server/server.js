const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo.routes');
const mongooseConnectDB = require('./configs/db.config');

const app = express();

const port = process.env.PORT || 3000;

console.log("process.env", process.env.NODE_ENV)

// "mongodb://mongo:27017/todo"


app.use(cors({origin: "*"}));
app.use(express.json());

app.use(todoRouter)


const start = async () => {
try {
    console.log("Starting server ...")
    
    await mongooseConnectDB();
    app.listen(port, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();

module.exports = app;