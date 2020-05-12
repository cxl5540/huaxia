<template>
 <div class="prodetail">
	 <div class="header">
	 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
	 	<span>产品详情</span>
	 	<span @click="roulers">规则</span>
	 </div>
	 <div class="top">
	 	<span>可用资金:{{money}}</span>
	 	<span @click="addmoney">充值</span>
	 </div>
	 <div class="mid">
	 	<div class="lt">
	 		<p>当前价格</p>
	 		<div>
	 			<span>{{detaillist.lastP}}</span>
	 			<div>
	 				<p>{{Tomunber(detaillist.lastZf)}}</p>
	 				<p>{{detaillist.lastVf}}</p>
	 			</div>
	 		</div>
	 		<p class="name"><span>{{detaillist.productName}}</span><span>{{detaillist.productCode}}</span></p>
	 	</div>
	 	<div class="rt">
	 		<p>当前交易情况</p>
	 		<div>
	 			<p><span></span> <span>买入<span>{{detaillist.lastBuyNum}}</span></span></p>
	 			<p><span></span> <span>卖出<span>{{detaillist.lastSellNum}}</span></span></p>
	 		</div>
	 	</div>
	 </div>
	 <Kline></Kline>
	  <div class="btn">
		 	<button @click="goccang">持仓</button>
		 	<button @click="gojiesuan">结算</button>
		 	<button><span @click="buydown()">买跌</span><span>{{detaillist.lastP}}</span></button>
		 	<button><span  @click="buyin()">买涨</span><span>{{detaillist.lastP}}</span></button>
		 </div>
 </div>
</template>

<script>
import Kline from "../components/Kline.vue"
export default {
  name: 'HelloWorld',
  components:{
	Kline,
  },
  data () {
    return {
    	money:'',
    	productCode:'',
    	detaillist:'',
    	timer:'',
    }
  },
 
  created(){
  	this.productCode=this.$route.query.productCode;
   this.getmonet();  //获取可用资金
   this.getdetail();//获取详情
  },
  mounted(){
	 this.timer = setInterval(() => {
                this.getdetail();
           }, 5000)		  
  },
   beforeDestroy() {       
         clearInterval(this.timer);
   },	
  methods:{
	back(){
	  	this.$router.go(-1)
	  },
	getmonet(){                 //获取可用资金
		let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"get",
		 	url:this.testUrl+'product/getWallet',
		 	data:{
		 		uid:localStorage.getItem('uid')
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.money=res.data.balance;
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
	getdetail(){   //获取详情
	 let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"get",
		 	url:this.testUrl+'product/getProductData',
		 	data:{
		 		productCode:this.productCode
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.detaillist=res.data;
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
	 buyin(){  //买涨
	 	if(localStorage.getItem('uid')){
	 		this.$router.push({path:'/dealagree',query:{type:'in',money:this.money,productCode:this.productCode}})
	 	}else{
	 		this.$router.push({path:'/login'})	
	 	}
//	 	this.$router.push({path:'/buyin',query:{type:'in'}})
	 },
	 buydown(){  //买跌
	 	if(localStorage.getItem('uid')){
	 		this.$router.push({path:'/dealagree',query:{type:'down',money:this.money,productCode:this.productCode}})
	 	}else{
	 		this.$router.push({path:'/login'})	
	 	}
	 	
//	 	this.$router.push({path:'/buyin',query:{type:'down'}})
	 },
	 goccang(){  //持仓
	 	if(localStorage.getItem('uid')){
	 		this.$router.push({path:'/dealdetail',query:{clas:'buy'}})
	 	}else{
	 		this.$router.push({path:'/login'})
	 	}
	 	
	 },
	 gojiesuan(){  //结算
	 	if(localStorage.getItem('uid')){
	 		this.$router.push({path:'/dealdetail',query:{clas:'sell'}})
	 	}else{
	 	   this.$router.push({path:'/login'})
	 	}
	 },
	 addmoney(){
	 	if(localStorage.getItem('uid')){
	 		 // this.$router.push({path:'/addmoney',query:{type:'add'}})
			 this.$toast('充值请添加客服微信');
			 let _this=this;
			 setTimeout(function(){
			 				_this.$router.push({path:'/chat'}) 
			 },2000)
	 	}else{
	 	   this.$router.push({path:'/login'})
	 	}
	   	
	 },
	 roulers(){ //规则
		 this.$router.push({path:'/dealrules'})
	 }
  	}
  }	
</script>

<style scoped>
.top{
	display: flex; 
	justify-content: space-between;
	font-size: 0.37rem;
	box-sizing: border-box;
	padding: 0.4rem;
	border-bottom: 1px solid #eee;
}
.top>span:nth-child(1){
	color: #333333;
}
.top>span:nth-child(2){
	display: inline-block;
	width:1.89rem;
	height:0.61rem;
	border-radius:2px;
	border: 2px solid #EE4B43;
	color: #EE4B43;
	line-height: 0.61rem;
}
.mid{
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0.3rem;
	text-align: left;
	border-bottom: 1px solid #eee;
}
.lt>p:nth-child(1),.lt>p:nth-child(2){
	color: #999999;
	font-size: 0.37rem;
}
.lt>div{
	display: flex;
	justify-content: space-between;
	margin: 0.13rem 0;
}
.lt>div>span{
	font-size: 0.74rem;
	font-weight: bold;
	margin-right: 0.13rem;
}
.lt>div>div{
	font-size: 0.32rem;
}
.name>span:nth-child(1){
	font-size: 0.37rem;
	color: #333333;
}
.name>span:nth-child(2){
	font-size: 0.37rem;
	color: #999999;
}
.rt>div>p{
	margin: 0.3rem 0;
}
.rt>div>p>span:nth-child(1){
	display: inline-flex;
	width: 1.33rem;
	height: 0.24rem;
	background: red;
}
.rt>div>p>span:nth-child(2){
	color: #999999;
	font-size: 0.37rem;
	display: inline-block;
	width: 1.63rem;
}
.rt>div>p>span:nth-child(2)>span{
	font-size: 0.32rem;
}
 .btn{
 	display: flex;
 	justify-content: space-between;
 	position: absolute;
 	left: 0;
 	bottom: 0;
 	width: 100%;
	box-shadow:0px 2px 32px 0px rgba(58,84,139,0.31);
 }
  .btn>button{
  	width: 25%;
  	font-size: 0.42rem;
  }
   .btn>button:nth-child(1){
   	border-right: 1px solid #eee;
   }
  .btn>button:nth-child(1),.btn>button:nth-child(2){
  	background: #FFFFFF;
  	padding: 0.53rem;
  	color: #666666;
  	    
  	
  }	
  .btn>button:nth-child(3){
  	background: #0BA293;
  	color: #fff;
  }
   .btn>button:nth-child(4){
  	background: #EE4B43;
  	color: #fff;
  }
  .btn>button:nth-child(3)>span:nth-child(1),.btn>button:nth-child(4)>span:nth-child(1){
  	font-weight: bold;
  	font-size: 0.48rem;
  	display: block;
  }
</style>