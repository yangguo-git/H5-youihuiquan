// 保留两位小数
function hasDot(num){
    if(!isNaN(num)){
        return ( (num + '').indexOf('.') != -1 ) ? num.toFixed(2) : num.toFixed(2);   
    }
}
//格式化时间
function setZero(value){
	return value < 10 ? "0"+value : value;
}
function formatTime(num) {
		let len = (num + ' ').length;
		let data = "";
		if (len == 10) {
		   data = num * 1000;
		} else {//否则时间戳位数为13时,单位是毫秒,无需变换
		   data = num;
		}
		var dates = new Date(data); //格式化时间戳,变为国际标准模式====> 如: Fri Apr 19 2019 13:42:34 GMT+0800 (中国标准时间)
		let Y = dates.getFullYear() + "-";
		let M = (dates.getMonth() + 1 < 10 ? "0" + (dates.getMonth() + 1) : dates.getMonth() + 1) + "-";
		let D = setZero(dates.getDate()) + " ";
		let h = setZero(dates.getHours()) + ':';
		let m = setZero(dates.getMinutes()) + ':';
		let s = setZero(dates.getSeconds());
		return Y + M + D + h + m + s;
}
//微信：
function isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }
    return false;
}
//支付宝
function isAlipay() {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/Alipay/i) == "alipay"){
        return true;
    }
    return false;
}
//获取url参数
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
//获取code
function getUrlCode (name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}
export default{
    hasDot,
    formatTime,
    isWeixin,
    isAlipay,
    getQueryVariable,
    getUrlCode
}

