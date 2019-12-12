<template>
    <div class="w_login">
        <img src="./img/logos.png" class="w_login_logo" alt="" >
        <input type="text" value="" v-model="UserId">
        <x-button v-on:click.native="Login" style="width: 85%" :gradients="['#2f75b5', '#2f75b5']">登&nbsp;&nbsp;&nbsp;&nbsp;录</x-button>
    </div>
</template>
<script>
import { XButton } from "vux";
import { mapState, mapActions } from "vuex";
export default {
  name: "traderecord",
  data() {
    return {
      UserId: ""
    };
  },
  created() {
    //  this.UserId=this.getURLParameters(location.href).UserId
    if (!this.UserId) {
      //调无权限
    }
  },
  computed: {
    ...mapState(["base"])
  },
  components: {
    XButton
  },
  methods: {
    ...mapActions(["httpPost", "httpLogin"]),

    getURLParameters(url) {
      //返回当前url参数
      return url
        .match(/([^?=&]+)(=([^&]*))/g)
        .reduce(
          (a, v) => (
            (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
          ),
          {}
        );
    },
    Login() {
      // console.log(12341234324)
      let data = {
        data: {
          UserId: this.UserId,
          Code: ""
        }
      };
      this.httpLogin({
        url: this.base.url + "/user/getUserInfo",
        data: data
      })
        .then(res => {
          if (res.rspCode == "0000") {
            if (res.data.resultCode == "00") {
              //  console.log(123)
              var userMenuList = JSON.stringify(res.data.userMenuList);
              // console.log(userMenuList)
              sessionStorage.setItem("token", res.data.token);
              sessionStorage.setItem("userMenuList", userMenuList);
              // this.set_base({prop:'userMenuList',val:userMenuList})
              //跳首页
              this.$router.push({ name: "w_dataView" });
            } else {
              alert(res.data.resultMesg);
            }
          } else {
            if (res == "1111") {
              //code有问题，
            } else {
              //登录失败
            }
          }
        })
        .catch(res => {});
    }
  },
  mounted() {},
  watch: {}
};
</script>
<style lang="less"  type="text/less">
// html,body{
//   height:100%;
// }
.w_login {
  background: #414241;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  .w_login_logo {
    display: inline-block;
    margin-top: 1.35rem;
    margin-bottom: 1.08rem;
  }
  input {
    width: 3.07rem;
    height: 0.4rem;
    padding-left: 0.5rem;
    margin-bottom: 0.2rem;
  }
  .inp_txt {
    margin-bottom: 0.12rem;
  }
  .inp {
    position: relative;
    i {
      position: absolute;
      width: 0.49rem;
      height: 0.38rem;
      left: 0.34rem;
      top: 0.01rem;
      background: url("./img/pwd.jpg") no-repeat;
      background-size: 0.49rem 0.38rem;
    }
    .inp_t {
      background: url("./img/user.jpg") no-repeat;
      background-size: 0.49rem 0.38rem;
    }
  }
  .inp_c {
    line-height: 0.18rem;
    text-align: left;
    color: #fff;
    font-size: 0.12rem;
    margin: 0.09rem 0 0.4rem 0.34rem;
    .inp_chek {
      display: inline-block;
      float: left;
      width: 0.18rem;
      height: 0.18rem;
    }
    span {
      margin-left: 0.08rem;
    }
  }
}
</style>
