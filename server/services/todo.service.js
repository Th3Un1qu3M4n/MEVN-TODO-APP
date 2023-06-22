const Todo = require('../schemas/todo.schema');


const getTodoList = async ()=>{
    try{
        const todoList = await Todo.find().sort({creation_time: -1});
        return {todoList};
    }
    catch(err){
        console.log(err);
        return {error: err}
    }
        
};


const createATodo =  async (content)=>{
    try{

        const newTask = new Todo({
            content: content
        });
        
        const newTodo = await Todo.create(newTask)
        return {newTodo}
        
    }
    catch(err){
        console.log(err);
        return{error: err};
    }
    
};


const completeATodo = async (taskId)=>{
    try{
                
        const completedTodo = await Todo.findByIdAndUpdate(taskId, {is_completed: true, completed_time: Date.now()}, {new: true})
        console.log(completedTodo);
        return {completedTodo};
        
    }
    catch(err){
        console.log(err);
        return{error: err};
    }
    
};


const deleteATodo =  async (taskId)=>{
    try{

        
        const deletedTodo = await Todo.findByIdAndDelete(taskId)
        console.log(deletedTodo);
        return{deletedTodo};
        
    }
    catch(err){
        console.log(err);
        return{error: err};
    }
};


const deleteAllTodos = async ()=>{
    try{        
        const deletedTodos = await Todo.deleteMany()
        console.log(deletedTodos);
        return{deletedTodos};
        
    }
    catch(err){
        console.log(err);
        return{error: err};
    }
};

module.exports = {
    getTodoList,
    createATodo,
    completeATodo,
    deleteATodo,
    deleteAllTodos
}
