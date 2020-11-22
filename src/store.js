import Vue from 'vue'
import Vuex from 'vuex'
import {login,validate} from './api/user'   //必须用这种方式引入
import {setLocal} from './libs/local'   //引入lib文件夹下的local.js文件中的setLocal方法（往localStorage里存放token）

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //定义动画是否显示
    isShowLoading:false,
    username:'wangcai'
  },
  mutations: {
    //使动画显示
    showLoading(state){
      state.isShowLoading = true;
    },
    //使动画隐藏
    hideLoading(state){
      state.isShowLoading = false;
    },
    //定义修改用户名的方法
    setUser(state,username){
      state.username = username
    }
  },
  // actions存放接口的调用  dispatch actions里面放方法
  actions: {
    //这里面所有的方法都是异步的

    //登录方法
    async toLogin({commit},username){
      let r = await login(username) //调用user.js中的login方法，也就是调用登录接口
      // console.log(r);
      if(r.code === 0){   //登录成功后会给你返回json数据，里面有code
        //登录成功了
        commit('setUser',r.username)  //修改用户名
        setLocal('token',r.token)   //把得到的token存到localStorage里
      }else{
        // console.log('............');
        return Promise.reject(r.data);  //如果失败，返回一个promise失败态
      }
    },

    //验证token方法
    async validate({commit}){
      let r = await validate(); //调用user.js中的validate方法，也就是调用验证接口
      if(r.code === 0){
        commit('setUser',r.username)
        setLocal('token',r.token) //我们说了，验证通过，或者每次切换路由时，都要重新生成token
      }
      return r.code === 0;  //返回token是否失效,true或者false
    }
  }
})