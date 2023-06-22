const { getTodoList, createATodo, completeATodo, deleteATodo, deleteAllTodos } = require('../services/todo.service');


const getTodo = async (req, res)=>{
    try{
        

        const data = await getTodoList()
        if(data.error){
            res.status(500).json({error: data.error})
        }
        res.status(200).json({todoList: data.todoList})
    }
    catch(err){
        console.log(err);
        res.status(400).json({error: err});
    }
        
};


const createTodo =  async (req, res)=>{
    try{
        
        const data = await createATodo(req.body.content)
        if(data.error){
            res.status(500).json({error: data.error})
        }
        res.status(201).json({newTodo: data.newTodo})
        
    }
    catch(err){
        console.log(err);
        res.status(400).json({error: err});
    }
    
};


const completeTodo = async (req, res)=>{
    try{
        const taskId = req.params.id;

        const data = await completeATodo(taskId)
        if(data.error){
            res.status(500).json({error: data.error})
        }
        res.status(200).json({completedTodo: data.completedTodo})
        
        
    }
    catch(err){
        console.log(err);
        res.status(400).json({error: err});
    }
    
};


const deleteTodo =  async (req, res)=>{
    try{
        const taskId = req.params.id; 

        const data = await deleteATodo(taskId)
        if(data.error){
            res.status(500).json({error: data.error})
        }
        res.status(200).json({deletedTodo: data.deletedTodo})
        
    }
    catch(err){
        console.log(err);
        res.status(400).json({error: err});
    }
};


const deletAllTodo = async (req, res)=>{
    try{
        
        const data = await deleteAllTodos()
        if(data.error){
            res.status(500).json({error: data.error})
        }
        res.status(200).json({deletedTodos: data.deletedTodos})
    }
    catch(err){
        console.log(err);
        res.status(400).json({error: err});
    }
};

module.exports = {
    getTodo,
    createTodo,
    completeTodo,
    deleteTodo,
    deletAllTodo
}
