import Vue from 'vue'
import App from './App.vue'
import ArrWatch from '../src/index.js'
import './assets/style.css'

Vue.use(ArrWatch)
new Vue({
  render: (h) => h(App)
}).$mount('#app')
