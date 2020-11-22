import axios from 'axios'
import store from '../store'
import {getLocal} from "./local"

//当第一次请求时，显示loading  
class AjaxRequest {
    //当new的时候，调用这个方法
    constructor() {
        //请求的基础路径
        this.baseURL = process.env.NODE_ENV == "production" ? "/" : "http://localhost:3000"
        this.timeout = 3000 //超时时间
        this.queue = {} //存放每一次的请求
    }
    //合并参数
    merge(options) {
        return {
            ...options,
            baseURL: this.baseURL,
            timeout: this.timeout
        }
    }
    //封装一个拦截方法
    setInterceptor(instance, url) {
        //请求拦截，每次请求时，都要加上一个loading效果
        instance.interceptors.request.use((config) => {
            //每次请求时，都给他加一个Authorization头，在JWT验证时要用
            config.headers.Authorization = getLocal('token')
            //第一次请求时，显示loading动画
            if (Object.keys(this.queue).length === 0) {
                store.commit('showLoading')
            }
            this.queue[url] = url;
            return config
        })
        //响应拦截  
        instance.interceptors.response.use((res) => {
            //删除queue里面的链接，如果同一个按钮，你一秒之内点击无数次，但是他只处理第一次操作
            delete this.queue[url]
            //隐藏loading动画
            if (Object.keys(this.queue).length === 0) {
                store.commit('hideLoading')
            }
            //返回的结果
            return res.data
        })
    }
    request(options) {
        let instance = axios.create()   //创建一个axios实例
        this.setInterceptor(instance, options.url) //设置拦截
        let config = this.merge(options)
        return instance(config)     //axios执行后，返回promise
    }
}

export default new AjaxRequest;