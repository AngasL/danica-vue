
<template>
  <div class="w_dataView">
    <v-header></v-header>
    <div class="adminTip" v-show="isAdminTip">
        暂无权限
    </div>
    
    <v-brandListAll v-show="isbrandListAll"></v-brandListAll>
    <v-brandListComp v-show="isbrandListComp"></v-brandListComp>
    <div v-show="ischooseShow1">
        <div class="titlesBox3">
            营业快报
        </div>
        <p class="chooseShow1">
            当前条件：
            <span>{{typeChoose}}</span>
            <span>{{dateChoose}}</span>
            <span>{{brandChoose}}</span>
            <span>{{marketChoose}}</span>
            <span>{{operationChoose}}</span>
        </p>
    </div>
    <div class="box3" v-show="isTurnoverList">
        
         <v-turnoverListAll></v-turnoverListAll>
    <!-- </div> -->
    <!-- <div class="box4"> -->
        <v-turnoverListComp></v-turnoverListComp>
    <!-- </div> -->
    <!-- <div class="box5"> -->
        <v-turnoverListBR></v-turnoverListBR>
    </div>
    
    <v-shopTurnover v-show="isshopTurnover"></v-shopTurnover>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { XButton } from "vux";
import "../../../assets/fontIcon/iconfont.css";
import vHeader from "../../../components/Header.vue";
import vBrandListAll from "../../../components/BrandListAll.vue";
import vBrandListComp from "../../../components/BrandListComp.vue";
import vTurnoverListAll from "../../../components/TurnoverListAll.vue";
import vTurnoverListComp from "../../../components/TurnoverListComp.vue";
import vTurnoverListBR from "../../../components/TurnoverListBR.vue";
import vShopTurnover from "../../../components/ShopTurnover.vue";
export default {
  components: {
    XButton,
    vHeader,
    vBrandListAll,
    vBrandListComp,
    vTurnoverListAll,
    vTurnoverListComp,
    vTurnoverListBR,
    vShopTurnover
  },
  data() {
    return {
      userMenuList: [],
      brandChoose: "",
      marketChoose: "",
      operationChoose: "",
      dateChoose: "",
      typeChoose: "",

      isbrandListAll: false,
      isbrandListComp: false,
      isTurnoverList: false,
      isshopTurnover: false,
      ischooseShow1: false,
      isAdminTip: false
    };
  },
  created() {
    this.userMenuList = JSON.parse(sessionStorage.getItem("userMenuList"));
    // console.log(this.userMenuList)
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
    ...mapMutations(["set_base"]),

    dataShow() {
      this.brandChoose = this.brandName;
      if (this.queryDate) {
        this.dateChoose = this.queryDate;
      }
      // if(this.marketId){
      this.marketChoose = this.marketName;
      // }

      // if(this.operationId){
      this.operationChoose = this.operationName;
      // }

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
    }
  },
  mounted() {
    var userMenuListArr = this.userMenuList;
    // console.log(userMenuListArr)
    if (userMenuListArr == []) {
      this.isAdminTip = true;
    } else {
      this.isAdminTip = false;
    }
    var isflag1 = false;
    var isflag2 = false;
    var isflag3 = false;
    var isflag4 = false;
    userMenuListArr.forEach(function(item, index) {
      // console.log(item.menuCode)

      if (item.menuCode == "M1001") {
        isflag1 = true;
      }
      if (item.menuCode == "M1002") {
        isflag2 = true;
      }
      if (item.menuCode == "M1003") {
        isflag3 = true;
      }
      if (item.menuCode == "M1004") {
        isflag4 = true;
      }
    });
    if (isflag1) {
      // console.log(123)
      this.isbrandListAll = true;
      this.isbrandListComp = true;
    } else {
      this.isbrandListAll = false;
      this.isbrandListComp = false;
    }
    if (isflag2) {
      // console.log(456)
      this.isTurnoverList = true;
      this.ischooseShow1 = true;
    } else {
      this.isTurnoverList = false;
      this.ischooseShow1 = false;
    }
    if (isflag3) {
      // console.log(6)
      this.isshopTurnover = true;
    } else {
      this.isshopTurnover = false;
    }
    if (isflag4) {
      // console.log(36)
      // this.reportShow = true;
      $("#reportShowY").fadeIn();
    } else {
      // this.reportShow = false;
      $("#reportShowY").fadeOut();
    }
    this.dataShow();
  },
  watch: {
    brandId() {
      this.dataShow();
    },
    queryDate() {
      this.dataShow();
    },
    queryType() {
      this.dataShow();
    }
  }
};
</script>
<style lang="less" type="text/less">
.w_dataView {
  background: #ebe8e8;
  .adminTip {
    margin: 50% 40%;
    width: 25%;
    font-size: 20px;
  }
  .bColor1 {
    background: #0074af;
  }
  .bColor2 {
    background: #5090c0;
  }
  .bColor3 {
    background: #58ad4b;
  }
  .bColor4 {
    background: #ffbe00;
  }
  .bColor5 {
    background: #ff7322;
  }
  .bColor6 {
    background: #a7a39e;
  }
  .bColor0 {
    background: #305496;
  }
  .redShow {
    color: #ff4a47;
    // font-size: 12px;
  }
  .greenShow {
    color: #01b57a;
    // font-size: 12px;
  }
  .titles,
  .titlesBox3 {
    background: #2f75b5;
    height: 0.25rem;
    line-height: 0.25rem;
    color: #ffffff;
    font-size: 15px;
    padding-left: 0.05rem;
  }
  .titlesBox3 {
    // margin: 0 0.1rem;
  }
  .titleSum {
    background: #ddebf7;
  }
  .chooseShow1 {
    min-height: 0.3rem;
    line-height: 0.3rem;
    padding-left: 0.05rem;
    font-size: 15px;
    background: #ddebf7;
    // color: #FFFFFF;
    // margin: 0 0.1rem -0.18rem;
    span {
      margin-right: 0.05rem;
    }
  }
  .box3 {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    align-items: center;
    -webkit-align-items: center;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    margin-top: 0.2rem;
    // margin-bottom:620px;
    margin-bottom: 6rem;
    ul {
      height: 0.8rem;
      // flex: 1;
      width: 1.05rem;
      // margin-right: 0.05rem;
      li {
        .head {
          background: #2f75b5;
          height: 0.3rem;
          line-height: 0.3rem;
          color: #ffffff;
          font-size: 13px;
          text-align: center;
        }
        .content {
          height: 0.8rem;
          margin-bottom: 0.1rem;
          background: #ffffff;
          text-align: center;
          h2 {
            font-size: 16px;
            padding-top: 0.1rem;
            span {
              font-size: 12px;
              margin-left: 0.05rem;
              font-weight: normal;
            }
          }
          h3 {
            font-size: 14px;
            font-weight: normal;
            margin-top: 0.1rem;
            padding-bottom: 0.1rem;
          }
        }
      }
    }
  }
  .discBox {
    color: #ffffff;
    border-radius: 5px;
    padding: 3px;
    text-align: center;
    width: 40px;
  }
  .discBox1 {
    width: 70px;
    text-align: right;
  }
  .discBox > a {
    display: block;
    width: 100%;
    color: #ffffff;
  }
  .shop2 {
    width: 20px;
    text-align: right;
    color: #8c9091;
  }
  .shop3 {
    width: 40px;
    text-align: right;
  }
  .shop4 {
    width: 40px;
    text-align: right;
    color: #8c9091;
  }
  .shop5 {
    width: 30px;
    text-align: right;
  }
  .shop6 {
    // width: 50px;
    text-align: right;
    color: #8c9091;
  }
  .shop7 {
    // color: #8c9091;
  }
  .turnover2 {
    width: 50px;
    text-align: right;
  }
  .turnover3 {
    width: 50px;
    text-align: right;
  }
  .turnover4 {
    width: 50px;
    text-align: right;
  }
  .turnover5 {
    width: 50px;
    text-align: right;
  }
  .turnover2,
  .turnover5 {
    color: #8c9091;
  }
  .vux-no-group-title {
    margin-top: -0.2em;
    margin-right: -0.5em;
    height: 0.3rem;
  }
  .vux-datetime {
    color: #000;
    height: 0.3rem;
    background: #2f75b5;
  }
  .weui-cells {
    font-size: 14px;
  }
  .vux-cell-value {
    color: #ffffff;
  }
}

@media only screen and (min-width: 100px) and (max-width: 330px) {
  .w_dataView {
    .box3 {
      margin-bottom: 6.8rem;
    }
  }
}
@media only screen and (min-width: 350px) and (max-width: 400px) {
  .w_dataView {
    .box3 {
      margin-bottom: 6.5rem;
    }
  }
}
@media only screen and (min-width: 400px) and (max-width: 600px) {
  .w_dataView {
    .box3 {
      margin-bottom: 6.5rem;
    }
  }
}
@media only screen and (min-width: 700px) {
  .w_dataView {
    .box3 {
      margin-bottom: 4.8rem;
    }
  }
}
</style>