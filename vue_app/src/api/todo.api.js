const createTodo = async (todoText) => {
    try{
        
        if(todoText === "") return;

        const res = await fetch(process.env.VUE_APP_BACKEND_URL+"/todo", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: todoText
        })
        });
        

        const finalRes = await res.json();
        return finalRes;
    } catch (error) {
        console.log("request failed")
    }
}

const getTodos = async () => {
    try {
      const res = await fetch(process.env.VUE_APP_BACKEND_URL+"/todo");
      const finalRes = await res.json();
      return finalRes
    } catch (error) {
      console.log("request failed")
    }
  }
  
const deleteTodoById =   async (id) => {
    try{
          
        const res = await fetch(process.env.VUE_APP_BACKEND_URL+"/todo/"+id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const finalRes = await res.json();
        return finalRes;
    } catch (error) {
        console.log("request failed")
      }
  }
const completeTodoById = async (id) => {
    try{
        
      
      const res = await fetch(process.env.VUE_APP_BACKEND_URL+"/todo/complete/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const finalRes = await res.json();
      return finalRes;
    } catch (error) {
      console.log("request failed")
    }
  }

export {
    createTodo,
    getTodos,
    deleteTodoById,
    completeTodoById
}