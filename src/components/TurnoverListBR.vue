<template>
    <div>
       <ul>
            <li>
                <div class="head bColor0">餐厅数(<span class="redShow">预算</span>)</div>
                <div class="content">
                    <h2>{{detailList.shopCount|capitalize|numformat1}}</h2>
                    <h3><i class="icon iconfont" v-bind:class="[detailList.shopCountCompare>=100 ? 'greenShow' : 'redShow']">{{detailList.shopCountCompare|capitalize}}%</i></h3>
                </div>
            </li>
            <li>
                <div class="head bColor0">日均营业额(预算)</div>
                <div class="content">
                    <h2>{{detailList.avgTurnover|capitalize|numformat1}}<span>(元)</span></h2>
                    <h3><i class="icon iconfont" v-bind:class="[detailList.avgTurnoverCompare>=100 ? 'greenShow' : 'redShow']">{{detailList.avgTurnoverCompare|capitalize}}%</i></h3>
                </div>
            </li>
            <li>
                <div class="head bColor0">日均客数(预算)</div>
                <div class="content">
                    <h2>{{detailList.avgGuestsCount|capitalize|numformat1}}</h2>
                    <h3><i class="icon iconfont" v-bind:class="[detailList.avgGuestsCountCompare>=100 ? 'greenShow' : 'redShow']">{{detailList.avgGuestsCountCompare|capitalize}}%</i></h3>
                </div>
            </li>
            <li>
                <div class="head bColor0">客单价(预算)</div>
                <div class="content">
                    <h2>{{detailList.unitPrice|capitalize|numformat1}}<span>(元)</span></h2>
                    <h3><i class="icon iconfont" v-bind:class="[detailList.unitPriceCompare>=100 ? 'greenShow' : 'redShow']">{{detailList.unitPriceCompare|capitalize}}%</i></h3>
                </div>
            </li>
            <li>
                <div class="head bColor0">营业额(预算)</div>
                <div class="content">
                    <h2>{{detailList.turnover|capitalize|numformat1}}<span>(万元)</span></h2>
                    <h3><i class="icon iconfont" v-bind:class="[detailList.turnoverCompare>=100 ? 'greenShow' : 'redShow']">{{detailList.turnoverCompare|capitalize}}%</i></h3>
                </div>
            </li>
            <li>
                <div class="head bColor0">客数(预算)</div>
                <div class="content">
                    <h2>{{detailList.guestsCount|capitalize|numformat1}}</h2>
                    <h3><i class="icon iconfont" v-bind:class="[detailList.guestsCountCompare>=100 ? 'greenShow' : 'redShow']">{{detailList.guestsCountCompare|capitalize}}%</i></h3>
                </div>
            </li>
        </ul>
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
      dateChoose: "",
      typeChoose: "",
      detailList: []
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
          turnoverType: "02"
        }
      };
      if (this.brandId) {
        data.data.brandCode = this.brandId;
      }
      if (this.marketId) {
        data.data.marketCode = this.marketId;
      }
      if (this.operationId) {
        data.data.operationCode = this.operationId;
      }
      this.httpPost({
        url: this.base.url + "/brand/queryTurnoverList",
        data: data
      })
        .then(res => {
          this.loading = false;
          if (res.rspCode == "0000") {
            if (res.data == null) {
              this.detailList = [];
              return;
            }
            if (res.data) {
              this.detailList = res.data;
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
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>