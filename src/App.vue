<template>
  <div id="app">
    <!-- <router-view v-wechat-title='$route.meta.title'/> -->
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created(){
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
          WeixinJSBridge.call('hideOptionMenu');
    });
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('pagehide', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
  mounted(){

   


  }
  
}
</script>

<style>
html{
  height: 100%;
  background-color: #f6f6f6;
}
body{
  min-width: 320px;
  -webkit-tap-highlight-color: transparent;
  font-family: "Lucida Grande", Verdana, "Microsoft Yahei", STXihei, hei;
  margin: 0;
  padding: 0px;
}
#app{
  height: 100%;
}
</style>
