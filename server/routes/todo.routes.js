const { getTodo, deleteTodo, deletAllTodo, completeTodo, createTodo } = require('../controllers/todo.controller');
const todoRouter = require("express").Router();

//route to get all the tasks
todoRouter.get("/todo", async (req, res)=>{
    return await getTodo(req, res);        
});

//route to add a new task
todoRouter.post("/todo", async (req, res)=>{
    return await createTodo(req, res);
    
});

todoRouter.post("/todo/complete/:id", async (req, res)=>{
    return await completeTodo(req, res);
    
});

//route for deleting a task
todoRouter.delete("/todo/:id", async (req, res)=>{
    return await deleteTodo(req, res);
});

//route for deleting all the tasks
todoRouter.delete("/todo", async (req, res)=>{
    return await deletAllTodo(req, res);
});

module.exports = todoRouter;