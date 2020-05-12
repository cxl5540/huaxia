<template>
	<div class="agree">
		<div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
		 	<span>协议签署</span>
		 	<span style="opacity: 0;">title</span>
		 </div>
		 <div class="content">
		 	<p>签署交易协议</p>
		 	<p>现金交易高风险提示！</p>
		 	<p>期货具有高风险，并非适于所有的投资人。交易亏损金额也许会大于您的初始投资。交易期货之前，请仔细阅读相关规定及风险条款;平台使用保证金进行交易，仅适用于可承受高风险的投资人交易之前请确保您具备风险承受能力。期货采用撮合制交易模式，投资者盈亏取决于其对期货市场多空行情判断和交易技术水平，平台仅作为交易工具提供方，投资过程中可能出现因行情波动剧烈而导致实际亏损金额大于缴纳保证金金额，平台与投资者亏并无相关。期市有风险，投资需谨慎，适可而止，风险自担。如有异议，请不要参与交易!</p>
		 	<p @click="view">《平台风险告知书》<span>查看<img src="../assets/b_jiantou-l.png" alt="" /></span></p>
		 </div>
		 <button @click="dealagree()">已阅读并同意</button>
	</div>
	
</template>

<script>
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
    	type:''
    }
  },
 
  created(){
	this.type=this.$route.query.type;
	this.money=this.$route.query.money;
	this.productCode=this.$route.query.productCode;
  },
  mounted(){
		
  },
  methods:{
	back(){
		this.$router.go(-1)
	},
	dealagree(){
		this.$router.push({path:'/buyin',query:{type:this.type,money:this.money,productCode:this.productCode}})
	},
	view(){
		this.$router.push({path:'/agreement',query:{type:'see'}})
	}
  }
 }	
</script>

<style scoped>
.agree{
	height: 100vh;
	background: #F1F1F1;
}	
.content{
	color: #333333;
	font-size:0.37rem;
	text-align: left;
	box-sizing: border-box;
	padding: 0.4rem;
	text-align: justify;
	line-height: 0.48rem;
}
.content>p{
	line-height: 0.6rem;
}
.content>p:nth-child(1){
	color: #121212;
	font-size: 0.48rem;
	text-align: center;
}
.content>p:nth-child(2){
	color: #EE4B43;
	font-size: 0.32rem;
	text-align: center;
	margin: 0.26rem 0;
}
.content>p:nth-child(4){
	color: #3168FA;
	font-size: 0.42rem;
	margin: 0.4rem 0;
}
.content>p:nth-child(4) img{
	max-height: 0.37rem;
	vertical-align: middle;
	margin-left: 0.13rem;
}
button{
	width: 100%;
	height: 1.29rem;
	font-size: 0.48rem;
	border: none;
	background: #3168FA;
	color: #fff;
	position: absolute;
	bottom: 0;
	left: 0;
}	
</style>