<template>
    <div v-bind:class="['total'+this.codeIndex]">
      <div class="w_total" >
        <div class="w_title">
          <h5>汇总分析</h5>
          <!-- <p>{{this.shopName}}</p> -->
        </div>
        <p class="chooseShow">
            当前条件：
            <span>{{this.queryDateR}}</span>
            <span>{{this.brandId_RName}}</span>
            <span>{{this.codeName}}</span>
        </p>
        <table cellpadding='0' cellspacing='0'>
          <thead>
            <tr>
              <th>合计</th>
              <th></th>
              <th v-text="sumGcTxt"></th>
              <th v-text="avgSrTxt"></th>
              <th v-text="sumSTxt"></th>
            </tr>
            <tr>
              <td>内容</td>
              <td></td>
              <td>客数</td>
              <td>满意度</td>
              <td>营业额</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                AA<br/>
                <span>(日平均)</span>
              </td>
              <td></td>
              <td v-text="avgGcTxt">
              </td>
              <td v-text="avgDaySrTxt">
              </td>
              <td v-text="avgSTxt">
              </td>
            </tr>
            <tr>
              <td>
                BB<br/>
                <span>(上月日平均)</span>
              </td>
              <td></td>
              <td v-text="avgGcLTxt">
              </td>
              <td v-text="avgDaySrLTxt">
              </td>
              <td v-text="avgSLTxt">
              </td>
            </tr>
            <tr>
              <td>
                CC<br/>
                <span>(上月合计)</span>
              </td>
              <td></td>
              <td v-text="sumGcLTxt">
              </td>
              <td v-text="avgSrLTxt"> 
              </td>
              <td v-text="sumSLTxt">
              </td>
            </tr>
            <tr>
              <td>
                DD<br/>
                <span>(本月合计较上月成长%)</span>
              </td>
              <td></td>
              <td v-bind:class="[monthTotalList.gcComp>=0 ? 'greenShow' : 'redShow']" v-text="gcCompTxt">
              </td>
              <td v-bind:class="[monthTotalList.srComp>=0 ? 'greenShow' : 'redShow']" v-text="srCompTxt">
              </td>
              <td v-bind:class="[monthTotalList.sumComp>=0 ? 'greenShow' : 'redShow']" v-text="sumCompTxt">
              </td>
            </tr>
            <tr>
              <td>
                EE<br/>
                <span>(去年同期合计)</span>
              </td>
              <td></td>
              <td v-text="sumGcLyTxt">
              </td>
              <td v-text="avgSrLyTxt">
              </td>
              <td v-text="sumSLyTxt">
              </td>
            </tr>
            <tr>
              <td>
                FF<br/>
                <span>(本月合计较去年同期成长%)</span>
              </td>
              <td></td>
              <td v-bind:class="[monthTotalList.gcCompLast>=0 ? 'greenShow' : 'redShow']" v-text="gcCompLastTxt">
              </td>
              <td v-bind:class="[monthTotalList.srCompLast>=0 ? 'greenShow' : 'redShow']" v-text="srCompLastTxt">
              </td>
              <td v-bind:class="[monthTotalList.sumCompLast>=0 ? 'greenShow' : 'redShow']" v-text="sumCompLastTxt">
              </td>
            </tr>
            <tr>
              <td>
                GG<br/>
                <span>(日预算)</span>
              </td>
              <td></td>
              <td v-text="sumBgGcTxt">
              </td>
              <td>
                /
              </td>
              <td v-text="sumBgSTxt">
              </td>
            </tr>
            <tr>
              <td>
                HH<br/>
                <span>(日预算达成率)</span>
              </td>
              <td></td>
              <td v-bind:class="[monthTotalList.bgGcRate>=100 ? 'greenShow' : 'redShow']" v-text="bgGcRateTxt">
              </td>
              <td>
                /
              </td>
              <td v-bind:class="[monthTotalList.bgSRate>=100 ? 'greenShow' : 'redShow']" v-text="bgSRateTxt">
              </td>
            </tr>
            <tr>
              <td>
                II<br/>
                <span>(预估当月营业额)</span>
              </td>
              <td></td>
              <td v-text="sumEmDayGcTxt">
              </td>
              <td>
                /
              </td>
              <td v-text="sumEmSTxt">
              </td>
            </tr>
            <tr>
              <td>
                JJ<br/>
                <span>(全月预算营业额)</span>
              </td>
              <td></td>
              <td v-text="mBgGcSumTxt">
              </td>
              <td>
                /
              </td>
              <td v-text="mBgSumTxt">
              </td>
            </tr>
            <tr>
              <td>
                KK<br/>
                <span>(预算差)</span>
              </td>
              <td></td>
              <td v-text="mBgGcSubTxt">
              </td>
              <td>
                /
              </td>
              <td v-text="mBgSubTxt">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Main from "../../assets/js/main";
