import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
import '../assets/base.scss'
import App from './app.vue'
import './index.scss'

routes.push({
  path: '/',
  redirect: '/calendar',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log({ to })
  chrome.runtime.sendMessage({ message: 'check_access_token' }, (response) => {
    if (response.status !== 'success') {
      return next('/popup')
    }
  })

  if (to.path === '/') {
    return next('/popup')
  }

  next()
})

createApp(App).use(router).mount('#app')
