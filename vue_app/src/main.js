import { createApp } from 'vue'
import App from './App.vue'
// import moment from 'moment'

const app = createApp(App)
app.mount('#app')
// app.config.globalProperties.$filters = {
//     timeAgo(date) {
//       return moment(date).fromNow()
//     },
//   }
