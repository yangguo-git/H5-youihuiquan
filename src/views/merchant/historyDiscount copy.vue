<template>
  <div class="historyBox">
    <van-tabs v-model="active"  title-active-color="#323232" line-width="25px" sticky>
      <van-tab title="分享记录">

        <van-list v-model="shareLoading" :finished="shareFinished" finished-text="" @load="shareOnLoad">

          <div class="item-history" v-for="(item,index) in shareList" :key="index">
            <div class="item-left">
              <div class="discountName">{{item.couponName}}</div>
              <span class="discountCode">{{item.couponId}}</span>
              <div class="timeBox shareBox">
                <span class="timeText">分享时间</span>
                <span>{{item.shareTime}}</span>
              </div>
            </div>
          </div>

        </van-list>
      </van-tab>
      <van-tab title="领取记录">

        <van-list v-model="receiveLoading" :finished="receiveFinished" finished-text="" @load="receiveOnLoad">

          <div class="item-history" v-for="(item,index) in receiveList" :key="index">
            <div class="item-left">
              <div class="discountName">{{item.couponName}}</div>
              <span class="discountCode">{{item.couponId}}</span>
              <div class="timeBox shareBox">
                <span class="timeText shareBox">分享时间</span>
                <span>{{item.shareTime}}</span>
              </div>
              <div class="timeBox">
                <span class="timeText">核销时间</span>
                <span>{{item.checkTime}}</span>
              </div>
            </div>
            <div class="item-right">
              <van-button plain type="info" size="small" class="finishBtn" disabled>已核销</van-button>
            </div>
          </div>
         
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  name: "historyDiscount",
  data() {
    return {
      active: 2,
      shareList: [{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      },{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      },{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      },{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      },{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      },{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      },{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      },{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      },{
        couponName:'充100送500元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30'
      }],
      shareLoading: false,
      shareFinished: false,
      receiveLoading: false,
      receiveFinished: false,
      receiveList:[{
        couponName:'充100送100元优惠券',
        couponId:'Q1232323232323',
        shareTime:'2020-01-01 22:30',
        checkTime:'2020-01-01 23:30'
      }]
    };
  },
  mounted() {

  },
  methods: {
    shareOnLoad() {
      this.shareLoading = true;
      this.shareFinished = true;
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }

      //     // 加载状态结束
      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
    },
    receiveOnLoad() {
      this.receiveLoading = true;
      this.receiveFinished = true;
    }
  }
};
</script>

<style scoped>
.historyBox {
  background: white;
}
.item-history {
  display: flex;
  font-size: 32px;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
  border-bottom: 2px solid #f5f5f5;
  margin-left: 20px;
  margin-right: 20px;
}
.timeBox {
  font-size: 26px;
  margin-top: 8px;
  color: #9093a5;
}
.timeText {
  margin-right: 15px;
}
.discountName {
  color: black;
  font-weight: bolder;
}
.discountCode {
  color: #b3b3b3;
  font-size: 24px;
}
.historyBox .undoBtn {
  background: #ffe6e6;
  color: #ff6d6d;
  border-color: #ffe6e6;
  border-radius: 10px;
  width: 150px;
}
.historyBox .finishBtn {
  background: #d8edff;
  color: #4cacff;
  border-color: #d8edff;
  border-radius: 15px;
  width: 150px;
}
.item-right{
   align-self: flex-start;
}
.shareBox{
  margin-top: 30px;
}
::v-deep .van-tabs__nav  .van-tabs__line{
   background: linear-gradient(to right,#4ba1ea,#72c8fc);
}
::v-deep .van-button--disabled{
  opacity: 1 !important;
}
</style>
