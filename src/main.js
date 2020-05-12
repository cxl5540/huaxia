// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
Vue.config.productionTip = false
import Axios from 'axios'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$axios = Axios;
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import Clipboard from 'vue-clipboard2'
Vue.use(Clipboard)

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'; 
Vue.use(Mint);
import  '../static/js/global.js'
import { MessageBox } from 'mint-ui';
Vue.prototype.$messagebox = MessageBox
//Vue.prototype.$toast = Toast
//Vue.prototype.testUrl = "http://47.108.143.16/" ;
// Vue.prototype.testUrl = "http://120.27.3.220:9501/yhjf/"
Vue.prototype.testUrl = "http://127.0.0.1:8089/yhjf/"
Vue.prototype.uid='';

//import SockJS from  'sockjs-client';
//import  Stomp from 'stompjs';
Vue.prototype.Tomunber=function(num){
	
	num>0?num='+'+Number(num).toFixed(2)+'%':num=Number(num).toFixed(2)+'%';
	return num;
}
//上拉加载
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.prototype.formatDate=function(now) { 
		     var year=now.getFullYear(); 
		     var month=now.getMonth()+1; 
		        month<10?month='0'+month:month=month;
		     var date=now.getDate();
		       date<10?date='0'+date:date=date;
		     var hour=now.getHours();
		       hour<10?hour='0'+hour:hour=hour;
		     var minute=now.getMinutes(); 
		    minute<10?minute='0'+minute:minute=minute;
		     var second=now.getSeconds(); 
		    second<10?second='0'+second:second=second;
		     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;    
		}, 


router.beforeEach((to, from, next) => {
if (to.meta.title) {
document.title = to.meta.title
}
next()
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
