<template>
  <div>
    <van-nav-bar
      title="我的"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    />

    <van-nav-bar title="我的" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {

      
    };
  },
  created() {
    // this.$get('/client/info',{
		// 		   infoInside:substrUrl
		// 		}).then(res=>{
		// 			var res = res.data.data;
		// 			if(res.nickName){
		// 				var postUsername = decodeURIComponent(res.nickName);
		// 				localStorage.setItem("userName",postUsername);
		// 			}
    // 		})
    
    // this.$post('/order/pay', orderObj).then(res => {
		// 			if (res.data.status == 0) {
		// 				var getWxabout = res.data.data;
		// 				var thatVm = this;
		// 			}
		// })



  },
  mounted() {},
  methods: {
    onClickLeft() {},
    onClickRight() {},
  },
};
</script>

<style scoped>
</style>
