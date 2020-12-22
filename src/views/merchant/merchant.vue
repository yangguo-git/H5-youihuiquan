<template>
	<div class="main">
      
	  <div class="provide">
        <div class="provide-left">
          <div class="title">优惠券发放</div>
		  <span>优惠活动分享</span>
		</div>

		<div class="provide-right">
			 <!-- <van-button  size="normal" class="btn-style" color="linear-gradient(to right, #4ba1ea, #72c8fc)" @click="goList">优惠券列表</van-button> -->
			 <!-- <van-button plain type="info" size="normal" class="btn-style share" @click="goHistory">分享历史</van-button> -->
			<div class="btnBox topBox" @click="goList">
				<span>优惠券列表</span>
			</div>
            <div class="btnBox bottomBox" @click="goHistory">
				<span>分享历史</span>
			</div>
		</div>
	  </div>
	  
	</div>
</template>

<script>
import {Toast} from 'vant'
import {httpUrl} from "../../request/index"
// import VConsole from 'vconsole'
// let vConsole = new VConsole();
export default {
	name:'merchant',
	data() {
		return {

		};
	},
	created() {
	},
	mounted() {
	//    this.getSession();
	// console.log(document.title)
	},
	methods: {
		goList(){
          this.$router.push("/discountlist")
		},
		goHistory(){
          this.$router.push("/historydiscount")
		},
		getSession(){
           this.$get('/v1/email/getSession.do',{
			}).then(res=>{
			if(res.data){
				if(res.data.length > 0){
					let getArr = res.data;
					let newObj;
					getArr.forEach(function(item){
                      if(item.name == "SESSION"){
                         newObj = item;
					  }
					})
					document.cookie=`SESSION=${newObj.value}`;
				}
			}
		  })
		}
	},
	computed:{

	},
	watch:{

	}
};
</script>

<style scoped>
.main{
	font-size: 25px;
}
.provide{
  display: flex;
  margin: 25px;
  justify-content: space-between;
  border-radius: 15px;
  padding: 30px 22px;
  box-shadow: 0px 6px 12px 0px rgba(107,111,114,0.16); 
  background-color: white;
}
.provide-right{
	display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
}
.title{
	color: black;
	font-size: 34px;
	font-weight: bold;
	margin-bottom: 5px;
}
.provide-left span{
	font-size: 26px;
	color: #999999;
	}
.btn-style{
	text-align: center;
	border-radius: 50px;
	font-size: 28px;
	height: 65px;
	line-height: 65px;
}
.share{
	margin-top: 15px;
	color: #52a3ea;
	border-color: #52a3ea;
}
/*  */
.btnBox{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	width: 150px;
	font-size: 27px;
	border-radius:35px ;
}
.topBox{
	margin-bottom: 15px;
	background: linear-gradient(to right, #4ba1ea, #72c8fc);
	color: white;
	border: 1.5px solid;
	border-image: -webkit-linear-gradient(#4ba1ea, #72c8fc) round;
    border-image: -moz-linear-gradient(#4ba1ea, #72c8fc) round;
    border-image: -o-linear-gradient(#4ba1ea, #72c8fc) round;
    border-image: linear-gradient(#4ba1ea, #72c8fc) round;
}
.bottomBox{
	color: #52a3ea;
	border-color: #52a3ea;
	border: 1.5px solid;
}
/*  */
</style>
