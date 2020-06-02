<template>
	<div class="surebuy">
		<div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>{{$store.state.lg=='C'?'返回':'Back'}}</span>
		 	<span>{{$store.state.lg=='C'?'卖出详情':'Selling details'}}</span>
		 	<span style="opacity: 0;">title</span>
		</div>
    <div class="money">
     <span v-for="item,index in ss" @click="choosess(item,index)" :class="actve==index?'choose':''">{{item}}{{$store.state.lg=='C'?'手':'hands'}}</span>
     <span style="position: relative;left: -0.1rem;" :class="actve==5?'choose':''"><input :class="actve==5?'choose':''" type="num" v-model="shousu" @focus="shuru()" @blur="getshousu()"></span>
    </div>
		<div class="detail">
			<p>{{detaildata.productName}}</p>
			<p  :class="detaildata.buyTypeId=='1'?'up':'down'" v-if="$store.state.lg=='C'">买入类型:{{detaildata.buyTypeId==16?'买涨':'买跌'}}</p>
      <p  :class="detaildata.profitLossStatus=='1'?'up':'down'" v-if="$store.state.lg=='E'" >Type:{{detaildata.buyTypeId==16?'Buy up':'Buy put'}}</p>
      <p>{{$store.state.lg=='C'?'买入数量':'Buying quantity'}}:{{detaildata.buyCount}}</p>
      <p>{{$store.state.lg=='C'?'买入合约价':'Purchase contract value'}}:{{detaildata.buyIndex}}</p>
      <p>{{$store.state.lg=='C'?'当前合约价值':'Last contract value'}}:{{detaildata.currValue}}</p>
			<p>{{$store.state.lg=='C'?'买入时间':'Date'}}：{{detaildata.createTime}}</p>
		</div>
		 <span><img src="../assets/b_zhushi_h.png"/>{{$store.state.lg=='C'?'投资有风险，入市需谨慎':'There are risks in investment,cautious when entering the market'}}</span>
		<div class="btn">
			<button @click="submit(detaildata)" :class="detaildata.profitLossStatus=='1'?'bgup':'bgdown'">{{$store.state.lg=='C'?'确认卖出':'Confirm sell'}}</button>
		</div>
		<div class="model" v-show="model">
			<div class="success">
				<img src="../assets/pic_chenggong.png" alt="" />
				<p>{{$store.state.lg=='C'?'交易成功':'Successful trade'}}</p>
				<p>{{$store.state.lg=='C'?'自动跳转到持仓页面':'Auto jump page'}}</p>
			</div>
		</div>
	<!-- 	<p>卖出当前行情指数:<span :class="detaildata.profitLossStatus=='1'?'up':'down'">{{detaildata.currIndex}}</span></p> -->

		<p>{{$store.state.lg=='C'?'交易手续费':'Transaction fee'}}:<span>{{detaildata.transactionFee}}</span></p>
    <p>{{$store.state.lg=='C'?'平仓盈亏':'offset gain and loss'}}:<span :class="detaildata.profitLossStatus=='1'?'up':'down'">{{detaildata.profitLossStatus=='1'?'+':'-'}}{{detaildata.currencyUnit}}{{detaildata.closePositionProfitLoss}}</span></p>
	<!-- 	<p>剩余金额:<span>{{detaildata.balance}}元</span></p> -->

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
      ss:['1','2','3','5','10'],
      shousu:'',
      shousunum:1,
      actve:0
    }
  },

  created(){
	this.type=this.$route.query.type;
	this.orderNumber=this.$route.query.orderNumber;
	// this.getbuydetai();
   this.getmoney(1)
  },
  mounted(){

  },
 watch:{
  shousunum(val){
    console.log(val)
    if(val){
      this.getmoney(val)
    }
  }
 },
  methods:{
	back(){
	  	this.$router.go(-1)
	  },
    choosess(item,index){ //选择手数
      this.actve=index;
      this.shousunum=index+1;
      this.shousu='';
       // this.getmoney();
    },
      getshousu(){ //输入手数
      if(this.shousu=='1'||this.shousu=='2'||this.shousu=='3'||this.shousu=='5'||this.shousu=='10'||this.shousu=='0'){
        var msg='';
        this.$store.state.lg=='C'?msg='请输入其他手数值':mag='Please enter another value';
         this.$toast(msg);
         this.shousu='';
      }else{
         this.actve=5;
        this.shousunum=this.shousu;
         if(this.$store.state.lg=='C'){
             this.shousu=this.shousu+'手';
         }else{
            this.shousu=this.shousu+'hans';
         }

      }
     },
      shuru(){ //获取手数焦点
        this.shousu='';
        this.actve=undefined;
      },
	 getbuydetai(){   //获取详情
	 	let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"get",
		 	url:this.testUrl+'product/getOrderdetail',
		 	data:{
		 		orderNumber:this.orderNumber,
		 		uid:localStorage.getItem('uid')
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.detaildata=res.data;
	       		  console.log(  _this.detaildata)
	       		}

	         },
	         error:function(res){
	          _this.$toast(_this.$store.state.emsg);
	         },
	        complete:function(){
	        	$('#loading').hide()
	        }
		 });
	 },
   getmoney(val){  //计算合约价值和保证金等
     let _this=this;
       		$.ajax({
     		 	dataType:"json", 
     		 	type:"get",
     		 	url:this.testUrl+'product/getOrderdetail',
     		 	data:{
     		 		uid:localStorage.getItem('uid'),
             orderNumber :this.orderNumber,
             sellCount :val,
             // buyMoney:Number(val)*Number(this.lastP)*Number(this.lowestPrice),
     		 	},
     		 	success:function(res){
           		if(res.code==200){
                _this.detaildata=res.data;
           		}else if(res.code==400){
                var msg='';
                _this.$store.state.lg=='C'?msg=res.msg:msg='The sold quantity cannot be greater than the purchased quantity'
                 _this.$toast(msg);
              }

             },
             error:function(res){
               _this.$toast(_this.$store.state.emsg);
             },
            complete:function(){
            	$('#loading').hide()
            }
     		 });
   },
	 submit(detaildata){
    if(this.shousunum>detaildata.buyCount){
      var msg='';
      this.$store.state.lg=='C'?msg='卖出数量不能大于买入数量':msg='The sold quantity cannot be greater than the purchased quantity'
       this.$toast(msg);
      return false;
    }
	 	$('#loading').show()
	 	let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'product/sellOrder',
		 	data:{
		 		// orderNumber:detaildata.orderNumber,
		 		uid:localStorage.getItem('uid'),
        sellNumber :detaildata.sellNumber,
		 		// closePositionProfitLoss:detaildata.closePositionProfitLoss,
		 		// serviceCharge:detaildata.transactionFee,
		 		// sellIndex:detaildata.currIndex,
		 		// profitLossStatus:detaildata.profitLossStatus,
     //    sellCount:this.shousunum
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.model=true;
	       		  setTimeout(function(){
	       		  	 _this.model=false;
	       		  	 _this.$router.push({path:'/dealdetail',query:{clas:'sell'}})
	       		  },2000)
	       		}
	         },
	         error:function(res){
	         _this.$toast(_this.$store.state.emsg);
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
	padding:0.1rem 0.4rem;
}
.detail>p{
	margin: 0.3rem 0;
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

	 font-size: 0.34rem;
}
.detail>p:nth-child(5){
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
.money{
	background: #fff;
	box-sizing: border-box;
	padding: 0.4rem;
	text-align: left;
  width: 92%;
  margin:20px auto 0;
  border-radius: 6px;
}
.choose{
  background:#3168FA;
  color: #fff !important;
}
.money>span{
  display: inline-block;
  border: 2px solid #3168FA;
  color: #3168FA;
  width:2rem;
  margin: 0.2rem 0.35rem;
  height: 0.875rem;
  font-size: 0.36rem;
  text-align: center;
  line-height:0.875rem;
  border-radius: 6px;
}
.money>span>input{
  display: inline-block;
  height: 0.6rem;
   width:1.6rem;
    color: #3168FA;
    text-align: center;
    font-size: 0.36rem;
    border: none;
}
</style>
