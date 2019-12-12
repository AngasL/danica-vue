<template>
  <div v-bind:class="['detail'+this.codeIndex]">
    <div class="w_detail">
        <table  cellpadding='0' cellspacing='0' style="border-bottom: 2px solid #d2d2d2;">
          <tbody>
            <tr v-for="(item,index) in monthTurnoverList" :key="index" v-bind:class="[item.weekDay == 'Sat'||item.weekDay == 'Sun' ? 'specialShow' : '']">
              <td>
                {{item.businessDay}}
              </td>
              <td>
                {{item.weekDay}}
              </td>
              <td>
                {{item.dayGc|numformat1}}
              </td>
              <td>
                {{item.satisfactionRate}}
              </td>
              <td>
                {{item.dayS|tofixedTwo|numformat1}}
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
      currentPage: 1,
      totalResult: "",
      totalPage: "",
      monthTurnoverList: []
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
    getPage(item) {
      //分页查看当前门店每7天的变化
      // console.log("item:" + item);
      this.currentPage = item;
      this.shopTurnoverData();
    },
    //门店营业详情
    shopTurnoverData() {
      this.$vux.loading.show({
        text: "加载中"
      });
      let data = {
        data: {
          queryDate: this.queryDateR,
          brandCode: this.brandId_R,
          perPage: 35,
          currentPage: this.currentPage,
          shopCode: this.code
        }
      };
      // console.log(123);
      if (!this.brandId_R) {
        // console.log(123);
        // data.data.brandCode = sessionStorage.getItem("brandM");
      }
      this.httpPost({
        url: this.base.url + "/brand/queryShopTurnoverList",
        data: data
      })
        .then(res => {
          this.$vux.loading.hide();
          if (res.rspCode == "0000") {
            if (res.data) {
              if (
                res.data.monthTurnoverList == null ||
                res.data.monthTurnoverList.length == 0
              ) {
                $(".detail" + this.codeIndex + "").fadeOut();
              }
              this.monthTurnoverList = res.data.monthTurnoverList;
              res.data.monthTurnoverList.forEach(function(item) {
                item.businessDay = Main.timestampToTimeDay(item.businessDay);
              });
              this.totalResult = res.data.totalResult;
              // console.log(this.totalResult);
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
    this.shopTurnoverData();
  },
  watch: {
    brandId_R() {
      setTimeout(
        function() {
          this.shopTurnoverData();
        }.bind(this),
        500
      );
    },
    queryDateR() {
      setTimeout(
        function() {
          this.shopTurnoverData();
        }.bind(this),
        500
      );
    },
    code() {
      setTimeout(
        function() {
          this.shopTurnoverData();
        }.bind(this),
        500
      );
    }
  }
};
</script>
<style lang="less" type="text/less">
.w_detail {
  // margin-top: 0.2rem;
  background: #ffffff;
  .redShow {
    color: #ff4a47;
    // font-size: 12px;
  }
  .greenShow {
    color: #01b57a;
    // font-size: 12px;
  }
  .blueShow {
    background: #ddebf7;
  }
  .specialShow {
    // background: rgba(247, 81, 81, 0.28);
    background: rgba(191, 191, 191, 0.68);
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
    .detailShopName {
      font-size: 14px;
      color: #ffffff;
    }
    p {
      .shopList {
        border: none;
        outline: none;
        background: #2f75b5;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        // color: #9c9c9c;
        color: #ffffff;
        // font-size: 0.09rem;
        font-size: 14px;
        option {
          color: #ffffff;
          // font-size: 0.09rem;
          font-size: 14px;
        }
      }
      img {
        width: 0.1rem;
        height: 0.06rem;
        margin-left: 0.05rem;
      }
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
    .totalBtn {
      color: #2f75b5;
      float: right;
      margin-right: 0.2rem;
      img {
        width: 0.1rem;
        height: 0.08rem;
        margin-left: 0.05rem;
      }
    }
  }
  table {
    width: 100%;
    // border-bottom: 2px solid #d2d2d2;
    thead {
      // font-size: 0.12rem;
      font-size: 14px;
      // background: #ddebf7;
      tr {
        color: #2f75b5;
        // color: #ffffff;
        text-align: center;
        td {
          padding-top: 0.08rem;
          padding-bottom: 0.08rem;
        }
        td:first-child {
          width: 14%;
        }
        td:nth-of-type(2) {
          width: 14%;
        }
        td:nth-of-type(3) {
          width: 22%;
        }
        td:nth-of-type(4) {
          width: 20%;
        }
        td:nth-of-type(5) {
          width: 30%;
          // border: none;
        }
      }
    }
    tbody {
      tr {
        width: 100%;
        // font-size: 0.1rem;
        font-size: 14px;
        text-align: center;
        height: 0.26rem;
        td {
          border-top: 1px solid #d2d2d2;
        }
        td:first-child {
          width: 14%;
        }
        td:nth-of-type(2) {
          width: 14%;
        }
        td:nth-of-type(3) {
          width: 22%;
        }
        td:nth-of-type(4) {
          width: 20%;
        }
        td:nth-of-type(5) {
          width: 30%;
          // border: none;
        }
      }
    }
  }
  .timeTotal {
    width: 100%;
    height: 0.43rem;
    font-size: 0.14rem;
    border-top: 2px solid #2f75b5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    .timeFen {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: row;
    }
  }
}
</style>