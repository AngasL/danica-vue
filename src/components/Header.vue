<template>
    <div>
        <div class="w_header">
            <p class="brand">
                <label for="">品牌:</label>
                
               <select class="brandList" name="brand" id="" v-model="brandId" @change='brandBtn'>
                   <!-- <i class="icon iconfont icon-xialacaidan"></i> -->
                   <option value="" :selected='selected'>全部品牌</option>
                    <option v-for='(item, index) in brandList' :value="item.brandCode">
                        {{ item.brandName }}
                    </option>
                </select>
                 <i class="icon iconfont icon-arrow"></i>
            </p>
            <!-- <p v-show="reportShow"> -->
            <p id="reportShowY">
              <img src="../assets/img/icon3.png" class="reportBtn" alt="" @click="reportBtn">
            </p>
            <!-- <span>营业日：</span> -->
            <p class="date">               
                <group>
                    <datetime
                        v-model="queryDate"
                        @on-change="change"
                        @on-cancel="log('cancel')"
                        @on-confirm="onConfirm"
                        @on-hide="log('hide', $event)"
                        :end-date="onlySetEndDate"
                        ></datetime>
                </group>
            </p>
            
        </div>
         <div class="w_nav">
            <div class="areaLists">
                <label for="">区域：</label>
                <select name="market" class="market" v-model="marketId" @change='marketBtn'>
                    <option value="" :selected='selected'>全部市场</option>
                    <option v-for='(item, index) in marketList' :value="item.marketCode" >
                        {{ item.marketName }}
                    </option>
                </select>
                 <i class="icon iconfont icon-arrow"></i>
            </div>
             <div class="areaLists">
                <select name="operation" class="operation" v-model="operationId" @change='operationBtn'>
                    <option value="" :selected='selected'>全部小区</option>
                    <option v-for='(item, index) in operationList' :value="item.operationCode">
                        {{ item.operationName }}
                    </option>
                </select>
                 <i class="icon iconfont icon-arrow"></i>
            </div>			
            <div>
                <select class="dateList" name="" id="" v-model="queryType" @change='tabBtn'>
                    <option v-for='(item, index) in seleBtn' :value="item.queryType" :selected='index==0?"selected":""'>
                        {{ item.name }}
                    </option>
                </select>
                <i class="icon iconfont icon-arrow"></i>
            </div>			
            
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Main from "../assets/js/main.js";
import { Datetime, Group, XButton } from "vux";

