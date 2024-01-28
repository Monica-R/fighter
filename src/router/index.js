import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/Views/Main'
import SelectionCharacter from '@/Views/SelectionCharacter'
import SelectionBackground from '@/Views/SelectionBackground'
import Play from '@/Views/Play'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/selection-character',
      name: 'selection-character',
      component: SelectionCharacter
    },
    {
      path: '/next',
      name: 'next',
      component: SelectionBackground
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    }
  ]
})
