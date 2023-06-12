<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div class="top-container">
    <div class="profile">
      <img class="rounded-image" src="./assets/profile.png"/>
    </div>
  </div>
  <TodoList />

</template>

<script>


import TodoList from "@/components/TodoList.vue"

export default {
  name: 'Todo-App',
  components: {
    TodoList
  },
    
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
  align-items: center;
}
.top-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  width: 300px;
  margin: 50px;
  padding-bottom: 10px;
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
</style>