export default {
  name: "",
  data() {
    return {
      loading: false,
      queryDate: Main.GetDay(),
      brandList: [],
      marketList: [],
      operationList: [],
      // reportShow: false, //月报显示
      seleBtn: [
        {
          name: "日报表",
          issele: true,
          queryType: "00"
        },
        {
          name: "月报表",
          issele: false,
          queryType: "01"
        },
        {
          name: "年报表",
          issele: false,
          queryType: "02"
        }
      ],
      queryType: "",
      brandId: "",
      marketId: "",
      operationId: "",
      onlySetEndDate: ""
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
    marketId() {
      return this.base.marketId;
    },
    operationId() {
      return this.base.operationId;
    }
  },
  components: {
    Datetime,
    Group
  },
  created() {
    this.queryType = this.seleBtn[0].queryType;
  },

  methods: {
    ...mapActions(["httpPost"]),
    ...mapMutations(["set_base"]),
    //月报显示
    reportBtn() {
      this.$router.push({ name: "w_report" });
    },
    log(str1, str2 = "") {
      //   console.log(str1, str2)
    },

    onConfirm(val) {
      //   console.log('on-confirm arg', val)
      //   console.log('current value', this.queryDate)
    },

    showPlugin() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD HH",
        value: "2017-05-20 18",
        onConfirm(val) {
          //   console.log('plugin confirm', val)
        },
        onShow() {
          //   console.log('plugin show')
        },
        onHide() {
          //   console.log('plugin hide')
        }
      });
    },
    toggleFormat() {
      if (this.format === "YYYY-MM-DD") {
        this.format = "YYYY-MM-DD HH:mm";
      } else if (this.format === "YYYY-MM-DD HH:mm") {
        this.format = "YYYY-MM-DD";
      }
    },

    change(value) {
      //   console.log('change', index)
      this.set_base({ prop: "queryDate", val: this.queryDate });
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
    tabBtn(item) {
      this.set_base({ prop: "queryType", val: this.queryType });
    },

    brandBtn(item) {
      var brandName = $(".brandList option:selected").text();

      this.marketList = [];
      this.set_base({ prop: "marketId", val: "" });
      this.set_base({ prop: "marketName", val: "" });
      this.operationList = [];
      this.set_base({ prop: "operationId", val: "" });
      this.set_base({ prop: "operationName", val: "" });
      this.set_base({ prop: "brandId", val: this.brandId });
      this.set_base({ prop: "brandName", val: brandName });
      sessionStorage.setItem("brandCodeR", this.brandId);
      if (this.brandId == "") {
        // sessionStorage.setItem("brandCodeR", this.brandList[0].brandCode);
      }
      // console.log(this.brandId)
      // console.log(brandName)
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
              //   console.log(res.data)
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
    },
    marketBtn(item) {
      var marketName = $(".market option:selected").text();
      // console.log(marketName)
      this.operationList = [];
      this.set_base({ prop: "operationId", val: "" });
      this.set_base({ prop: "operationName", val: "" });
      this.set_base({ prop: "marketId", val: this.marketId });
      this.set_base({ prop: "marketName", val: marketName });
    },
    marketData() {
      this.loading = true;
      let data = {
        data: {
          brandCode: this.brandId
        }
      };
      this.httpPost({
        url: this.base.url + "/user/getMarketByBrandCode",
        data: data
      })
        .then(res => {
          this.loading = false;
          if (res.rspCode == "0000") {
            if (res.data) {
              //   console.log(res.data)
              this.marketList = res.data.marketList;
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
    },
    operationBtn(item) {
      var operationName = $(".operation option:selected").text();
      // console.log(operationName)
      this.set_base({ prop: "operationId", val: this.operationId });
      this.set_base({ prop: "operationName", val: operationName });
    },
    operationData() {
      this.loading = true;
      let data = {
        data: {
          marketCode: this.marketId
        }
      };
      this.httpPost({
        url: this.base.url + "/user/getOperationByMarketCode",
        data: data
      })
        .then(res => {
          this.loading = false;
          if (res.rspCode == "0000") {
            if (res.data) {
              //   console.log(res.data)
              this.operationList = res.data.operationList;
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
    this.onlySetEndDate = this.setToday();
    this.brandData();
    setTimeout(
      function() {
        if (this.brandId == "") {
          this.marketList = [];
          this.set_base({ prop: "marketId", val: "" });
          this.set_base({ prop: "marketName", val: "" });
          this.operationList = [];
          this.set_base({ prop: "operationId", val: "" });
          this.set_base({ prop: "operationName", val: "" });
          // sessionStorage.setItem("brandCodeR", this.brandList[0].brandCode);
        }
      }.bind(this),
      500
    );
  },
  watch: {
    brandId() {
      this.marketData();
      const _this = this;
      _this.marketId = "";
      _this.operationId = "";
      if (_this.brandId == "") {
        _this.marketId = "";
        _this.operationId = "";
      }
    },
    marketId() {
      this.operationData();
      const _this = this;
      _this.operationId = "";
      if (_this.marketId == "") {
        _this.operationId = "";
      }
    }
  }
};
</script>
<style lang="less" type="text/less">
.w_header {
  height: 0.4rem;
  background: #2f75b5;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  color: #ffffff;
  padding: 0 0.15rem;
  .brand {
    label {
      font-size: 15px;
    }
  }
  .brandList {
    //   width: 0.5rem;
    height: 0.3rem;
    background: #2f75b5;
    color: #ffffff;
    border: none;
    appearace: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    font-size: 15px;
  }
  p {
    .reportBtn {
      // position: fixed;
      // left: 40%;
      // top: 10px;
      margin-top: 0.08rem;
    }
  }
}
.w_nav {
  height: 0.4rem;
  background: #2f75b5;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  color: #ffffff;
  padding: 0 0.15rem;
  .areaLists {
    label {
      font-size: 15px;
    }
  }
  .market {
    height: 0.3rem;
    background: #2f75b5;
    color: #ffffff;
    border: none;
    appearace: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    font-size: 15px;
  }
  .operation {
    height: 0.3rem;
    background: #2f75b5;
    color: #ffffff;
    border: none;
    appearace: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    font-size: 15px;
  }
  .dateList {
    font-size: 15px;
    height: 0.3rem;
    background: #2f75b5;
    color: #ffffff;
    border: none;
    appearace: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  a {
    color: #ffffff;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>