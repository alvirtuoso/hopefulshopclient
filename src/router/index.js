import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

// Components used in routing
import App from '@/App';
import ItemDetail from '@/components/ItemDetail'
import CartItems from '@/components/CartItems'

import About from '@/components/About'
import Landing from '@/components/Landing'
import Privacy from '@/components/PrivacyPolicy'
import Middle from '@/components/Middle'
import Dashboard from '@/components/Dashboard'
import Test from '@/components/Test'
import Login from '@/components/Login'

Vue.use(VueRouter)

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', component: App,
                children:[
                    { path: '/', component: Landing },
                    { path: 'detail', component: ItemDetail, props: true },
                    { path: 'search', component: Middle },
                    { path: 'cart', component: CartItems },
                    { path: 'about', component: About },
                    { path: 'privacy', component: Privacy },
                    { path: 'dash', component: Dashboard , meta: { requiresAuth: true } },
                    { path: 'login', component: Login },
                    { path: '/:id', component: Landing },
                ]
        },
        // ** These paths won't work until the children array is removed **
        // {path: '/login', component: Login},
        // {path: '/dash', component: Dashboard},
    ]
})

// ** Global navigation guard beforeEach is called whenever a navigation is triggered
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth){
      if(!currentUser){
          next({
              path: '/login',
              query: { redirect: to.fullPath }
          })
      }else{
          next()
      }
  }else{
      next()
  } 
// //   if (requiresAuth && !currentUser) next('login')
// //   else if (!requiresAuth && currentUser) next('dash')
//   else next()
})

export default router