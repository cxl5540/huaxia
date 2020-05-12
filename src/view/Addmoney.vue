<template>
	<div class="buy">
		 <div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
		 	<span>{{type=='add'?'支付宝充值':'提现'}}</span>
		 	<span style="opacity: 0;">title</span>
		 </div>
		 <div class="bgline"></div>
		 <div class="money">
		 	<p>{{type=='add'?'充值金额':'提现金额'}}</p>
		 	<p><span>￥</span><input type="number" v-model="buymoney"  @blur="getbuymoney()"/></p>
		 	<p>账户余额{{ye}}元</p>
		 </div>
		 <div  v-if="type=='cut'" style="text-align: left;">
			 <mt-radio
			   align="left"
			   v-model="value"
			   :options="options">
			 </mt-radio>
			<!-- <img src="../assets/images/pic_chenggong.png" alt=""> -->
		 </div>
		 <span><img src="../assets/b_zhushi_h.png"/>投资有风险，入市需谨慎</span>
		 <button :class="type=='add'?'bgup':'bgdown'" @click="submit()">{{type=='add'?'支付宝充值':'提现'}}</button>
	</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
    	type:this.$route.query.type,
    	ye:'',
    	buymoney:'',
		value:'',
		options : [
		  {
		    label: '支付宝',
		    value: '1',
		  },
		  {
		    label: '银行卡',
		    value: '3'
		  }
		]
    }
  },
 
  created(){
	  this.value=this.options[0].value; 
   this.type=this.$route.query.type;
   this.getinfo();
  },
  mounted(){
		
  },
  methods:{
  	back(){
	  	this.$router.go(-1)
	  },
  getinfo(){   //获取余额
   	let _this=this;
   	$.ajax({
	 	dataType:"json", 
	 	type:"get",
	 	url:this.testUrl+'mobile/getMyCenter',
	 	data:{
	 		uid:localStorage.getItem('uid')
	 	},  
	 	success:function(res){
       		if(res.code==200){
       		   _this.ye=res.data.balance;
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
	  	this.buymoney=Number(this.buymoney).toFixed(2);
		this.buymoney=this.buymoney.toString()
	  },
	submit(){
			let _this=this;
			 this.$indicator.open({spinnerType: 'fading-circle'});
		if(this.type=='add'){
			$.ajax({
			 	dataType:"json", 
			 	type:"post",
			 	url:this.testUrl+'mobile/recharge',
			 	data:{
			 		uid:localStorage.getItem('uid'),
					money:this.buymoney
			 	},  
			 	success:function(res){
					 _this.$indicator.close()
			   		if(res.code==200){
			   		 window.location.href=res.data
			   		}else{
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
		}else{
			$.ajax({
			 	dataType:"json", 
			 	type:"post",
			 	url:this.testUrl+'mobile/cashWithdrawal',
			 	data:{
			 		uid:localStorage.getItem('uid'),
					money:this.buymoney,
					way:this.value
			 	},  
			 	success:function(res){
					 _this.$indicator.close()
			   		if(res.code==200){
			   		  _this.$toast(res.data);
					  _this.$router.go(-1)
			   		}else{
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
 }		
</script>

<style scoped>
.buy{
	height: 100vh;
	background: #F1F1F1;
	width: 100%;
	overflow: hidden;
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