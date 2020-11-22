<template>
  <div class="login">
    <div class="header">
      <div class="header-center fl">
        <div class="header-title">登录界面</div>
        <div class="header-img"></div>
      </div>
      <div class="header-bottom fl"></div>
    </div>

    <div class="content">
      <div class="content-left">
        <!--<img src="images/d.png" alt="">-->
      </div>
      <div class="content-right">
        <div class="right-infp">
          <div class="right-infp-name">
            <input
              type="text"
              v-model="username"
              placeholder="请输入用户名..."
              maxlength="12"
              required=""
              value=""
              autocomplete="off"
            />
          </div>
          <div class="right-infp-name">
            <input
              type="password"
              v-model="password"
              placeholder="请输入密码..."
              autocomplete="off"
            />
          </div>

          <div class="right-infp-btn">
            <button class="btn" @click="login()">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"; //使用vuex中的mapActions方法，不会的请参考我的文章vuex的使用方法
export default {
  data() {
    return {
      username: "", //定义一个用户名
    };
  },
  methods: {
    ...mapActions(["toLogin"]), //获取store.js文件中的actions中的toLogin方法
    login() {
      // console.log(this['toLogin'](this.username));
      //使用获取到的toLogin方法
      this["toLogin"](this.username).then(
        (data) => {
          //因为toLogin返回的是一个Promise，所以可以.then

          console.log(data);
          this.$router.push("/"); //登录成功，跳到首页面
        },
        (err) => {
          this.$Message.error(err);
        }
      );
    },
  },
};
</script>
<style scoped>


.login {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
}

/*澶撮儴*/
.header {
  width: 100%;
  height: 75px;
  /*background: red;*/
}

.header .header-center {
  width: 50%;
  height: 60px;
  position: relative;
  margin: 0 auto;
}
.header .header-center .header-title {
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  text-shadow: 0 0 0.3rem #00d8ff;
  line-height: 1.05rem;
}
.header .header-img {
  background: url("../assets/head.gif") no-repeat center center;
  background-size: 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 40px;
}

.content {
  width: 100%;
  height: 100%;
  /*background: green;*/
  margin: 50px auto 0 auto;
  /*border: 1px solid green;*/
}
.content .content-left {
  width:310px;
  height: 290px;
  /*border: 1px solid red;*/
  background: url("../assets/d.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.4rem 0;
  box-sizing: border-box;
  margin-right: 2%;
  float: left;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.content .content-left {
  -webkit-transform: rotate(360deg);
  animation: rotation 15s linear infinite;
  -moz-animation: rotation 15s linear infinite;
  -webkit-animation: rotation 15s linear infinite;
  -o-animation: rotation 15s linear infinite;
}

.content .content-right {
  width: 5.4rem;
  height: 5.8rem;
  background: url("../assets/e.png") no-repeat;
  background-size: 100% 100%;
  float: right;
  position: relative;
}
.right-infp {
  width: 4rem;
  height: 3rem;
  margin: auto auto;
  /* border: 1px solid red;*/
  vertical-align: center;
  position: absolute;
  top: 1.6rem;
  left: 0.9rem;
}
.right-infp-name {
  background: url("../assets/b.png") no-repeat;
  width: 100%;
  height: 0.5rem;
  background-size: 100% 100%;
  line-height: 0.45rem;
  margin-bottom: 0.4rem;
  position: relative;
}
.right-infp-name input {
  width: 85%;
  border: none;
  box-sizing: border-box;
  height: 0.5rem;
  margin-left: 0.5rem;
  line-height: 0.4rem;
  background: none !important;
  color: #00eaff;
  padding-left: 0.15rem;
  /*box-shadow: 0 0 1px #00eaff;*/
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  position: absolute;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
.right-infp-btn {
  background: url("../assets/a.png") no-repeat;
  width: 100%;
  height: 0.5rem;
  background-size: 100% 100%;
  line-height: 0.5rem;
  margin-bottom: 0.4rem;
  position: relative;
}
.right-infp-btn .btn {
  width: 95%;
  border: none;
  box-sizing: border-box;
  height: 0.45rem;
  margin-left: 0.1rem;
  font-size: 0.22rem;
  cursor: pointer;
  background: none;
  outline: none;
  color: #fff;
  position: absolute;
}
.right-infp-btn .btn:hover {
}
</style>