import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'



require('@/store/subscriber')

axios.defaults.baseURL='http://localhost:14934/api'

// store.dispatch('auth/attempt',localStorage.getItem('token'))
store.dispatch('auth/attempt',{
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user')
})


createApp(App).use(store).use(router).mount('#app')
