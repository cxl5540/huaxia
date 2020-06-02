<template>
	<div class="surebuy">
		<div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>{{$store.state.lg=='C'?'返回':'Back'}}</span>
		 	<span>{{$store.state.lg=='C'?productName:englishName}}</span>
		 	<span style="opacity: 0;">title</span>
		</div>
		<div class="detail">
			<!-- <p>{{productName}}</p> -->
      <p>{{$store.state.lg=='C'?'买入产品':'Buy products'}}：{{$store.state.lg=='C'?productName:englishName}}</p>
      	<p  :class="type=='in'?'up':'down'">{{$store.state.lg=='C'?'买入类型':'Type'}}:{{$store.state.lg=='C'&&type=='in'?'买涨':$store.state.lg=='C'&&type=='down'?'买跌':$store.state.lg=='E'&&type=='in'?'Buy up':'Buy put'}}</p>
      <p>{{$store.state.lg=='C'?'买入合约价':'Purchase contract price'}}：{{curdata.curPrice}}</p>
      <p>{{$store.state.lg=='C'?'买入合约价值':'Purchase contract value'}}：{{curdata.curValue}}</p>
      <p>{{$store.state.lg=='C'?'交易手续费':'Transaction fee'}}：{{curdata.currencyUnit}}{{curdata.buyFee}}</p>
      <p>{{$store.state.lg=='C'?'交易保证金':'Bond'}}：{{curdata.currencyUnit}}{{curdata.tradeKicker}}</p>

		<!-- 	<p  :class="type=='in'?'up':'down'">{{$store.state.lg=='C'?'买入金额':'Buy products'}}：{{buymoney}}元</p> -->
			<!-- <p>买入指数：{{lastP}}</p> -->
		</div>
		 <span><img src="../assets/b_zhushi_h.png"/>{{$store.state.lg=='C'?'投资有风险，入市需谨慎':'There are risks in investment,cautious when entering the market'}}</span>
		<div class="btn">
			<button :class="type=='in'?'up':'down'"><span style="color: #000000;">{{$store.state.lg=='C'?'合计金额':'payment'}}:</span>{{curdata.currencyUnit}}{{curdata.total}}</button>
			<button @click="submit()" :class="type=='in'?'bgup':'bgdown'">{{$store.state.lg=='C'?'确定买入':'CL-Buy'}}</button>
		</div>
		<div class="model" v-show="model">
			<div class="success">
				<img src="../assets/pic_chenggong.png" alt="" />
				<p>{{$store.state.lg=='C'?'交易成功':'Successful trade'}}</p>
				<p>{{$store.state.lg=='C'?'自动跳转到持仓页面':'Auto jump page'}}</p>
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
    	productName:'',
    	productCode:'',
    	curdata:'',
      englishName:'',
    }
  },

  created(){
	this.type=this.$route.query.type;
    this.productCode=this.$route.query.productCode;
    this.productName=this.$route.query.productName;
    this.buyCount=this.$route.query.buyCount;
    this.englishName=this.$route.query.englishName;
    this.curdata=JSON.parse(this.$route.query.curdata);
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
		 		buyType :this.type=='in'?16:17,
		 		buyIndex:'',
		 		buyCount:this.buyCount,
        buyMoney:''
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
	       			_this.$router.push({path:'/dealdetail',query:{clas:'login'}})
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
	padding:0.2rem 0.4rem;
}
.detail>p{
	margin: 0.4rem 0;
}
/* .detail>p:nth-child(1){
	color: #111111;
	font-size: 0.42rem;
	font-weight: bold;
} */
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
	margin-top: -2.03rem;
	margin-left: -3.04rem;
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
