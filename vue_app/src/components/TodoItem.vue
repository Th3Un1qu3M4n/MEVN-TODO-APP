<template>
  <!-- <h2>{{ name }}</h2> -->
        <CheckCircle v-if="item.is_completed" class="form-icon checkedIcon"/>
        <CircleOutline v-else class="form-icon" v-on:click="$emit('completeTodoItem',item._id)"/>
      
        <div class="content">
          <h2>{{item.content}} {{ name }}</h2>
          <div class="timestamps">
            <small v-if="item.is_completed">Completed: {{ (new Date(item.completed_time)).toLocaleString() }}</small>
            <small v-else>Created: {{ (new Date(item.creation_time)).toLocaleString() }}</small>

          </div>
        </div>
        <Delete class="icon-2x form-icon" v-on:click="$emit('deleteTodoItem',item._id)"/>
</template>


<script>
import CircleOutline from 'vue-material-design-icons/CircleOutline.vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';
import Delete from 'vue-material-design-icons/Delete.vue';

export default {
  name: 'TodoItem',
  props: ['item'],
  components: {
    CircleOutline,
    CheckCircle,
    Delete
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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


.content{
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 500;
  justify-content: start;
  align-items: center;
  text-align: left;
  /* background-color: red; */
}
h2{
  width: 100%;
  text-align: left;
  font-weight: 500;
  /* background-color: red; */
}
.timestamps{
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-weight: 100;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 14px;
  /* background-color: red; */
}
</style>
