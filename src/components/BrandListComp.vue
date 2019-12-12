<template>
    <div>
        <div class="box2" id="box3">
            <div class="titles">
                集团总体概况-可比店
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
                <li style="margin-left:0.05rem;">品牌</li>
                <li style="margin-left:-0.05rem;">店数</li>
                <li>营业额</li>
                <li>客数</li>
                <li>客单价</li>
            </ul>
            <ul class="title special">
                <li></li>
                <li></li>
                <li style="margin-left:0;">(万元)</li>
                <li style="margin-left:-0.15rem;"><span>{{countShow}}</span></li>
                <li style="margin-left:-0.05rem;">(元)</li>
            </ul>
            <ul class="shop" v-for="item in brandList">
                <li class="discBox bColor1"><a href="javascript:;">{{item.brandName}}</a></li>
                <li class="shop2">{{item.shopCount|capitalize|numformat1}}</li>
                <li class="shop3">
                  {{item.brandTurnover|capitalize|numformat1}}<br/><b v-bind:class="[item.brandTurnoverCompare>=0 ? 'greenShow' : 'redShow']">{{item.brandTurnoverCompare|capitalize}}%</b>
                </li>
                <li class="shop4">
                  {{item.guestsCount|capitalize|numformat1}}<br/><b v-bind:class="[item.guestsCountCompare>=0 ? 'greenShow' : 'redShow']">{{item.guestsCountCompare|capitalize}}%</b>
                </li>
                <li class="shop5">
                  {{item.unitPrice|capitalize|numformat1}}<br/><b v-bind:class="[item.unitPriceCompare>=0 ? 'greenShow' : 'redShow']">{{item.unitPriceCompare|capitalize}}%</b>
                </li>
            </ul>
            <!-- <p class="sumTitle">可比店合计</p> -->
            <div class="sumTable">
                <table>
                    <tr class="title titleSum">
                        <th rowspan="2" style="width:20%;">可比店合计</th>
                        <th>店数</th>
                        <th>营业额<br/>(万元)</th>
                        <th>客数<span>{{countSumShow}}</span></th>
                        <!-- <th>客单价(元)</th> -->
                    </tr>
                    <tr>
                        <td>{{sumList.shopCountSum|capitalize|numformat1}}</td>
                        <td>{{sumList.brandTurnoverSum|capitalize|numformat1}}<br/><b v-bind:class="[sumList.brandTurnoverCompareSum>=0 ? 'greenShow' : 'redShow']">{{sumList.brandTurnoverCompareSum|capitalize}}%</b></td>
                        <td>{{sumList.guestsCountSum|capitalize|numformat1}}<br/><b v-bind:class="[sumList.guestsCountCompareSum>=0 ? 'greenShow' : 'redShow']">{{sumList.guestsCountCompareSum|capitalize}}%</b></td>
                        <!-- <td>{{sumList.unitPriceSum}}<br/><b v-bind:class="[sumList.unitPriceCompareSum>=0 ? 'greenShow' : 'redShow']">{{sumList.unitPriceCompareSum}}</b></td> -->
                    </tr>
                </table>
           </div>
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
      brandList: [],
      sumList: [],
      shopCount: "",
      brandTurnover: "",
      guestsCount: "",
      unitPrice: "",
      brandTurnoverCompare: "",
      guestsCountCompare: "",
      unitPriceCompare: "",
      countShow: "",
      countSumShow: ""
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
          queryType: this.queryType,
          shopType: "01"
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
        url: this.base.url + "/brand/queryBrandList",
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
                } else if (this.queryType == "01") {
                  this.countShow = "";
                  this.countSumShow = "";
                } else if (this.queryType == "02") {
                  this.countShow = "(万)";
                  this.countSumShow = "(万)";
                }
              }
              this.brandList = res.data.brandList;
              this.sumList = res.data;
              var sum1 = 0;
              var sum2 = 0;
              var sum3 = 0;
              var sum4 = 0;
              var sum5 = 0;
              var sum6 = 0;
              var sum7 = 0;
              for (var i in this.brandList) {
                var item1 = this.brandList[i].shopCount;
                var item2 = this.brandList[i].brandTurnover;
                var item3 = this.brandList[i].guestsCount;
                var item4 = this.brandList[i].unitPrice;
                var item5 = this.brandList[i].brandTurnoverCompare;
                var item6 = this.brandList[i].guestsCountCompare;
                var item7 = this.brandList[i].unitPriceCompare;

                sum1 += item1;
                sum2 += item2;
                sum3 += item3;
                sum4 += item4;
                sum5 += item5;
                sum6 += item6;
                sum7 += item7;
              }
              this.shopCount = sum1;
              this.brandTurnover = sum2.toFixed(2);
              this.guestsCount = sum3;
              //  this.unitPrice = sum4.toFixed(2);
              this.brandTurnoverCompare = sum5.toFixed(2);
              this.guestsCountCompare = sum6.toFixed(2);
              //  this.unitPriceCompare = sum7.toFixed(2);
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
.box2 {
  margin-top: 0.2rem;
  //   margin: 0.2rem 0.1rem;
  margin-bottom: 0.2rem;
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
  .sumTable {
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 15px;
      margin-top: 30px;
      // text-align: center;
      // margin-top:-0.1rem;
      b {
        display: inline-block;
        text-align: left;
        margin: 0.05rem;
      }
      tr {
        th {
          border: 1px solid #b6b6b6;
          font-weight: normal;
          text-align: center;
        }
        td {
          border: 1px solid #b6b6b6;
          // font-weight: bold;
          padding: 0.05rem 0;
          text-align: center;
        }
      }
    }
  }
  .special {
    margin-top: -0.15rem;
  }
  .shop:nth-of-type(odd) {
    background: #ddebf7;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>