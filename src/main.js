// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'

Vue.use(Buefy)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = 'https://bh6xka8e5l.execute-api.us-west-2.amazonaws.com/dev/'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
