<template>
  <div class="home">
    <h1>首页面</h1>
    <p>当前登录的用户名是{{$store.state.username}}</p>
  </div>
</template>

<script>
//如果用export导出的话，要用这种形式，相当于解构赋值
import {getUser} from '../api/user'
export default {
  name:'home',
  async mounted(){
    let r = await getUser()
    console.log(r);
  }
}
</script>
