<template>
	<div class="buy">
		 <div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>{{$store.state.lg=='C'?'返回':'Back'}}</span>
		 	<span >{{$store.state.lg=='C'?productName:englishName}}</span>
		 	<span style="opacity: 0;">title</span>
		 </div>
		 <div class="bgline"></div>
		 <div class="money">
      <span v-for="item,index in ss" @click="choosess(item,index)" :class="actve==index?'choose':''">{{item}}{{$store.state.lg=='C'?'手':'hands'}}</span>
      <span style="position: relative;left: -0.1rem;" :class="actve==5?'choose':''"><input :class="actve==5?'choose':''" type="num" v-model="shousu" @focus="shuru()" @blur="getshousu()"></span>
		 <p v-if="$store.state.lg=='C'">注:1手={{lastP}}*{{lowestPrice}}</p>
     <p v-else-if="$store.state.lg=='E'">Notice:1hand={{lastP}}*{{lowestPrice}}</p>
     </div>
     <p>{{$store.state.lg=='C'?'当前合约价':'Last contract value'}}:{{curPrice}}</p>
     <p>{{$store.state.lg=='C'?'买入合约价值':'Purchase contract value'}}:{{curValue}}</p>
		 <p>{{$store.state.lg=='C'?'买入类型':'Type'}}:<span :class="type=='in'?'up':'down'">
      {{$store.state.lg=='C'&&type=='in'?'买涨':$store.state.lg=='C'&&type=='down'?'买跌':$store.state.lg=='E'&&type=='in'?'Buy up':'Buy put'}}
     </span></p>
		<!-- <p>买入当前行情指数:<span :class="type=='in'?'up':'down'">{{lastP}}</span></p> -->
		 <span><img src="../assets/b_zhushi_h.png"/>{{$store.state.lg=='C'?'投资有风险，入市需谨慎':'There are risks in investment,cautious when entering the market'}}</span>
		<!-- <button :class="type=='in'?'bgup':'bgdown'" @click="surebuy()">{{type=='in'?'买涨':'买跌'}}{{buymoney}}元</button> -->
      <button :class="type=='in'?'bgup':'bgdown'" @click="surebuy()">{{$store.state.lg=='C'?'立即购买':'Buy'}}</button>
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
      actve:0,
    	ye:'',
    	lastP:'',
    	productCode:'',
    	lowestPrice:'',
    	productName:'',
		  buynum:1,
      ss:['1','2','3','5','10'],
      shousu:'',
      shousunum:'1',
      curPrice:'',
      curValue:'',
      curdata:'',
      englishName:'',
      huobifuhao:'',
    }
  },
 watch:{
	buynum(val,oldval){
		console.log(val)
		this.buymoney=Number((val)*(this.lowestPrice)).toFixed(2);
		if(this.buymoney>Number(this.ye)){
			this.$toast('余额不足！');
		}
	},
  shousunum(val){
    console.log(val)
    if(val){
      this.getmoney(val)
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
  this.getmoney(1)
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
              _this.englishName=res.data.englishName;
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
	  getbuymoney(){   //输入资金
	  	this.buymoney= Number((this.buynum)*(this.lowestPrice)).toFixed(2);
	  	if(Number(this.buymoney)<Number(this.lowestPrice)){
        var msg1='';
        this.$store.state.lg=='C'?msg1='所买金额需大于起投金额!':mag1='The purchase amount should be greater than the initial investment amount!';
        	this.$toast(msg1);
	  		this.$toast('所买金额需大于起投金额！');
	  	}
	  },
	surebuy(){
		if(Number(this.buymoney)<Number(this.lowestPrice)){
      var msg1='';
      this.$store.state.lg=='C'?msg1='所买金额需大于起投金额!':mag1='The purchase amount should be greater than the initial investment amount!';
	  		this.$toast(msg1);
	  		return false;
	  	}else if(Number(this.buymoney)>Number(this.ye)){
        var msg='';
        this.$store.state.lg=='C'?msg='金额不足!':mag='Insufficient amount!';
	  		this.$toast(msg);
	  		return false;
	  	}else{
	  		this.$router.push({path:'/surebuy',query:{type:this.type,productName:this.productName,buyCount:this.shousunum,curdata:JSON.stringify(this.curdata),productCode:this.productCode,englishName:this.englishName}})
	  	}

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
    getmoney(val){  //计算合约价值和保证金等
      let _this=this;
        		$.ajax({
      		 	dataType:"json", 
      		 	type:"post",
      		 	url:this.testUrl+'product/chooseNum',
      		 	data:{
      		 		uid:localStorage.getItem('uid'),
              productCode :this.productCode,
              buyType :this.type=='in'?1:2,
              // buyIndex:this.lastP,
              buyIndex:'',
              buyCount:val,
              buyMoney:'',
              // buyMoney:Number(val)*Number(this.lastP)*Number(this.lowestPrice),
      		 	},
      		 	success:function(res){
            		if(res.code==200){
                  _this.curPrice=res.data.curPrice;
                  _this.curValue=res.data.curValue;
                  _this.curdata=res.data;
            		}

              },
              error:function(res){
                _this.$toast(_this.$store.state.emsg);
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
.buy{
	height: 100vh;
	background: #F1F1F1;
}
.money{
	background: #fff;
	box-sizing: border-box;
	padding: 0.4rem;
	text-align: left;
  width: 92%;
  margin: auto;
  border-radius: 6px;
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
.choose{
  background:#3168FA;
  color: #fff !important;
}
.money>p{
  position: relative;
  left: 0.35rem;
  top: 0.2rem;
  font-weight: bold;
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