export default {
  name: "",
  data() {
    return {
      // shopName: this.codeName,
      monthTotalList: [],
      sumGcTxt: "--",
      avgSrTxt: "--",
      sumSTxt: "--",
      avgGcTxt: "--",
      avgSTxt: "--",
      avgGcLTxt: "--",
      avgSLTxt: "--",
      sumGcLTxt: "--",
      sumSLTxt: "--",
      sumGcLyTxt: "--",
      sumSLyTxt: "--",
      sumBgGcTxt: "--",
      sumBgSTxt: "--",
      sumEmDayGcTxt: "--",
      sumEmSTxt: "--",
      mBgGcSumTxt: "--",
      mBgSumTxt: "--",
      mBgGcSubTxt: "--",
      mBgSubTxt: "--",
      avgDaySrTxt: "--",
      avgSrLTxt: "--",
      avgDaySrLTxt: "--",
      gcCompTxt: "--",
      srCompTxt: "--",
      sumCompTxt: "--",
      gcCompLastTxt: "--",
      srCompLastTxt: "--",
      sumCompLastTxt: "--",
      avgSrLyTxt: "--",
      bgGcRateTxt: "--",
      bgSRateTxt: "--"
    };
  },
  computed: {
    ...mapState(["base"]),
    queryDateR() {
      return this.base.queryDateR;
    },
    brandId_R() {
      return this.base.brandId_R;
    },
    brandId_RName() {
      return this.base.brandId_RName;
    },
    shopId() {
      return this.base.shopId;
    },
    shopName() {
      return this.base.shopName;
    }
  },
  props: ["code", "codeName", "codeIndex"],
  methods: {
    ...mapActions(["httpPost"]),
    ...mapMutations(["set_base"]),
    monthTurnoverData() {
      this.$vux.loading.show({
        text: "加载中"
      });
      let data = {
        data: {
          queryDate: this.queryDateR,
          brandCode: this.brandId_R
        }
      };
      if (!this.brandId_R) {
        // data.data.brandCode = sessionStorage.getItem("brandM");
      }
      if (this.code) {
        data.data.shopCode = this.code;
      }
      this.httpPost({
        url: this.base.url + "/brand/queryMonthTurnoverList",
        data: data
      })
        .then(res => {
          this.$vux.loading.hide();
          if (res.rspCode == "0000") {
            if (res.data) {
              if (Object.keys(res.data).length == 0) {
                $(".total" + this.codeIndex + "").fadeOut();
                var slideIndex = this.codeIndex;
                var slideWidth = $(".swiper-slide").width();
                var leftData = slideWidth * slideIndex + "px";
              }
              this.monthTotalList = res.data;
              if (this.monthTotalList.sumGc) {
                this.sumGcTxt = this.$formatCurrency(this.monthTotalList.sumGc);
              } else if (this.monthTotalList.sumGc === 0) {
                this.sumGcTxt = Main.tofixP(this.monthTotalList.sumGc);
              } else {
                this.sumGcTxt = "--";
              }
              if (this.monthTotalList.avgSr) {
                this.avgSrTxt = Main.tofixP(this.monthTotalList.avgSr);
              } else if (this.monthTotalList.avgSr === 0) {
                this.avgSrTxt = Main.tofixP(this.monthTotalList.avgSr);
              } else {
                this.avgSrTxt = "--";
              }
              if (this.monthTotalList.avgDaySr) {
                this.avgDaySrTxt = Main.tofixP(this.monthTotalList.avgDaySr);
              } else if (this.monthTotalList.avgDaySr === 0) {
                this.avgDaySrTxt = Main.tofixP(this.monthTotalList.avgDaySr);
              } else {
                this.avgDaySrTxt = "--";
              }
              if (this.monthTotalList.avgSrL) {
                this.avgSrLTxt = Main.tofixP(this.monthTotalList.avgSrL);
              } else if (this.monthTotalList.avgSrL === 0) {
                this.avgSrLTxt = Main.tofixP(this.monthTotalList.avgSrL);
              } else {
                this.avgSrLTxt = "--";
              }
              if (this.monthTotalList.avgDaySrL) {
                this.avgDaySrLTxt = Main.tofixP(this.monthTotalList.avgDaySrL);
              } else if (this.monthTotalList.avgDaySrL === 0) {
                this.avgDaySrLTxt = Main.tofixP(this.monthTotalList.avgDaySrL);
              } else {
                this.avgDaySrLTxt = "--";
              }
              if (this.monthTotalList.avgSrLy) {
                this.avgSrLyTxt = Main.tofixP(this.monthTotalList.avgSrLy);
              } else if (this.monthTotalList.avgSrLy === 0) {
                this.avgSrLyTxt = Main.tofixP(this.monthTotalList.avgSrLy);
              } else {
                this.avgSrLyTxt = "--";
              }
              if (this.monthTotalList.gcComp) {
                this.gcCompTxt = Main.tofixP(this.monthTotalList.gcComp) + "%";
              } else if (this.monthTotalList.gcComp === 0) {
                this.gcCompTxt = Main.tofixP(this.monthTotalList.gcComp);
              } else {
                this.gcCompTxt = "--";
              }
              if (this.monthTotalList.srComp) {
                this.srCompTxt = Main.tofixP(this.monthTotalList.srComp) + "%";
              } else if (this.monthTotalList.srComp === 0) {
                this.srCompTxt = Main.tofixP(this.monthTotalList.srComp);
              } else {
                this.srCompTxt = "--";
              }
              if (this.monthTotalList.sumComp) {
                this.sumCompTxt =
                  Main.tofixP(this.monthTotalList.sumComp) + "%";
              } else if (this.monthTotalList.sumComp === 0) {
                this.sumCompTxt = Main.tofixP(this.monthTotalList.sumComp);
              } else {
                this.sumCompTxt = "--";
              }
              if (this.monthTotalList.gcCompLast) {
                this.gcCompLastTxt =
                  Main.tofixP(this.monthTotalList.gcCompLast) + "%";
              } else if (this.monthTotalList.gcCompLast === 0) {
                this.gcCompLastTxt = Main.tofixP(
                  this.monthTotalList.gcCompLast
                );
              } else {
                this.gcCompLastTxt = "--";
              }
              if (this.monthTotalList.srCompLast) {
                this.srCompLastTxt =
                  Main.tofixP(this.monthTotalList.srCompLast) + "%";
              } else if (this.monthTotalList.srCompLast === 0) {
                this.srCompLastTxt = Main.tofixP(
                  this.monthTotalList.srCompLast
                );
              } else {
                this.srCompLastTxt = "--";
              }
              if (this.monthTotalList.sumCompLast) {
                this.sumCompLastTxt =
                  Main.tofixP(this.monthTotalList.sumCompLast) + "%";
              } else if (this.monthTotalList.sumCompLast === 0) {
                this.sumCompLastTxt = Main.tofixP(
                  this.monthTotalList.sumCompLast
                );
              } else {
                this.sumCompLastTxt = "--";
              }
              if (this.monthTotalList.bgGcRate) {
                this.bgGcRateTxt =
                  Main.tofixP(this.monthTotalList.bgGcRate) + "%";
              } else if (this.monthTotalList.bgGcRate === 0) {
                this.bgGcRateTxt = Main.tofixP(this.monthTotalList.bgGcRate);
              } else {
                this.bgGcRateTxt = "--";
              }
              if (this.monthTotalList.bgSRate) {
                this.bgSRateTxt =
                  Main.tofixP(this.monthTotalList.bgSRate) + "%";
              } else if (this.monthTotalList.bgSRate === 0) {
                this.bgSRateTxt = Main.tofixP(this.monthTotalList.bgSRate);
              } else {
                this.bgSRateTxt = "--";
              }

              if (this.monthTotalList.sumS) {
                this.sumSTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.sumS)
                );
              } else if (this.monthTotalList.sumS === 0) {
                this.sumSTxt = Main.tofixP(this.monthTotalList.sumS);
              } else {
                this.sumSTxt = "--";
              }
              if (this.monthTotalList.avgGc) {
                this.avgGcTxt = this.$formatCurrency(this.monthTotalList.avgGc);
              } else if (this.monthTotalList.avgGc === 0) {
                this.avgGcTxt = Main.tofixP(this.monthTotalList.avgGc);
              } else {
                this.avgGcTxt = "--";
              }
              if (this.monthTotalList.avgS) {
                this.avgSTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.avgS)
                );
              } else if (this.monthTotalList.avgS === 0) {
                this.avgSTxt = Main.tofixP(this.monthTotalList.avgS);
              } else {
                this.avgSTxt = "--";
              }
              if (this.monthTotalList.avgGcL) {
                this.avgGcLTxt = this.$formatCurrency(
                  this.monthTotalList.avgGcL
                );
              } else if (this.monthTotalList.avgGcL === 0) {
                this.avgGcLTxt = Main.tofixP(this.monthTotalList.avgGcL);
              } else {
                this.avgGcLTxt = "--";
              }
              if (this.monthTotalList.avgSL) {
                this.avgSLTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.avgSL)
                );
              } else if (this.monthTotalList.avgSL === 0) {
                this.avgSLTxt = Main.tofixP(this.monthTotalList.avgSL);
              } else {
                this.avgSLTxt = "--";
              }
              if (this.monthTotalList.sumGcL) {
                this.sumGcLTxt = this.$formatCurrency(
                  this.monthTotalList.sumGcL
                );
              } else if (this.monthTotalList.sumGcL === 0) {
                this.sumGcLTxt = Main.tofixP(this.monthTotalList.sumGcL);
              } else {
                this.sumGcLTxt = "--";
              }
              if (this.monthTotalList.sumSL) {
                this.sumSLTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.sumSL)
                );
              } else if (this.monthTotalList.sumSL === 0) {
                this.sumSLTxt = Main.tofixP(this.monthTotalList.sumSL);
              } else {
                this.sumSLTxt = "--";
              }
              if (this.monthTotalList.sumGcLy) {
                this.sumGcLyTxt = this.$formatCurrency(
                  this.monthTotalList.sumGcLy
                );
              } else if (this.monthTotalList.sumGcLy === 0) {
                this.sumGcLyTxt = Main.tofixP(this.monthTotalList.sumGcLy);
              } else {
                this.sumGcLyTxt = "--";
              }
              if (this.monthTotalList.sumSLy) {
                this.sumSLyTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.sumSLy)
                );
              } else if (this.monthTotalList.sumSLy === 0) {
                this.sumSLyTxt = Main.tofixP(this.monthTotalList.sumSLy);
              } else {
                this.sumSLyTxt = "--";
              }
              if (this.monthTotalList.sumBgGc) {
                this.sumBgGcTxt = this.$formatCurrency(
                  this.monthTotalList.sumBgGc
                );
              } else if (this.monthTotalList.sumBgGc === 0) {
                this.sumBgGcTxt = Main.tofixP(this.monthTotalList.sumBgGc);
              } else {
                this.sumBgGcTxt = "--";
              }
              if (this.monthTotalList.sumBgS) {
                this.sumBgSTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.sumBgS)
                );
              } else if (this.monthTotalList.sumBgS === 0) {
                this.sumBgSTxt = Main.tofixP(this.monthTotalList.sumBgS);
              } else {
                this.sumBgSTxt = "--";
              }
              if (this.monthTotalList.sumEmDayGc) {
                this.sumEmDayGcTxt = this.$formatCurrency(
                  this.monthTotalList.sumEmDayGc
                );
              } else if (this.monthTotalList.sumEmDayGc === 0) {
                this.sumEmDayGcTxt = Main.tofixP(
                  this.monthTotalList.sumEmDayGc
                );
              } else {
                this.sumEmDayGcTxt = "--";
              }
              if (this.monthTotalList.sumEmS) {
                this.sumEmSTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.sumEmS)
                );
              } else if (this.monthTotalList.sumEmS === 0) {
                this.sumEmSTxt = Main.tofixP(this.monthTotalList.sumEmS);
              } else {
                this.sumEmSTxt = "--";
              }
              if (this.monthTotalList.mBgGcSum) {
                this.mBgGcSumTxt = this.$formatCurrency(
                  this.monthTotalList.mBgGcSum
                );
              } else if (this.monthTotalList.mBgGcSum === 0) {
                this.mBgGcSumTxt = Main.tofixP(this.monthTotalList.mBgGcSum);
              } else {
                this.mBgGcSumTxt = "--";
              }
              if (this.monthTotalList.mBgSum) {
                this.mBgSumTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.mBgSum)
                );
              } else if (this.monthTotalList.mBgSum === 0) {
                this.mBgSumTxt = Main.tofixP(this.monthTotalList.mBgSum);
              } else {
                this.mBgSumTxt = "--";
              }
              if (this.monthTotalList.mBgGcSub) {
                this.mBgGcSubTxt = this.$formatCurrency(
                  this.monthTotalList.mBgGcSub
                );
              } else if (this.monthTotalList.mBgGcSub === 0) {
                this.mBgGcSubTxt = Main.tofixP(this.monthTotalList.mBgGcSub);
              } else {
                this.mBgGcSubTxt = "--";
              }
              if (this.monthTotalList.mBgSub) {
                this.mBgSubTxt = this.$formatCurrency(
                  Main.tofixP(this.monthTotalList.mBgSub)
                );
              } else if (this.monthTotalList.mBgSub === 0) {
                this.mBgSubTxt = Main.tofixP(this.monthTotalList.mBgSub);
              } else {
                this.mBgSubTxt = "--";
              }
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
    this.monthTurnoverData();
  },
  watch: {
    brandId_R() {
      setTimeout(
        function() {
          this.monthTurnoverData();
        }.bind(this),
        500
      );
    },
    queryDateR() {
      setTimeout(
        function() {
          this.monthTurnoverData();
        }.bind(this),
        500
      );
    },
    code() {
      setTimeout(
        function() {
          this.monthTurnoverData();
        }.bind(this),
        500
      );
    }
  }
};
</script>
<style lang="less" type="text/less">
.w_total {
  margin-top: 0.2rem;
  background: #ffffff;
  height: 100%;
  overflow: scroll;
  .redShow {
    color: #ff4a47;
    // font-size: 12px;
  }
  .greenShow {
    color: #01b57a;
    // font-size: 12px;
  }
  .w_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 0.35rem;
    line-height: 0.35rem;
    padding: 0 0.2rem;
    border-bottom: 1px solid #d2d2d2;
    background: #2f75b5;
    h5 {
      font-weight: normal;
      // color: #2f75b5;
      color: #ffffff;
      font-size: 0.14rem;
    }
    p {
      color: #9c9c9c;
      font-size: 0.09rem;
    }
  }
  .chooseShow {
    min-height: 0.3rem;
    line-height: 0.3rem;
    padding-left: 0.05rem;
    font-size: 14px;
    background: #ddebf7;
    span {
      margin-right: 0.05rem;
    }
  }
  table {
    width: 100%;
    thead {
      // font-size: 0.12rem;
      font-size: 14px;
      // background: #ddebf7;
      tr:first-child {
        height: 0.38rem;
        // font-size: 0.14rem;
        font-size: 15px;
        th {
          font-weight: normal;
        }
        th:first-child {
          width: 28%;
          // width: 20%;
          // border-right: 1px solid #d2d2d2;
        }
        th:nth-of-type(2) {
          width: 0;
          // width: 22%;
        }
        th:nth-of-type(3) {
          width: 22%;
          // width: 25%;
        }
        th:nth-of-type(4) {
          width: 20%;
          // width: 36%;
        }
        td:nth-of-type(5) {
          width: 30%;
        }
      }
      tr:last-child {
        color: #2f75b5;
        text-align: center;
        td {
          padding-bottom: 0.08rem;
        }
        td:first-child {
          // width: 20%;
          width: 28%;
        }
        td:nth-of-type(2) {
          // width: 25%;
          width: 0;
        }
        td:nth-of-type(3) {
          // width: 20%;
          width: 22%;
        }
        td:nth-of-type(4) {
          width: 20%;
          // width: 35%;
        }
        td:nth-of-type(5) {
          width: 30%;
        }
      }
    }
    tbody {
      tr {
        width: 100%;
        // font-size: 0.1rem;
        font-size: 14px;
        text-align: center;
        height: 0.42rem;
        td {
          border-top: 1px solid #d2d2d2;
        }
        td:first-child {
          font-size: 12px;
          span {
            color: #888383;
            // font-size: 0.09rem;
          }
        }
      }
    }
  }
}
</style>