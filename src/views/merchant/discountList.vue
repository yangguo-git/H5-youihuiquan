<template>
  <div class="discountList">
    <div>
      <div class="title">优惠券</div>

      <div v-if="couponArr.length == 0" class="noCoupon">
         <div class="noShare-box">{{noMsg}}</div>
      </div>

      <div class="listBox" v-else>
       <van-list v-model="shareLoading" :finished="shareFinished" finished-text="" @load="shareOnLoad">
        <div class="list-item" v-for="(item,index) in couponArr" :key="index">
          <div class="middleBox">
            <div class="imgBox"><img :src="item.imgUrl" alt="" class="discountImg" /></div>
            <div class="middle">
              <span>{{item.couponName}}</span>
              <div class="zhaiYao">{{item.couponAbstract}}</div>
            </div>
          </div>
          <van-button size="small" v-if="item.couponStatus"  class="finish_btn" color="linear-gradient(to right, #a8a8a8, #cbcbcb)" disabled>已分享</van-button>
          <van-button size="small" v-else class="right_btn" @click="shareNow(item)"  color="linear-gradient(to right, #4da3eb, #72c8fd)">立即分享</van-button>
        </div>

        </van-list>

      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
// import VConsole from 'vconsole'
// let vConsole = new VConsole();
export default {
  name: "discountList",
  data() {
    return {
        couponArr:[],
        isEmpty:false,
        shareLoading:true,
        shareFinished:true,
        noMsg:'',
        userId:''
    };
  },
  mounted() {
    // this.getdiscountList();
    this.getUserid();
  },
  methods: {
    getUserid(){
      let that = this;
      Toast.loading({
          message: '加载中',
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
                                        Toast.clear();
                                        that.getdiscountList(userId);
                                        console.log('that.userId',that.userId)
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
    shareOnLoad(){

    },
    shareNow(item){
        let that = this;
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:0,
            loadingType: 'spinner',
        });
        this.$get('/v1/jsapi/getConfig.do',{url: encodeURIComponent(window.location.href.split('#')[0])}
        ).then((res)=> {
            Toast.clear()
            if (res.status==200) {
                if(typeof res.data.module.config != "object"){
                    res.data.module.config = JSON.parse(res.data.module.config);
                };
                let configObj = res.data.module.config;
                console.log("/getConfig接口调用成功",res)
                
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
                        console.log('getAgentConfig接口调用',resJson)
                        
                        let {debug,corpid,agentid,timestamp,nonceStr,signature,jsApiList} = configObj;
                        wx.agentConfig({
                            corpid: corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
                            agentid: agentid, // 必填，企业微信的应用id
                            timestamp: timestamp, // 必填，生成签名的时间戳
                            nonceStr: nonceStr, // 必填，生成签名的随机串
                            signature: signature,// 必填，签名，见附录1
                            jsApiList: ["getContext","sendChatMessage","getCurExternalContact"], //必填
                            success: function(resAgent) {
                                console.log(" wx.agentConfig成功",resAgent)
                                //cs添加测试
                                // var userId;
                                // wx.invoke('getCurExternalContact', {
                                //     }, function(res){
                                //     if(res.err_msg == "getCurExternalContact:ok"){
                                //         userId  = res.userId ; //返回当前外部联系人userId
                                //     }else {
                                //         //错误处理
                                //     }
                                // });
                                //cs添加测试
                                wx.invoke('getContext', {
                                    }, function(res){
                                        console.log("getContext调用",res)
                                    if(res.err_msg == "getContext:ok"){
                                        
                                        let entry  = res.entry ; //返回进入H5页面的入口类型，目前有normal、contact_profile、single_chat_tools、group_chat_tools
                                        if(entry == 'single_chat_tools' || entry == 'group_chat_tools'){

                                            wx.invoke('sendChatMessage', { //分享
                                                msgtype:"news", //消息类型，必填
                                                news:{
                                                    link: item.couponLink, //H5消息页面url 必填
                                                    title: item.couponName, //H5消息标题
                                                    desc: item.couponAbstract, //H5消息摘要
                                                    imgUrl: item.imgUrl //H5消息封面图片URL
                                                }
                                            }, function(res) {
                                                  console.log("sendChatMessage",res)
                                                  if (res.err_msg == 'sendChatMessage:ok') {
                                                    that.$post(`/v1/coupon/shareCoupon`,{
                                                        userId:that.userId,
                                                        couponLink:item.couponLink, 
                                                        couponName:item.couponName, 
                                                        couponAbstract:item.couponAbstract, 
                                                        imgUrl: item.imgUrl,
                                                        couponId:item.itemId
                                                    }).then(res=>{
                                                          // console.log("shareCoupon",res)
                                                    })
                                                  
                                                }
                                                
                                            })
                                        }else{
                                            Toast.fail('需要从聊天工具栏进入页面分享');
                                        };  
                                        
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
    getdiscountList(Ids){//获取优惠券列表 
        let that = this;
        // Toast.loading({
        //     message: '加载中',
        //     forbidClick: true,
        //     duration:0,
        //     loadingType: 'spinner',
        // });
        this.$post(`/v1/coupon/selectByDeptId`,{
          userId:Ids
        }).then(res=>{
          // Toast.clear()
          if(res){
            let module = res.data.module;
            if(module.length > 0){
               that.couponArr = module;
            }else{
               that.couponArr = [];
               that.noMsg = "暂无数据"
            }
          }else{
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
.discountList {
  margin: 20px;
  font-size: 30px;
}
.title {
  font-size: 32px;
  color: #999999;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-radius: 10px;
  justify-content: space-between;
  height: 200px;
  background-color: white;
  box-shadow: 0px 6px 12px 0px rgba(107, 111, 114, 0.16);
}
.discountList .right_btn {
  width: 170px;
  margin-right: 20px;
  border-radius: 35px;
  align-self: flex-end;
  margin-bottom: 20px;
  color: white;
}
.discountList .finish_btn {
  width: 170px;
  margin-right: 20px;
  border-radius: 35px;
  align-self: flex-end;
  margin-bottom: 20px;
}
.discountImg {
  width: 100%;
  height: 100%;
}
.imgBox{
  width: 160px;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
}
.middle {
  align-self: flex-start;
  margin-left: 20px;
}
.middle span {
  font-size: 30px;
  color: black;
  font-weight: bold;
}
.middle .zhaiYao {
  font-size: 26px;
  color: #c5c5c5;
  margin-top: 5px;
}
.middleBox{
  display: flex;
  margin-left: 20px;
}
::v-deep .van-button--disabled{
  opacity: 1 !important;
}
.noCoupon{
  text-align: center;
  margin-top: 50px;
}
.noShare-box{
  font-size: 30px;
  color: #999999;
}
</style>
