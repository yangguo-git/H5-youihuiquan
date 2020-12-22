import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//适配
import './remconfig/rem'
//请求
import { getHttp, postHttp,uploadImg} from './request/index'
import _ from 'lodash'
Vue.config.productionTip = false;

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import Meta from 'vue-meta'
Vue.use(Meta)
//vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 阿里
// import '../src/styles/index.css'

//修改页面标题
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.prototype.$get = getHttp;
Vue.prototype.$post = postHttp;
Vue.prototype.$postImg = uploadImg;
Vue.prototype.$lodash=_;

//修改页面标题
router.beforeEach((to, from, next) => {
      if (to.meta.title) {
          document.title = to.meta.title
      }
      next()
 })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
