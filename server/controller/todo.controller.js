const Todo = require('../schemas/todo.schema');
const todoRouter = require("express").Router();

//route to get all the tasks
todoRouter.get("/todo", async (req, res)=>{
    try{
        const todoList = await Todo.find().sort({creation_time: -1});
        console.log("Retreving TodoList ",todoList.length)
        res.json({todoList});
    }
    catch(err){
        console.log(err);
        res.json({error: err});
    }
        
});

//route to add a new task
todoRouter.post("/todo", async (req, res)=>{
    try{

        const newTask = new Todo({
            content: req.body.content,
        });
        
        const newTodo = await Todo.create(newTask)
        console.log(newTodo);
        res.status(201).json({newTodo});
        
    }
    catch(err){
        console.log(err);
        res.json({error: err});
    }
    
});

todoRouter.post("/todo/complete/:id", async (req, res)=>{
    try{
        const taskId = req.params.id;


        
        const completedTodo = await Todo.findByIdAndUpdate(taskId, {is_completed: true, completed_time: Date.now()}, {new: true})
        console.log(completedTodo);
        res.json({completedTodo});
        
    }
    catch(err){
        console.log(err);
        res.json({error: err});
    }
    
});

//route for deleting a task
todoRouter.delete("/todo/:id", async (req, res)=>{
    try{
        const taskId = req.params.id; 

        
        const deletedTodo = await Todo.findByIdAndDelete(taskId)
        console.log(deletedTodo);
        res.json({deletedTodo});
        
    }
    catch(err){
        console.log(err);
        res.json({error: err});
    }
});

//route for deleting all the tasks
todoRouter.delete("/todo", async (req, res)=>{
    try{        
        const deletedTodos = await Todo.deleteMany()
        console.log(deletedTodos);
        res.json({deletedTodos});
        
    }
    catch(err){
        console.log(err);
        res.json({error: err});
    }
});

module.exports = todoRouter;