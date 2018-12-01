import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Insurances from '@/components/Insurances'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Insurances',
      component: Insurances
    },
    {
      path: '/:id',
      name: 'Insurance Form',
      component: Form
    }
  ]
})
