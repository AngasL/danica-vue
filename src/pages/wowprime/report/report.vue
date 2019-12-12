<template>
    <div class="w_report">
        <v-search></v-search>
        <div class="w_blank"></div>
        <div class="w_noData" v-show="noDataShow" v-text="noDataTxt">
          
        </div>
        
        <div class="w_detail w_detailTit" v-show="!noDataShow">
          <div class="w_title">
            <h5>明细数据</h5>
             <p>
               <!-- <img src="./img/shopDown1.png" alt="" @click="xialaBtnA"> -->
            </p>
          </div>
          <div class="chooseShow">
              当前条件：
              <span>{{this.queryDateR}}</span>
              <span>{{this.brandId_RName}}</span>
              <span>{{this.shopName}}</span>
          </div>
          <table cellpadding='0' cellspacing='0'>
            <thead>
              <tr>
                <td>日</td>
                <td>星期</td>
                <td>客数</td>
                <td>满意度</td>
                <td>营业额</td>
              </tr>
            </thead>
          </table>
        </div>
        <div class="swiper-container" v-show="swiperShow">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in shopListN" :key="index">
                <v-detail :code = 'item.shopCode' :codeName = 'item.shopName' :codeIndex = 'index'></v-detail>
                <v-total :code = 'item.shopCode' :codeName = 'item.shopName' :codeIndex = 'index'></v-total>
              </div>
            </div>
        </div>      
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import vSearch from "../../../components/report/search";
import vDetail from "../../../components/report/detail";
import vTotal from "../../../components/report/total";
import Main from "../../../assets/js/main";

