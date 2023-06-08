<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div class="top-container">
    <div class="profile">
      <img class="rounded-image" src="./assets/profile.png"/>
    </div>
    <Form>
      <MenuIcon class="icon-2x form-icon"/>
      <input v-model="todoText" type="text" placeholder="To do today" id="todo"  v-on:keydown.enter.prevent="handleSubmit">
      <ChevronDownIcon class="icon-2x form-icon" @click="handleSubmit"/>
    </Form>
  </div>
  <!-- <div > -->
    <!-- <div  class="bottom-container"> -->
    <transition-group name="todoList"  class="bottom-container" tag="div">
      
      <!-- <transition-group name="list"> -->
      <div v-for="(item) in listItems" v-bind:key="item._id" class="task-card">
        
        <CheckCircle v-if="item.is_completed" class="form-icon checkedIcon"/>
        <CircleOutline v-else class="form-icon" v-on:click="completeTodo(item._id)"/>
      
        <div class="content">
          <h2>{{item.content}}</h2>
          <!-- <small>{{item.creation_time}}</small> -->
          <div class="timestamps">
            <small v-if="item.is_completed">Completed: {{ $filters.timeAgo(item.completed_time) }}</small>
            <small v-else>Created: {{ $filters.timeAgo(item.creation_time) }}</small>

          </div>
        </div>
        <Drag class="icon-2x form-icon" v-on:click="deleteTodo(item._id)"/>
      </div>
      <!-- </transition-group> -->
      </transition-group>
    <!-- </div> -->
    <!-- <div v-for="(item, index) in listItems" v-bind:key="index" class="bottom-container">
      <div class="task-card"><CheckCircle class="form-icon"/><h2>Breakfast</h2><Drag class="icon-2x form-icon"/></div>
      <div class="task-card"><CircleOutline class="form-icon"/><h2>Explore the world</h2><Drag class="icon-2x form-icon"/></div>
      <div class="task-card"><CircleOutline class="form-icon"/><h2>Hello World</h2><Drag class="icon-2x form-icon"/></div>
    </div> -->
  <!-- </div> -->

</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
import CircleOutline from 'vue-material-design-icons/CircleOutline.vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';
import Drag from 'vue-material-design-icons/Drag.vue';


export default {
  name: 'Todo-App',
  components: {
    MenuIcon,
    ChevronDownIcon,
    CircleOutline,
    CheckCircle,
    Drag
  },
  data() {
      return {
        listItems: [],
        todoText: ''
      }
    },
    methods: {
      async handleSubmit() {
        try{
            
          if(this.todoText === "") return;

          const res = await fetch(process.env.VUE_APP_BACKEND_URL+"/todo", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              content: this.todoText
            })
          });
          this.todoText = "";

          const finalRes = await res.json();
          this.listItems.unshift(finalRes.newTodo);
        } catch (error) {
          console.log("request failed")
          alert("Unable to connect to backend server")
        }
      },
      async getData() {
        try {
          console.log("VUE_APP_BACKEND_URL",process.env.VUE_APP_BACKEND_URL)
          const res = await fetch(process.env.VUE_APP_BACKEND_URL+"/todo");
          const finalRes = await res.json();
          this.listItems = finalRes.todoList;
          
        } catch (error) {
          console.log("request failed")
          alert("Unable to connect to backend server")
        }
      },
      async deleteTodo(id) {
        try{
              
            console.log(id);
            const res = await fetch(process.env.VUE_APP_BACKEND_URL+"/todo/"+id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const finalRes = await res.json();
            if(finalRes.deletedTodo) {
              this.listItems = this.listItems.filter(item => item._id !== id);
            }
        } catch (error) {
            console.log("request failed")
            alert("Unable to connect to backend server")
          }
      },
      async completeTodo(id) {
        try{
            
          console.log(id);
          const res = await fetch(process.env.VUE_APP_BACKEND_URL+"/todo/complete/"+id, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const finalRes = await res.json();
          if(finalRes.completedTodo) {
            this.listItems = this.listItems.map(item => {
              if(item._id === id) {
                item.is_completed = true;
                item.completed_time = finalRes.completedTodo.completed_time;
              }
              return item;
            });
          }
        } catch (error) {
          console.log("request failed")
          alert("Unable to connect to backend server")
        }
      }
    },
    mounted() {
      this.getData()
    }
}
</script>

<style>
* { margin: 0 !important; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  background-image: url('~@/assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 5vh;
  /* justify-content: center; */
  align-items: center;
  /* position: relative; */
}
.top-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  width: 300px;
  /* max-width: 350px; */
  /* border: red 2px solid; */
  margin: 50px;
  /* background-color: green; */
  padding-bottom: 10px;
}
.bottom-container{
  display: flex;
  flex-direction: column;
  /* min-width: 300px;
  max-width: 350px; */
  width: 300px;
  /* background-color: yellowgreen; */
  /* display: none; */
  overflow: hidden;
}
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}

.rounded-image {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 500px;
  border: 3px solid #9e9e9e;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
form{
    /* height: 520px; */
    width: 100%;
    background-color: rgba(0,0,0,0.03);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 15px rgba(8,7,16,0.6);
    /* padding: 50px 35px; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background-color: red; */
}
.form-icon{
  padding: 10px;
  cursor: pointer;
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
    color: #fff;
    font-weight: bold;
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


.task-card .content{
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 500;
  justify-content: start;
  align-items: center;
  text-align: left;
  /* background-color: red; */
}
.task-card h2{
  width: 100%;
  text-align: left;
  font-weight: 500;
  /* background-color: red; */
}
.task-card .timestamps{
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-weight: 100;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 16px;
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
