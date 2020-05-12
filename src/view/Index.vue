<template>
  <div class="index">
      <Header></Header>
      <div style="margin-top: 1.17rem;">
		    <mt-swipe :auto="5000" >
				  <mt-swipe-item  v-for='item,index in bannerlist' :key='index'>
				  	 <img style="width: 100%;" :src='item.image'/>
				  </mt-swipe-item>
				</mt-swipe>
		</div>
     <div class="product" >
     		<p>交易产品</p>
     		<ul>
     			<li  v-for="item,index in prolist" :key="index" :class="item.lastZf<0?'down':'up'" @click="prodetail(item,item.productCode)">
     				<p>{{item.productName}}</p>
     				<p :class="item.status==0?'stop':item.status==1&&item.lastZf<0?'down':'up'">{{item.lastP}}
     					<img v-if="item.status==1&&item.lastZf<0" src="../assets/xiadie.png"/>
     					<img v-if="item.status==1&&item.lastZf>0" src="../assets/xiadie拷贝3.png"/>
     				</p>
     				<p :class="item.status==0?'stop':item.lastZf<0?'down':'up'">{{item.status==1?Tomunber(item.lastZf):'休市中'}}</p>
     			</li>
     		</ul>
     </div>
     
     <div class="news">
	     	<p style="border-bottom: 1px solid #eee;">资讯新闻</p>
	     	<div>
	     		<iframe frameborder="0" width="100%" height="500" scrolling="yes" src="https://www.jin10.com/example/jin10.com.html?fontSize=14px&theme=white"></iframe>
	     	</div>
     </div>
     <Tabbar></Tabbar>
     <!--<div class="img" v-if="flag==true">
     	<img src="../assets/pic_qidong.png"/>   	
     </div>-->
  </div>
</template>

<script>
	import Header from "../components/Header.vue"
	import Tabbar from "../components/tabbar.vue"
	/*import SockJS from 'sockjs-client';
import Stomp from 'stompjs';*/
export default {
  name: 'HelloWorld',
  components:{
  	Header,
   Tabbar,	
  },
  data () {
    return {   	
    	stompClient:'',
            timer:'',
		        prolist:[
			        {
								productName:'--',
								lastZf:'--',
					      lastP:'休市中'    
					     },
				      {
				      productName:'--',
							lastZf:'--',
				      lastP:'休市中'   
				      },
				      {
				      productName:'--',
							lastZf:'--',
				      lastP:'休市中'   
				      },
				      {
				      productName:'--',
							lastZf:'--',
				      lastP:'休市中'   
				      }
		       ],
			   		bannerlist:'',
			   		flag:true,
			   		timer:'',			   		
    }
  },
 
  created(){
   this.getbanner();
   this.getpro();
  },
  mounted(){
  		$('#loading').show()
		   this.timer = setInterval(() => {
                this.getpro();
           }, 10000)
  },
   beforeDestroy() {       // 页面离开时断开连接,清除定时器
      clearInterval(this.timer);
   },
// watch:{
// 	prolist(val,oldval){
// 		for (var i=0;i<prolist.length;i++) {
// 			if(val[i].lastP!==oldval[i].lastP){
// 				this.index=0;
// 				setTimeout(function(){
// 						this.index='';
// 				},1000)
// 				
// 			}
// 			
// 		}
// 	},
// 	deep:true
// },
  methods:{
  	getbanner(){           //获取轮播图
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"post",
			 	url:this.testUrl+'mobile/getBanner',
			 	data:{},			 	
			 	success:function(res){
		       		if(res.code==200){
		       		  _this.bannerlist=res.data;
					  console.log(res)
		       		}
		       
		         },          
		         error:function(res){
		          _this.$toast('网络错误');
		         },
		        complete:function(){
		        	$('#loading').hide()
		        }
			 });
  	},
	  prodetail(item,productCode){      //跳转详情页
	  	if(item.status=='0'){
	  		 this.$toast('已休市');
	  		return false;
	  	}else{
	  		this.$router.push({path:'/prodetail',query:{productCode:productCode}})
	  	}
	  	
	  	
	  },
		getpro(){          //获取行情
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'product/getIndex',
			 	data:{},		 	
			 	success:function(res){
		       		if(res.code==200){
		       		  _this.prolist=res.data;
		       		}
		       
		         },          
		         error:function(res){
		          _this.$toast('网络错误');
		         },
		        complete:function(){
		        	
		        }
			 });
		},


  }
 }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: #fff;
	z-index: 9;
}	
.product>ul{
	display: flex;
	flex-wrap:wrap;
	 box-sizing: border-box;
}
.product>ul>li{
	width: calc(100% /3);
	border: 1px solid #eee;
	padding: 0.4rem 0;
	margin: 0 0 -1px -1px;
	    float: left;
}
.product>p,.news>p{
 font-size:0.4rem;
 padding: 0.26rem 0;
 text-align: left;
 padding-left:0.4rem;
}
li{
  border-left: 0;
}
li>p:nth-child(1){
	color: #333333;
	font-size: 0.4rem;
}
li>p:nth-child(2){
	font-size:0.48rem;
	font-weight: 800;
	margin: 0.13rem 0;
}
li>p:nth-child(2)>img{
	height: 0.32rem;
}
li>p:nth-child(3){
	font-size: 0.32rem;
}
ul>li:nth-child(1){
	border-bottom:0;
	border-left: 0;
}
ul>li:nth-child(2){
	border-left: 0;
	border-right: 0;
}
ul>li:nth-child(3){
		border-right: 0;
}
.news{
	height: 5.33rem;
	margin-bottom: 4.3rem;
}
.stop{
	color: #ccc;
}
.img{
	height: 100vh;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
}
.img>img{
	width: 100%;
	height: 100%;
}
</style>
