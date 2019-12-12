<template>
    <div class="w_Login">
        
    </div>
</template>
<script>
import { XButton } from "vux";
import { mapState, mapActions } from "vuex";
export default {
  name: "traderecord",
  data() {
    return {
      Code: ""
    };
  },
  created() {
    this.Code = this.getURLParameters(location.href).Code;
    if (!this.Code) {
      //调无权限
      alert("鉴权失败！");
      return;
    }
  },
  computed: {
    ...mapState(["base"])
  },
  components: {},
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
      let data = {
        data: {
          Code: this.Code
        }
      };
      // console.log(data)

      this.httpLogin({
        url: this.base.url + "/user/getUserInfo",
        data: data
      })
        .then(res => {
          if (res.rspCode == "0000") {
            if (res.data.resultCode == "00") {
              var userMenuList = JSON.stringify(res.data.userMenuList);
              sessionStorage.setItem("token", res.data.token);
              sessionStorage.setItem("userMenuList", userMenuList);
              //跳首页
              this.$router.push({ name: "w_dataView" });
            } else {
              alert(res.data.resultMesg);
            }
          } else {
            if (res == "1111") {
              //code有问题
            } else {
              //登录失败
            }
          }
        })
        .catch(res => {});
    }
  },
  mounted() {
    this.Login();
  },
  watch: {}
};
</script>
<style lang="less"  type="text/less">
</style>
