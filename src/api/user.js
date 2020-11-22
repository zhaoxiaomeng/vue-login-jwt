import axios from '../libs/ajaxRequest'

// 用户相关的接口

// 调获取用户信息的接口  向外暴露一个getUser方法  这个方法中调了接口
// 在组件中，就可以使用getUser，就相当于调用接口
export const getUser = ()=>{
    return axios.request({
        url:'/user',
        method:'get'
    })
}

// 再向外暴露一个登录的方法，方法内部也是调接口
// 在登录组件中就可以调用Login方法，需要给方法传递一个用户名
export const login = (username)=>{
    return axios.request({
        url:'/login',
        method:'post',
        data:{
            username
        }
    })
}

//验证token方法  
export const validate = ()=>{
    return axios.request({
        url:'/validate',
        method:'get'
    })
}