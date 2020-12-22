<template>
  <div class="historyBox">
    <van-tabs v-model="active"  title-active-color="#323232" line-width="25px" sticky>
      <van-tab title="分享记录">
          <div v-if="shareList.length==0" class="noShare-box">
            <span>{{noshareMsg}}</span>
          </div>
          <div class="item-history" v-for="(item,index) in shareList" :key="index" v-else>
            <div class="item-left">
              <div class="discountName">{{item.couponName}}</div>
              <span class="discountCode">{{item.couponId}}</span>
              <div class="timeBox shareBox">
                <span class="timeText">分享时间</span>
                <span>{{item.shareTime}}</span>
              </div>
            </div>
          </div>
      </van-tab>
      <van-tab title="领取记录">
          <div v-if="receiveList.length==0" class="noShare-box">
            <span>{{norectiveMsg}}</span>
          </div>
          <div v-else class="item-history" v-for="(item,index) in receiveList" :key="index">
            <div class="item-left">
              <div class="discountName">{{item.couponName}}</div>
              <span class="discountCode">{{item.couponId}}</span>
              <div class="timeBox shareBox">
                <span class="timeText shareBox">分享时间</span>
                <span>{{item.shareTime}}</span>
              </div>
              <div class="timeBox">
                <span class="timeText">核销时间</span>
                <span>{{item.hx_time}}</span>
                <!-- <span>{{utils.formatTime(item.checkTime)}}</span> -->
              </div>
            </div>
            <div class="item-right">
               <van-button v-if="item.hx_status == 1"  plain type="info" size="small" class="finishBtn" disabled>已核销</van-button>\
               <van-button v-if="item.hx_status == 0" plain type="info" size="small" class="undoBtn" disabled>未核销</van-button>
            </div>
          </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Toast} from 'vant'
import utils from "../../utils/util"
// import VConsole from 'vconsole'
// let vConsole = new VConsole();
export default {
  name: "historyDiscount",
  data() {
    return {
      active: 2,
      noshareMsg:'',
      norectiveMsg:'',
      noMsg:'',
      shareList: [],
      receiveList:[],
      userId:''
    };
  },
  mounted() {
    // this.gethistoryList();
    this.getUserid();
  },
  methods: {
    getUserid(){
      let that = this;
      Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:0,
            loadingType: 'spinner',
      });
      this.$get('/v1/jsapi/getConfig.do',{url: encodeURIComponent(window.location.href.split('#')[0])}
      ).then((res)=> {
            // Toast.clear()
            if (res.status==200) {
                if(typeof res.data.module.config != "object"){
                    res.data.module.config = JSON.parse(res.data.module.config);
                };
                let configObj = res.data.module.config;
                let {debug,corpid,appId,timestamp,nonceStr,signature,jsApiList} = configObj;
                wx.config({
                    beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appId, // 必填，企业微信的corpID
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
                    jsApiList: ["getContext","sendChatMessage","getCurExternalContact"],// 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来,
                });
                wx.ready(function(){
                   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    that.$get('/v1/jsapi/getAgentConfig.do',{url: encodeURIComponent(window.location.href.split('#')[0])}
                    ).then((resJson) => {
                        if(typeof resJson.data.module.config != "object"){
                            resJson.data.module.config = JSON.parse(resJson.data.module.config);
                        };
                        let configObj = resJson.data.module.config;
                        let {debug,corpid,agentid,timestamp,nonceStr,signature,jsApiList} = configObj;
                        wx.agentConfig({
                            corpid: corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
                            agentid: agentid, // 必填，企业微信的应用id
                            timestamp: timestamp, // 必填，生成签名的时间戳
                            nonceStr: nonceStr, // 必填，生成签名的随机串
                            signature: signature,// 必填，签名，见附录1
                            jsApiList: ["getContext","sendChatMessage","getCurExternalContact"], //必填
                            success: function(resAgent) {
                              wx.invoke('getCurExternalContact', {
                                    }, function(res){
                                    if(res.err_msg == "getCurExternalContact:ok"){
                                        let userId  = res.userId ; //返回当前外部联系人userId
                                        that.userId = userId;
                                        Toast.clear()
                                        that.gethistoryList(userId);
                                        // console.log('that.userId',that.userId)
                                    }else {
                                        //错误处理
                                    }
                                });
                            },
                            fail: function(res) {
                                if(res.errMsg.indexOf('function not exist') > -1){
                                    alert('版本过低请升级')
                                }
                            }
                        });
                    });
                    
                });
                wx.error(function(res){
                    console.log('config error出错了',res)
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            } else {
                Toast.fail(res.data.msg);
            }
        })
    },
    gethistoryList(Ids){
        let that = this;
        // Toast.loading({
        //     message: '加载中...',
        //     forbidClick: true,
        //     duration:0,
        //     loadingType: 'spinner',
        // });
        this.$post(`/v1/coupon/shareHistroy`,{
          userId:Ids
        }).then(res=>{
          // Toast.clear()
          if(res){
            let module = res.data.module;
            console.log(module,'shareHistroy接口')
            if(module.length > 0){
                 module.forEach(item =>{
                   if(item.hx_status){
                      that.receiveList.push(item)
                   }else{
                      that.shareList.push(item)
                   }
                 })

                 //是否有核销记录
                 if(that.receiveList.length == 0){
                    that.norectiveMsg = "暂无数据";
                 }
                 //是否有分享记录
                 if(that.shareList.length == 0){
                   that.noshareMsg = "暂无数据";
                 }

            }else{
                that.shareList = [];
                that.noshareMsg = "暂无数据";
                that.receiveList = [];
                that.norectiveMsg = "暂无数据";
            }
          }
        }).catch(err=>{
          // Toast.clear()
          Toast.fail('获取数据失败');
        })
    }
    
  }
};
</script>

<style scoped>
.historyBox {
  /* background: white; */
}
.item-history {
  display: flex;
  font-size: 32px;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  border-bottom: 2px solid #f5f5f5;
  /* margin-left: 20px; */
  /* margin-right: 20px; */
  background: white;
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
.noShare-box{
  text-align: center;
  font-size: 30px;
  color: #999999;
  margin-top: 50px;
}
.line{
  height: 2px;
  width: 100%;
  border-color:#f5f5f5;
}
</style>
