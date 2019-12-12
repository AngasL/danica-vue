<template>
    <div>
        <div class="box1">
            <div class="titles">
                集团总体概况-所有店
            </div>
            <p class="chooseShow">
                当前条件：
                <span>{{typeChoose}}</span>
                <span>{{dateChoose}}</span>
                <span>{{brandChoose}}</span>
                <span>{{marketChoose}}</span>
                <span>{{operationChoose}}</span>
            </p>
            <div class="table">
                <table cellpadding='0' cellspacing='0'>
                    <thead>
                        <tr>
                            <td>品牌</td>
                            <td>店数</td>
                            <td>营业额<br/>(万元)</td>
                            <td>客数<br/>{{countShow}}</td>
                            <td>客单价<br/>（元）</td>
                            <td>预算<br/>营业额<br/>(万元)</td>
                            <td>达成率<br>(%)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in brandList">
                            <td>
                                <span>{{item.brandName}}</span>
                            </td>
                            <td>{{item.shopCount|capitalize|numformat1}}</td>
                            <td>{{item.brandTurnover|capitalize|numformat1}}</td>
                            <td>{{item.guestsCount|capitalize|numformat1}}</td>
                            <td>{{item.unitPrice|capitalize|numformat1}}</td>
                            <td>{{item.budgetTurnover|capitalize|numformat1}}</td>
                            <td v-bind:class="[item.reachRate>=100 ? 'greenShow' : 'redShow']">{{item.reachRate|capitalize}}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            <!-- <p class="sumTitle">所有店合计</p> -->
            <div class="sumTable">
                <table>
                    <tr class="titleSum">
                        <th rowspan="2">合计</th>
                        <th>店数</th>
                        <th>营业额<br/>(万元)</th>
                        <th>客数<span>{{countSumShow}}</span></th>
                        <!-- <th>客单价(元)</th> -->
                        <th>预算营业额<br/>(万元)</th>
                        <th>达成率<br/>(%)</th>
                    </tr>
                    <tr>
                        <td>{{sumList.shopCountSum|capitalize|numformat1}}</td>
                        <td>{{sumList.brandTurnoverSum|capitalize|numformat1}}</td>
                        <td>{{sumList.guestsCountSum|capitalize|numformat1}}</td>
                        <!-- <td>{{sumList.unitPriceSum}}</td> -->
                        <td>{{sumList.budgetTurnoverSum|capitalize|numformat1}}</td>
                        <td>{{sumList.reachRateSum|capitalize}}</td>
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
      budgetTurnover: "",
      reachRate: "",
      countShow: "",
      countSumShow: ""
      //   isNum:'false'
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
          shopType: "00"
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
          // this.isNum = 'false'
          this.typeChoose = "日报表";
          if (this.queryDate) {
            this.dateChoose = this.queryDate;
          }
        } else if (this.queryType == "01") {
          // this.isNum = 'false'
          this.typeChoose = "月报表";
          if (this.queryDate) {
            this.dateChoose = this.queryDate.slice(0, 7);
          }
        } else if (this.queryType == "02") {
          // this.isNum = 'true'
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
              for (var i in this.brandList) {
                var item1 = this.brandList[i].shopCount;
                var item2 = this.brandList[i].brandTurnover;
                var item3 = this.brandList[i].guestsCount;
                var item4 = this.brandList[i].unitPrice;
                var item5 = this.brandList[i].budgetTurnover;
                var item6 = this.brandList[i].reachRate;
                sum1 += item1;
                sum2 += item2;
                sum3 += item3;
                sum4 += item4;
                sum5 += item5;
                sum6 += item6;
              }
              this.shopCount = sum1;
              this.brandTurnover = Main.tofixP(sum2);
              this.guestsCount = sum3;
              //    this.unitPrice = sum4.toFixed(2);
              this.budgetTurnover = Main.tofixP(sum5);
              //    this.reachRate = sum6.toFixed(2);
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
.box1 {
  margin-top: 0.2rem;
  //   margin: 0.2rem 0.1rem;
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
  .table {
    table {
      font-size: 14px;
      width: 100%;
      //   border: none;
      thead {
        tr {
          td {
            text-align: right;
          }
          td:nth-child(1) {
            width: 10%;
            text-align: center;
            padding-left: 0.1rem;
          }
          td:nth-child(2) {
            width: 11%;
          }

          td:nth-child(7) {
            width: 13%;
            padding-right: 0.05rem;
          }
        }
      }
      tbody {
        tr {
          width: 100%;
          height: 35px;
          td {
            text-align: right;
          }
          td:nth-child(1) {
            text-align: center;
            width: 10%;
            padding-left: 0.1rem;
            span {
              border-radius: 5px;
              display: inline-block;
              width: 40px;
              overflow: hidden;
              line-height: 22px;
              text-align: center;
              color: #fff;
              background: #0074af;
              margin-top: 0.05rem;
            }
          }
          td:nth-child(2) {
            width: 11%;
          }

          td:nth-child(7) {
            width: 13%;
            padding-right: 0.1rem;
          }
          td:nth-child(2n) {
            color: #acafb0;
          }
        }
        tr:nth-child(2n) {
          background: #ddebf7;
        }
      }
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

#shops {
  display: flex;
  li {
    flex: 1;
    text-align: right;
  }
  .discBox {
    text-align: center;
  }
  li:nth-child(3) {
    flex: 1.5;
  }
  li:nth-child(4) {
    flex: 1.7;
  }
  li:nth-child(5) {
    flex: 1.2;
  }
  li:nth-child(6) {
    flex: 1.5;
  }
}
#title1,
#title2 {
  display: flex;
  li {
    flex: 1;
    text-align: right;
  }
  li:nth-child(1) {
    text-align: center;
  }
  li:nth-child(3) {
    flex: 1.5;
  }
  li:nth-child(4) {
    flex: 1.7;
  }
  li:nth-child(5) {
    flex: 1.2;
  }
  li:nth-child(6) {
    flex: 1.5;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>