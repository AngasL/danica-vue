<template>
    <div class="w_search">
        <div class="w_title">
            <div class="titleImg" @click="backHome">
              <img src="../../pages/wowprime/report/img/home_back.png" alt="">
            </div>
            <p>营运月报</p>
        </div>
        <div class="search">
          <div class="brandSearch">
            <select class="brandIdList" name="brand" id="" v-model="brandId_R" @change='brandBtn'>
              <option value="">全部品牌</option>
              <option v-for='(item, index) in brandList' :value="item.brandCode">
                  {{ item.brandName }}
              </option>
            </select>
            <img src="../../pages/wowprime/report/img/brandDown.png" alt="">
          </div>
          <div class="dateSearch">
            <group>
              <datetime
                  v-model="queryDateR"
                  @on-change="change"
                  @on-cancel="log('cancel')"
                  @on-confirm="onConfirm"
                  @on-hide="log('hide', $event)"
                  :end-date="onlySetEndDate">
              </datetime>
            </group>
          </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Main from "../../assets/js/main";
import { Datetime, Group, XButton } from "vux";
export default {
  name: "",
  data() {
    return {
      loading: false,
      brandList: [],
      brandId_R: "",
      queryDateR: Main.GetDay(),
      onlySetEndDate: ""
    };
  },
  computed: {
    ...mapState(["base"]),
    queryDateR() {
      return this.base.queryDateR;
    },
    brandId_R() {
      return this.base.brandId;
    },
    brandId_RName() {
      return this.base.brandId_RName;
    }
  },
  components: {
    Datetime,
    Group
  },
  methods: {
    ...mapActions(["httpPost"]),
    ...mapMutations(["set_base"]),
    backHome() {
      this.$router.push({ name: "w_dataView" });
      this.set_base({ prop: "brandId", val: "" });
      this.set_base({ prop: "brandName", val: "" });
      this.set_base({ prop: "brandId_R", val: "" });
      this.set_base({ prop: "brandId_RName", val: "" });
    },
    log(str1, str2 = "") {
      //   console.log(str1, str2)
    },

    onConfirm(val) {
      //   console.log('on-confirm arg', val)
      //   console.log('current value', this.queryDate)
    },
    change(value) {
      //   console.log('change', index)
      this.set_base({ prop: "queryDateR", val: this.queryDateR });
    },
    setToday() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    brandBtn(item) {
      var brandId_RName = $(".brandIdList option:selected").text();
      this.set_base({ prop: "brandId_R", val: this.brandId_R });
      this.set_base({ prop: "brandId_RName", val: brandId_RName });
    },
    brandData() {
      this.loading = true;
      let data = {
        data: {}
      };
      this.httpPost({
        url: this.base.url + "/user/getUserBrand",
        data: data
      })
        .then(res => {
          this.loading = false;
          if (res.rspCode == "0000") {
            if (res.data) {
              this.brandList = res.data.brandList;
            } else {
              // this.$message.error('没有数据');
            }
          } else if (res.rspCode == "1111") {
            //   this.$message.error('请求不合理');
          } else if (res.rspCode == "1999") {
            setTimeout(
              function() {
                //   this.$router.push({ name: 'w_login'})
                this.$message.error("会话超时");
              }.bind(this),
              500
            );
            //   this.$message.error('会话超时');
          }
        })
        .catch(res => {});
    }
  },
  mounted() {
    // sessionStorage.setItem("brandM", this.brandId);
    this.onlySetEndDate = this.setToday();
    this.set_base({ prop: "queryDateR", val: Main.GetDay() });
    this.brandData();
  },
  watch: {}
};
</script>
<style lang="less" type="text/less">
.w_search {
  .w_title {
    background: #2f75b5;
    width: 100%;
    height: 0.64rem;
    line-height: 0.64rem;
    text-align: center;
    .titleImg {
      width: 0.3rem;
      height: 0.275rem;
      margin-left: 0.1rem;
      margin-top: 0.12rem;
      margin-right: -1rem;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      color: #ffffff;
      margin-left: -0.05rem;
    }
  }
  .search {
    height: 0.39rem;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    // font-size: 0.13rem;
    font-size: 15px;
    .brandSearch {
      flex: 1;
      text-align: center;
      // margin-left: 15%;
      border-right: 1px solid #2f75b5;
      .brandIdList {
        width: 90%;
        border: none;
        outline: none;
        background: #ffffff;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        // color: #9c9c9c;
        // font-size: 0.13rem;
        font-size: 15px;
        option {
          // color: #9c9c9c;
          text-align: center;
          font-size: 0.13rem;
        }
      }
      img {
        width: 0.15rem;
        height: 0.15rem;
        // float: right;
        position: absolute;
        right: 2.05rem;
        top: 0.75rem;
        // margin-right: 0.25rem;
        // margin-top: 0.03rem;
      }
    }
    .dateSearch {
      flex: 1;
      text-align: center;
      .vux-cell-value {
        color: #000000;
      }
      .weui-cells {
        // font-size: 0.13rem;
        font-size: 14px;
      }
      .vux-no-group-title {
        // margin-top: -0.1em;
        margin-top: 0.1em;
      }
      img {
        width: 0.15rem;
        height: 0.1rem;
        float: right;
        margin-right: 0.25rem;
        margin-top: 0.03rem;
      }
    }
  }
}
</style>