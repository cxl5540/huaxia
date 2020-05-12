<template>
	<div class="buy">
		 <div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
		 	<span>{{productName}}</span>
		 	<span style="opacity: 0;">title</span>
		 </div>
		 <div class="bgline"></div>
		 <div class="money">
		 	<p>购买手数</p>
		 	<p>
				<span style="display: flex;font-size: 0.4rem;align-items: center;width: 10%;">手数:</span>
				<input style="width: 80%;" type="number" min='1' v-model="buynum"  @blur="getbuymoney()"/>
			</p>
		 	<p>可用余额{{ye}}元</p>
		 </div>
		 <p>买入类型:<span :class="type=='in'?'up':'down'">{{type=='in'?'买涨':'买跌'}}</span></p>		 
		 <p>买入当前行情指数:<span :class="type=='in'?'up':'down'">{{lastP}}</span></p>
		 <span><img src="../assets/b_zhushi_h.png"/>投资有风险，入市需谨慎</span>
		 <button :class="type=='in'?'bgup':'bgdown'" @click="surebuy()">{{type=='in'?'买涨':'买跌'}}{{buymoney}}元</button>
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
    	buymoney:500.00,
    	ye:'',
    	lastP:'',
    	productCode:'',
    	lowestPrice:'',
    	productName:'',
		buynum:1,
    }
  },
 watch:{
	buynum(val,oldval){
		console.log(val)
		this.buymoney=Number((val)*(this.lowestPrice)).toFixed(2);
		if(this.buymoney>Number(this.ye)){
			this.$toast('余额不足！');
		}
		
	} 
 },
  created(){
   this.type=this.$route.query.type;
   this.ye=this.$route.query.money;
   this.productCode=this.$route.query.productCode;
   this.getdetail();
  },
  mounted(){
		
  },
  methods:{
  	back(){
	  	this.$router.go(-1)
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
	       		  _this.lastP=res.data.lastP;
	       		  _this.lowestPrice=Number(res.data.lowestPrice).toFixed(2);
	       		   _this.buymoney=_this.lowestPrice;
	       		  _this.productName=res.data.productName;
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
	  getbuymoney(){   //输入资金
	  	this.buymoney= Number((this.buynum)*(this.lowestPrice)).toFixed(2);
	  	if(Number(this.buymoney)<Number(this.lowestPrice)){
	  		this.$toast('所买金额需大于起投金额！');
	  	}
	  },
	surebuy(){
		if(Number(this.buymoney)<Number(this.lowestPrice)){
	  		this.$toast('所买金额需大于起投金额！');
	  		return false;
	  	}else if(Number(this.buymoney)>Number(this.ye)){
	  		this.$toast('金额不足！');
	  		return false;
	  	}else{
	  		this.$router.push({path:'/surebuy',query:{type:this.type,productName:this.productName,lastP:this.lastP,buymoney:this.buymoney,productCode:this.productCode}})
	  	}
		
	}
  }
 }		
</script>

<style scoped>
.buy{
	height: 100vh;
	background: #F1F1F1;
}	
.money{
	background: #fff;
	box-sizing: border-box;
	padding: 0.4rem;
	text-align: left;
}
.money>p:nth-child(1){
	font-size: 0.4rem;
	color: #333333;
	font-weight:600;
}
.money>p:nth-child(2){
	color: #1A1A1A;
	font-weight:bold;
	font-size: 1.06rem;
	display: flex;
	margin: 0.4rem 0;
}
.money>p:nth-child(2)>input{
	width:8.13rem;
	border: none;
	border-bottom: 1px solid #eee;
	font-weight:600;
	padding-left: 0.4rem;
	font-size: 1.06rem;
}
.money>p:nth-child(3){
	color: #737373;
	font-size: 0.4rem;
}
.buy>p{
	font-size: 0.42rem;
	color: #666666;
	width: 80%;
	margin: 0.4rem auto;
	text-align: left;
}
.buy>button{
	width: 100%;
	font-size: 0.53rem;
	color: #fff;
	font-weight: bold;
	height:1.29rem;
	position: absolute;
	left: 0;
	bottom: 0;
}
.buy>span{
	display: block;
	width: 100%;
	position: absolute;
	bottom: 1.6rem;
	color: #666666;
	font-size: 0.32rem;
}
.buy>span>img{
	vertical-align: middle;
	max-height: 0.32rem;
	margin-right: 0.13rem;
	position: relative;
    top: -2px;
}	
</style>