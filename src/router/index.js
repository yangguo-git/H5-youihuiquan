import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter);

const Merchant = () => import('@/views/merchant/merchant');
const HistoryDiscount = () => import('@/views/merchant/historyDiscount');
const DiscountList = () => import('@/views/merchant/discountList');

const routes = [
	{  
		path: '/',
	    redirect: '/merchant'
	},
	{
		path: '/merchant',
		name: 'merchant',
		component: Merchant,
		meta: {title:"业务工具" }
	},
	{
		path: '/historydiscount',
		name: 'historydiscount',
		component: HistoryDiscount,
		meta: {title:"分享历史" }
	},{
		path: '/discountlist',
		name: 'discountlist',
		component: DiscountList,
		meta: {title:"优惠券发放" }
	}
];

const router = new VueRouter({
	routes
});
export default router
