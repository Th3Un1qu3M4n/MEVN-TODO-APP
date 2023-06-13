<template>
  <div class="bottom-container">
    <Form>
      <MenuIcon class="icon-2x form-icon "/>
      <input v-model="todoText" type="text" placeholder="Enter To do today" id="todo"  v-on:keydown.enter.prevent="handleSubmit">
      <ChevronDownIcon class="icon-2x form-icon" @click="handleSubmit"/>
    </Form>
    <transition-group name="todoList" class="todoListContainer"  tag="div">
      <div v-if="loading"  class="task-card">
        <p>Loading ...</p>
      </div>

      <div v-if="!loading && listItems.length < 1" class="task-card">
        <p>No todos available</p>
      </div>
      <div v-for="(itemObj) in listItems" v-bind:key="itemObj._id" class="task-card">
        <TodoItem :item="itemObj" v-on:deleteTodoItem="deleteTodo" v-on:completeTodoItem="completeTodo"/>
      </div>
    </transition-group>
  </div>
</template>


<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
import TodoItem from '@/components/TodoItem.vue'
import {createTodo, getTodos, deleteTodoById, completeTodoById} from '@/api/todo.api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'TodoList',
  components: {
    MenuIcon,
    ChevronDownIcon,
    TodoItem,
  },
  data() {
      return {
        listItems: [],
        todoText: "",
        loading: true,
      }
    },
    methods: {
      async handleSubmit() {
        try{
            
          const finalRes = await createTodo(this.todoText);
          this.todoText = "";
          this.listItems.unshift(finalRes.newTodo);
        } catch (error) {
          console.log("request failed")
          toast("Some Problem Occured", {
            autoClose: 500,
          });
        }
      },
      async getData() {
        try {
          const finalRes = await getTodos();
          this.listItems = finalRes.todoList;
          this.loading = false;
          
        } catch (error) {
          console.log("request failed")
          toast("Some Problem Occured", {
            autoClose: 500,
          });
        }
      },
      async deleteTodo(id) {
        try{
              
            const finalRes = await deleteTodoById(id);
            if(finalRes.deletedTodo) {
              this.listItems = this.listItems.filter(item => item._id !== id);
            }
            toast("Todo Deleted", {
              autoClose: 500,
            });
        } catch (error) {
            console.log("request failed")
            toast("Some Problem Occured", {
            autoClose: 500,
          });
          }
      },
      async completeTodo(id) {
        try{
            
          const finalRes = await completeTodoById(id);
          if(finalRes.completedTodo) {
            this.listItems = this.listItems.map(item => {
              if(item._id === id) {
                item.is_completed = true;
                item.completed_time = finalRes.completedTodo.completed_time;
              }
              return item;
            });
          toast("Todo Marked Completed", {
            autoClose: 500,
          });
          }
        } catch (error) {
          console.log("request failed")
          toast("Some Problem Occured", {
            autoClose: 500,
          });
        }
      }
    },
    mounted() {
      this.getData()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-container{
  display: flex;
  flex-direction: column;
  width: 300px;
  overflow: hidden;
}

form{
    /* height: 520px; */
    width: 100%;
    background-color: rgba(0,0,0,0.3);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    /* padding: 50px 35px; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
    /* background-color: red; */
}
.form-icon{
  padding: 10px;
  cursor: pointer;
}

.todoListContainer{
  padding-top: 10px;
}


.material-design-icon.icon-2x {
  height: 2em;
  width: 2em;
}

.material-design-icon.icon-2x > .material-design-icon__svg {
  height: 2em;
  width: 2em;
}
.checkedIcon{
  color: #948267;
}


input{
    display: block;
    height: 50px;
    /* flex-grow: auto; */
    width: 80%;
    background-color: rgba(255,255,255,0.00);
    border: none;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    color: #fff;
    font-weight: bold;
}
input:focus {
  border: none;
  outline: none;
  color: #fff;
  font-weight: bold;

}
::placeholder{
    color: #ffffff;
    font-weight: bold;
    font-size: 20px;
}
.TodoInnerContainer{
  /* width: 100%; */
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #606060;
  background-color: #ffffff;
  font-weight: 300;
  font-size: 20px;
  text-align: center;
  border-radius: 30px;
}


.todoList-enter-active, .todoList-leave-active {
  transition: .4s ease all;
}
.todoList-enter-from{
  opacity: 0;
  transform: scale(0.6);
}
.todoList-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.task-card{
  padding: 10px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255,255,255,0.53);
  backdrop-filter: blur(10px);
  border-top: rgba(0,0,0,0.13) 2px solid;
  /* background-color: red; */
}

.task-card:first-of-type{
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top: none;
}
.task-card:last-of-type{
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom: none;
}
</style>