export default {
  name: "",
  data() {
    return {
      loading: false,
      swiperShow: false,
      noDataShow: false,
      shopId: "",
      shopName: "",
      shopIndex: 0,
      noDataTxt: "该品牌暂无数据!",
      shopList: [],
      shopListN: []
    };
  },
  components: {
    vSearch,
    vDetail,
    vTotal
  },
  created() {},
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
  methods: {
    ...mapActions(["httpPost"]),
    ...mapMutations(["set_base"]),
    //点击总计
    totalBtn() {
      this.shopList[this.shopIndex].shopCode = "";
      this.shopList[this.shopIndex].shopName = "";
    },
    xialaBtn() {
      $(".swiper-pagination-bullet").fadeOut();
      $(".swiper-pagination-bullet-active").fadeIn();
    },
    xialaBtnA() {
      $(".swiper-pagination-bullet").fadeIn();
      //$(".swiper-pagination-bullet-active").fadeOut();
    },
    //品牌下门店
    shopData() {
      this.$vux.loading.show({
        text: "加载中"
      });
      let data = {
        data: {
          brandCode: this.brandId_R
          // brandCode: "308"
        }
      };
      if (!this.brandId_R) {
        // data.data.brandCode = sessionStorage.getItem("brandM");
      }
      this.httpPost({
        url: this.base.url + "/user/getShopByOperationCode",
        data: data
      })
        .then(res => {
          if (res.rspCode == "0000") {
            if (res.data) {
              // console.log(this);
              this.$nextTick(function() {
                this.shopList = res.data.shopList;
                var shopListT = [{ shopCode: "", shopName: "全部门店" }];
                this.shopList = this.shopList.concat(shopListT);
                this.shopName = this.shopList[0].shopName;
                // console.log(this.shopList);

                for (var i in this.shopList) {
                  var shopCode = this.shopList[i].shopCode;
                  this.noDataShow = true;
                  this.noDataTxt = "数据加载中，请稍等一会";
                  NProgress.start();
                  this.detailData(shopCode);
                }
              });
              this.noDataShow = false;
              this.$vux.loading.hide();
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
    },
    //预加载调用
    detailData(shopCode) {
      this.$vux.loading.show({
        text: "加载中"
      });
      let data = {
        data: {
          queryDate: this.queryDateR,
          brandCode: this.brandId_R,
          perPage: 35,
          currentPage: 1,
          shopCode: shopCode
        }
      };
      if (!this.brandId_R) {
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
                for (var i in this.shopList) {
                  if (this.shopList[i].shopCode == shopCode) {
                    this.shopList.splice(i, 1);
                  }
                }
              }
              NProgress.done();
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
    if (this.brandId_R) {
      this.shopData();
    } else {
      this.noDataShow = true;
      this.noDataTxt = "请先选择需要查看的品牌!";
    }
    setTimeout(
      function() {
        this.shopListN = this.shopList;
        this.swiperShow = true;
        if (this.brandId_R) {
          if (this.shopListN == null || this.shopListN.length == 0) {
            this.noDataShow = true;
            this.noDataTxt = "该品牌暂无数据!";
          } else {
            this.noDataShow = false;
          }
        } else {
          this.noDataShow = true;
          this.noDataTxt = "请先选择需要查看的品牌!";
        }
      }.bind(this),
      5000
    );

    $(".titleImg").css("display", "block");
    setTimeout(
      function() {
        var vm = this;
        var mySwiper = new Swiper(".swiper-container", {
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function(index, className) {
              return (
                '<div class="swiper-pagination-bullet">' +
                vm.shopListN[index].shopName +
                "</div>"
              );
            }
          },

          on: {
            slideChangeTransitionStart: function() {
              vm.shopName = vm.shopListN[this.activeIndex].shopName;
              vm.shopIndex = this.activeIndex;
            }
          }
        });
      }.bind(this),
      800
    );
  },
  watch: {
    brandId_R() {
      const _this = this;
      _this.shopList = [];
      _this.shopListN = [];
      _this.shopData();
      setTimeout(
        function() {
          _this.shopListN = _this.shopList;
          _this.swiperShow = true;
          if (_this.brandId_R) {
            if (_this.shopListN == null || _this.shopListN.length == 0) {
              _this.noDataShow = true;
              _this.noDataTxt = "该品牌暂无数据!";
            } else {
              _this.noDataShow = false;
            }
          } else {
            _this.noDataShow = true;
            _this.noDataTxt = "请先选择需要查看的品牌!";
          }
        }.bind(this),
        5000
      );
      setTimeout(
        function() {
          var vm = this;
          vm.shopName = vm.shopListN[vm.shopIndex].shopName;
          var mySwiper = new Swiper(".swiper-container", {
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            on: {
              slideChangeTransitionStart: function() {
                vm.shopName = vm.shopListN[this.activeIndex].shopName;
                vm.shopIndex = this.activeIndex;
              }
            }
          });
        }.bind(this),
        800
      );
    },
    queryDateR() {
      if (this.brandId_R) {
        this.shopData();
      }
      setTimeout(
        function() {
          this.shopListN = this.shopList;
          this.swiperShow = true;
          if (this.brandId_R) {
            if (this.shopListN == null || this.shopListN.length == 0) {
              this.noDataShow = true;
              this.noDataTxt = "该品牌暂无数据!";
            } else {
              this.noDataShow = false;
            }
          } else {
            this.noDataShow = true;
            this.noDataTxt = "请先选择需要查看的品牌!";
          }
        }.bind(this),
        5000
      );
    }
  }
};
</script>
<style lang="less" type="text/less">
.w_report {
  background: #ebe8e8;
  // overflow-y: scroll;
  .w_search {
    // position: absolute;
    width: 100%;
    position: fixed;
    z-index: 10;
  }
  .w_blank {
    position: fixed;
    z-index: 10;
    height: 0.2rem;
    width: 100%;
    top: 1.03rem;
    background: #ebe8e8;
  }
  .w_noData {
    position: absolute;
    top: 50%;
    left: 30%;
    color: #6c6c6c;
  }
  .w_detailTit {
    position: fixed;
    top: 1.23rem;
    width: 100%;
    z-index: 10;
    .xiala {
      background: #2f75b5;
      color: #ffffff;
      // font-size: 0.09rem;
      font-size: 14px;
      height: 100%;
      .swiper-pagination {
        display: flex;
        flex-direction: column;
      }
      .swiper-pagination-bullet {
        height: 0.3rem;
        margin-left: -10%;
        display: none;
        border-radius: 0;
        background: #2f75b5;
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        display: block;
      }
    }
    p {
      img {
        width: 0.1rem;
        height: 0.06rem;
        margin-left: 0.05rem;
      }
    }
  }
  .swiper-container {
    // overflow: auto;
    padding-top: 2.23rem;
  }
}
</style>
