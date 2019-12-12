<template>
  <div>
    <div class="box6">
      <div class="titles">
        门店营业额查询
      </div>
      <p class="chooseShow">
          当前条件：
          <span>{{typeChoose}}</span>
          <span>{{dateChoose}}</span>
          <span>{{brandChoose}}</span>
          <span>{{marketChoose}}</span>
          <span>{{operationChoose}}</span>
      </p>
       <ul class="title">
          <li>门店名称</li>
          <li style="margin-left:0.1rem;">营业额</li>
          <!-- <li>订单数</li> -->
          <li style="margin-left:-0.1rem;">达成率</li>
          <li>客数</li>
      </ul>
      <ul class="title special">
        <li></li>
        <li style="margin-left:0.5rem;">{{shopTurnoverShow}}</li>
        <!-- <li></li> -->
        <li>(%)</li>
        <li style="margin-left:0.1rem;"><span>{{countShow}}</span></li>
      </ul>
      <ul class="turnover" v-for="item in shopList">
        <li class="discBox bColor1 discBox1"><a href="javascript:;">{{item.shopName}}</a></li>
        <li class="turnover2" style="color:#000000;">{{item.shopTurnover|capitalize|numformat1}}</li>
        <!-- <li class="turnover3">{{item.shopTc}}</li> -->
        <li v-bind:class="[item.reachRate>=100 ? 'greenShow' : 'redShow']" style="text-align:right;">{{item.reachRate|capitalize}}</li>
        <li class="turnover5" style="color:#000000;">{{item.shopGuestsCount|capitalize|numformat1}}</li>
      </ul>
    </div>       
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Main from "../assets/js/main.js";
export default {
  name: "",
  data() {
    return {
      loading: false,
      brandChoose: "",
      marketChoose: "",
      operationChoose: "",
      dateChoose: "",
      typeChoose: "",
      shopList: [],
      sumList: [],
      shopTurnover: "",
      // shopTc:'',
      reachRate: "",
      shopTurnover: "",
      shopGuestsCount: "",
      countShow: "",
      countSumShow: "",
      shopTurnoverShow: ""
      //   shopTurnoverSumShow:''
    };
  },
  computed: {
    ...mapState(["base"]),
    queryDate() {
      return this.base.queryDate;
    },
    brandId() {
      return this.base.brandId;
    },
    brandName() {
      return this.base.brandName;
    },
    marketId() {
      return this.base.marketId;
    },
    marketName() {
      return this.base.marketName;
    },
    operationId() {
      return this.base.operationId;
    },
    operationName() {
      return this.base.operationName;
    },
    queryType() {
      return this.base.queryType;
    }
  },
  methods: {
    ...mapActions(["httpPost"]),
    ...mapMutations(["set_base"]),

    brandScoreData() {
      this.loading = true;
      let data = {
        data: {
          queryDate: this.queryDate,
          queryType: this.queryType
        }
      };
      if (this.brandId) {
        data.data.brandCode = this.brandId;
      }
      this.brandChoose = this.brandName;
      if (this.queryDate) {
        this.dateChoose = this.queryDate;
      }
      if (this.marketId) {
        data.data.marketCode = this.marketId;
      }
      this.marketChoose = this.marketName;
      if (this.operationId) {
        data.data.operationCode = this.operationId;
      }
      this.operationChoose = this.operationName;
      if (this.queryType) {
        if (this.queryType == "00") {
          this.typeChoose = "日报表";
          if (this.queryDate) {
            this.dateChoose = this.queryDate;
          }
        } else if (this.queryType == "01") {
          this.typeChoose = "月报表";
          if (this.queryDate) {
            this.dateChoose = this.queryDate.slice(0, 7);
          }
        } else if (this.queryType == "02") {
          this.typeChoose = "年报表";
          if (this.queryDate) {
            this.dateChoose = this.queryDate.slice(0, 4);
          }
        }
      }
      this.httpPost({
        url: this.base.url + "/shop/queryShopTurnover",
        data: data
      })
        .then(res => {
          this.loading = false;
          if (res.rspCode == "0000") {
            if (res.data) {
              if (this.queryType) {
                if (this.queryType == "00") {
                  this.countShow = "";
                  this.countSumShow = "";
                  this.shopTurnoverShow = "(元)";
                  // this.shopTurnoverSumShow = '(元)'
                } else if (this.queryType == "01") {
                  this.countShow = "";
                  this.countSumShow = "";
                  this.shopTurnoverShow = "(万元)";
                  // this.shopTurnoverSumShow = '(万元)'
                } else if (this.queryType == "02") {
                  this.countShow = "(万)";
                  this.countSumShow = "(万)";
                  this.shopTurnoverShow = "(万元)";
                  // this.shopTurnoverSumShow = '(万元)'
                }
              }
              this.shopList = res.data.shopList;
              this.sumList = res.data;
              var sum1 = 0;
              //  var sum2 = 0;
              var sum3 = 0;
              var sum4 = 0;
              for (var i in this.shopList) {
                var item1 = this.shopList[i].shopTurnover;
                // var item2 = this.shopList[i].shopTc;
                var item3 = this.shopList[i].reachRate;
                var item4 = this.shopList[i].shopGuestsCount;
                sum1 += item1;
                // sum2 += item2;
                sum3 += item3;
                sum4 += item4;
              }
              //    console.log(sum1)
              if (sum1 != undefined) {
                this.shopTurnover = sum1.toFixed(2);
              }
              // this.shopTc = sum2;
              // this.reachRate = sum3.toFixed(2);
              this.shopGuestsCount = sum4;
            } else {
              // this.$message.error('没有数据');
            }
          } else if (res.rspCode == "1111") {
            //   this.$message.error('请求不合理');
            alert("业务繁忙，请稍后再试!");
            // this.$router.push({ name: 'w_login'})
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
    this.brandScoreData();
  },
  watch: {
    brandId() {
      this.brandScoreData();
    },
    marketId() {
      this.brandScoreData();
    },
    operationId() {
      this.brandScoreData();
    },
    queryDate() {
      this.brandScoreData();
    },
    queryType() {
      this.brandScoreData();
    }
  }
};
</script>
<style lang="less" type="text/less">
.box6 {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  // margin: 0.2rem 0.1rem;
  background: #ffffff;
  .chooseShow {
    min-height: 0.3rem;
    line-height: 0.3rem;
    padding-left: 0.05rem;
    font-size: 15px;
    background: #ddebf7;
    span {
      margin-right: 0.05rem;
    }
  }
  .sumTitle {
    border-top: 1px solid #e9ebeb;
    padding: 0.1rem 0;
    //   margin-bottom:-0.15rem;
    font-weight: normal;
  }
  ul {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    align-items: center;
    -webkit-align-items: center;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    font-size: 15px;
    margin-left: 0;
    margin-bottom: 0;
    vertical-align: middle;
    li {
      margin-top: 0.1rem;
      margin-bottom: 0.1rem;
    }
  }
  .special {
    margin-top: -0.15rem;
  }
  .turnover:nth-of-type(odd) {
    background: #ddebf7;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>