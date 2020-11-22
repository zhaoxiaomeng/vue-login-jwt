import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入iView
import iView from 'iview'
import 'iview/dist/styles/iview.css';

Vue.use(iView)

Vue.config.productionTip = false

//每一次切换路由时，都执行这个导航守卫
router.beforeEach(async (to,from,next)=>{
  let isLogin = await store.dispatch('validate')  //判断是否登录了
  // needLogin  表示哪些路由需要在登录条件下才能访问
  // console.log(to);
  let needLogin = to.matched.some(match=>match.meta.needLogin)
  if(needLogin){
    //需要登录
    if(isLogin){
      //登录过了
      next()
    }else{
      //没有登录
      next('/login')
    }
  }else{
    //不需要登录
    if(isLogin && to.path === '/login'){  //如果你访问login页面，则给你跳到首页面，因为不需要登录
      next('/')
    }else{
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')