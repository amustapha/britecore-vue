import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Insurances from '@/components/Insurances'
import CreateRisk from '@/components/CreateRisk'
import ViewSubmissions from '@/components/ViewSubmissions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Insurances',
      component: Insurances
    },
    {
      path: '/new-risk',
      name: 'CreateRisk',
      component: CreateRisk
    },
    {
      path: '/:id/submissions',
      name: 'ViewSubmissions',
      component: ViewSubmissions
    },
    {
      path: '/:id',
      name: 'InsuranceForm',
      component: Form
    }
  ]
})
