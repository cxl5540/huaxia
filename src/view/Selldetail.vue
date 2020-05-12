<template>
	<div class="surebuy">
		<div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
		 	<span>卖出详情</span>
		 	<span style="opacity: 0;">title</span>
		</div>
		<div class="detail">
			<p>{{detaildata.productName}}</p>
			<p  :class="detaildata.profitLossStatus=='1'?'up':'down'">买入类型:{{detaildata.buyTypeId==16?'买涨':'买跌'}}</p>
			<p  :class="detaildata.profitLossStatus=='1'?'up':'down'">买入金额：{{detaildata.buyMoney}}元</p>
			<p>买入指数：{{detaildata.buyIndex}}</p>
			<p>买入时间：{{detaildata.createTime}}</p>
		</div>
		<span><img src="../assets/b_zhushi_h.png"/>投资有风险，入市需谨慎</span>
		<div class="btn">
			<button @click="submit(detaildata)" :class="detaildata.profitLossStatus=='1'?'bgup':'bgdown'">确认卖出</button>
		</div>
		<div class="model" v-show="model">
			<div class="success">
				<img src="../assets/pic_chenggong.png" alt="" />
				<p>卖出成功</p>
				<p>自动跳转到结算页面</p>
			</div>
		</div>
		<p>卖出当前行情指数:<span :class="detaildata.profitLossStatus=='1'?'up':'down'">{{detaildata.currIndex}}</span></p>
		<p>平仓盈亏:<span :class="detaildata.profitLossStatus=='1'?'up':'down'">{{detaildata.closePositionProfitLoss}}元</span></p>
		<p>手续费:<span>{{detaildata.transactionFee}}元</span></p>
		<p>剩余金额:<span>{{detaildata.balance}}元</span></p>
		
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
    	orderNumber:'',
    	detaildata:'',
		currPrice:''
    }
  },
 
  created(){
	this.type=this.$route.query.type;
	this.orderNumber=this.$route.query.orderNumber;
    this.currPrice=this.$route.query.currPrice;
	this.getbuydetai();
  },
  mounted(){
		
  },
  methods:{
	back(){
	  	this.$router.go(-1)
	  },
	 getbuydetai(){   //获取详情
	 	let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"get",
		 	url:this.testUrl+'product/getOrderdetail',
		 	data:{				
		 		orderNumber:this.orderNumber,
		 		uid:localStorage.getItem('uid'),
				currPrice:this.currPrice
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.detaildata=res.data;
	       		  console.log(  _this.detaildata)
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
	 submit(detaildata){
	 	$('#loading').show()
	 	let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'product/sellOrder',
		 	data:{
		 		orderNumber:detaildata.orderNumber,
		 		uid:localStorage.getItem('uid'),
		 		closePositionProfitLoss:detaildata.closePositionProfitLoss,
		 		serviceCharge:detaildata.transactionFee,
		 		sellIndex:detaildata.currIndex,
		 		profitLossStatus:detaildata.profitLossStatus,
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.model=true;
	       		  setTimeout(function(){
	       		  	 _this.model=false;
	       		  	 _this.$router.push({path:'/dealdetail',query:{clas:'sell'}})
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
	  },
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
.detail>p:nth-child(5){
	font-size: 0.34rem;
	color: #999999;
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
.btn>button{
	width: 100%;
	font-size: 0.53rem;
	font-weight:bold;
	color: #fff;
}
.surebuy>p{
	font-size: 0.42rem;
	color: #666666;
	width: 80%;
	margin: 0.4rem auto;
	text-align: left;
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