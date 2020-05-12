<template>
	<div class="surebuy">
		<div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
		 	<span>{{productName}}</span>
		 	<span style="opacity: 0;">title</span>
		</div>
		<div class="detail">
			<p>{{productName}}</p>
			<p  :class="type=='in'?'up':'down'">买入类型:{{type=='in'?'买涨':'买跌'}}</p>
			<p  :class="type=='in'?'up':'down'">买入金额：{{buymoney}}元</p>
			<p>买入指数：{{lastP}}</p>
		</div>
		<span><img src="../assets/b_zhushi_h.png"/>投资有风险，入市需谨慎</span>
		<div class="btn">
			<button :class="type=='in'?'up':'down'">￥{{buymoney}}</button>
			<button @click="submit()" :class="type=='in'?'bgup':'bgdown'">确认{{type=='in'?'买涨':'买跌'}}</button>
		</div>
		<div class="model" v-show="model">
			<div class="success">
				<img src="../assets/pic_chenggong.png" alt="" />
				<p>交易成功</p>
				<p>自动跳转到持仓页面</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
    	type:'',
    	model:false,
    	lastP:'',
    	productName:'',
    	productCode:'',
    	buymoney:'',
    }
  },
 
  created(){
	this.type=this.$route.query.type;
	this.buymoney=this.$route.query.buymoney;
    this.productCode=this.$route.query.productCode;
    this.productName=this.$route.query.productName;
    this.lastP=this.$route.query.lastP;
  },
  mounted(){
		
  },
  methods:{
	 back(){
	  	this.$router.go(-1)
	  },
	  submit(){
	  	$('#loading').show()
	  	let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'product/createOrder',
		 	data:{
		 		uid:localStorage.getItem('uid'),
		 		productCode:this.productCode,
		 		buyStatus:this.type=='in'?16:17,
		 		buyIndex:this.lastP,
		 		bugMoney:this.buymoney,
		 		productCode:this.productCode
		 	},
		 	success:function(res){
	       		if(res.code==200){
//	       		   _this.$toast('购买成功'); 
	       		  _this.model=true;
	       		  setTimeout(function(){
	       		  	_this.model=false;
	       		  	_this.$router.push({path:'/dealdetail',query:{clas:'buy'}})
	       		  },2000)
	       		   
	       		}else if(res.code==400){
	       			 _this.$toast(res.msg);
	       		}
	       
	         },          
	         error:function(res){
	          _this.$toast('网络错误');
	         },
	        complete:function(){
	        	$('#loading').hide()
	        }
		 });	
	  }
  	}
  }	
</script>

<style scoped>
.surebuy{
	height: 100vh;
	background: #F1F1F1;
}	
.detail{
	background: #fff;
	width: 9.06rem;
	margin:0.4rem auto;
	text-align: left;
	border-radius:10px;
	box-sizing: border-box;
	padding: 0.4rem;
}
.detail>p{
	margin: 0.4rem 0;
}
.detail>p:nth-child(1){
	color: #111111;
	font-size: 0.42rem;
	font-weight: bold;
}
.detail>p:nth-child(2),.detail>p:nth-child(3){
 font-size: 0.34rem;	
}
.detail>p:nth-child(4){
	color: #666666;
	 font-size: 0.34rem;	
}
.surebuy>span{
	display: block;
	width: 100%;
	position: absolute;
	bottom: 1.6rem;
	color: #666666;
	font-size: 0.32rem;
}
.surebuy>span>img{
	vertical-align: middle;
	max-height: 0.32rem;
	margin-right: 0.13rem;
	position: relative;
    top: -2px;
}
.btn{
	width: 100%;
	height:1.29rem;
	position: absolute;
	left: 0;
	bottom: 0;
	display: flex;
}
.btn>button:nth-child(1){
	background: #fff;
	font-size: 0.48rem;
	font-weight:bold;
	text-align: left;
	width: 65%;
}
.btn>button:nth-child(2){
	width: 35%;
	font-size: 0.53rem;
	font-weight:bold;
	color: #fff;
}
.model{
	height: 100vh;
	width: 100%;
	background:rgba(0,0,0,0.4);
	position: absolute;
	top: 0;
	left: 0;
}
.success{
	width:6.08rem;
	height:5.06rem;
	background:rgba(255,255,255,1);
	border-radius:0.53rem;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -3.04rem;
	margin-left: -2.53rem;
	text-align: center;
}
.success>img{
	max-height: 1.2rem;
	margin: 0.7rem 0;
}
.success>p:nth-child(2){
	color: #121212;
	font-weight: bold;
	font-size: 0.32rem;	
	margin-bottom: 0.4rem;
}
.success>p:nth-child(3){
	color: #999999;
	font-size: 0.32rem;
}	
</style>