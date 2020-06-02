<template>
 <div class="dealdetail">
	 <div class="header">
	 	<span @click="back()"><img src="../assets/b_fanhui.png"/>{{$store.state.lg=='C'?'返回':'Back'}}</span>
	 	<span>{{$store.state.lg=='C'?'交易明细':'Transaction details'}}</span>
	 	<span @click="home()">{{$store.state.lg=='C'?'首页':'home'}}</span>
	 </div>
	 <div class="hd">


	 	<span :class="houldshow==true?'active':''" @click="chicang()">{{$store.state.lg=='C'?'持仓':'Position'}}</span>
	 	<span :class="houldshow==false?'active':''" @click="jiesuan()">{{$store.state.lg=='C'?'交易记录':'Transaction record'}}</span>
	 </div>
	 	<scroller :on-refresh="refresh"
              :noDataText="noDataText"
              :refreshText="refreshText"
                  :on-infinite="infinite"
                   ref="my_scroller"
                  style="margin-top:90px;"
               >
	 <div class="content">
	 	<div v-show='houldshow==true' class="chicang item" v-for="item,index in list">
	 		<p>{{$store.state.lg=='C'?item.productName:item.englishName}}</p>
      <p v-show="$store.state.lg=='C'">买入类型:{{item.buy_type_id==17?'买跌':'买涨'}}</p>
       <p v-show="$store.state.lg=='E'">Type:{{item.buy_type_id==17?'buy put':'buy up'}}</p>
      <p>{{$store.state.lg=='C'?'买入数量':'Buying quantity'}}:{{item.buy_count}}</p>
      <p>{{$store.state.lg=='C'?'买入合约价':'Purchase contract value'}}:{{item.buy_index}}</p>
      <p>{{$store.state.lg=='C'?'当前合约价值':'Last contract value'}}:{{item.currValue}}</p>
      <p :class="item.profitLossStatus==1?'up':'down'">{{$store.state.lg=='C'?'浮动盈亏':'Floating P/L'}}:{{item.profitLossStatus==1?'+':'-'}}{{item.currencyUnit}}{{item.closePositionProfitLoss}}</p>
       <p>{{$store.state.lg=='C'?'买入时间':'Date'}}:{{item.create_time}}</p>
		 	<p>{{$store.state.lg=='C'?'订单号':'Order number'}}:{{item.order_number}}</p>
      <button @click="sell(item.order_number)">{{$store.state.lg=='C'?'立即卖出':'Sell now'}}</button>
	 	</div>

	 	<div v-show='houldshow==false' class="jiesuan item" v-for="item,index in list1" >
      <p>{{$store.state.lg=='C'?'交易产品':'Trading products'}}:{{$store.state.lg=='C'?item.productName:item.englishName}}</p>
      <p>{{$store.state.lg=='C'?'交易类型':'Transaction type'}}:{{item.positionTypeName}}</p>
      <p>{{$store.state.lg=='C'?'卖出数量':'Quantity sold'}}:{{item.sellCount}}</p>
      <p>{{$store.state.lg=='C'?'平仓合约价值':'Purchase contract value'}}:{{item.sellMoney}}</p>
      <p>{{$store.state.lg=='C'?'交易手续费':'Transaction fee'}}:{{item.currencyUnit}}{{item.serviceCharge}}</p>
      <p>{{$store.state.lg=='C'?'交易保证金':'Bond'}}:{{item.currencyUnit}}{{item.returnBond}}</p>
       <p :class="item.profitLossStatus==1?'up':'down'">{{$store.state.lg=='C'?'平仓盈亏':'Bond'}}:{{item.profitLossStatus==1?'+':'-'}}{{item.currencyUnit}}{{item.closePositionProfitLoss}}</p>
      <p>{{$store.state.lg=='C'?'卖出时间':'Date'}}:{{item.sellCreateTime}}</p>
      <p>{{$store.state.lg=='C'?'订单号':'Order number'}}:{{item.sellNumber}}</p>
	 	</div>

	 </div>
	</scroller>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
    	clas:'',
    	houldshow:true,
    	list:'',
   		list1:'',
   		hasNext1:false,
   		hasNext2:false,
   		enable:true,
   		num1:1,
   		num2:1,
   		last_page1:'',
   		last_page2:'',
   		timer:'',
   		formurl:'',
      noDataText:this.$store.state.lg=='C'?'没有更多数据':' No more data',
      refreshText:this.$store.state.lg=='C'?'下拉刷新':'Drop-down refresh',
    }
  },

  created(){
	this.clas=this.$route.query.clas;
	this.clas=='buy'?this.houldshow=true:this.clas=='sell'?this.houldshow=false:this.houldshow=true;
	let _this=this;
	this.getjiesuan(this.num2);
  	$('#loading').show()
//	alert(this.houldshow)
  },
  mounted(){
	 this.inint();
	  this.getchicang(this.num1);
	  this.timer = setInterval(() => {
        this.getchicang(this.num1);
     }, 5000)
  },
    beforeDestroy() {       // 页面离开时断开连接,清除定时器
      clearInterval(this.timer);
   },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop);
  },
  beforeRouteEnter (to, from, next) {

       next(vm => {
        vm.formurl=from.name;
      });

   },
  methods:{

  	 inint(){
           var version=window.navigator.platform;
           if (version=="Win32" || version=="MacPPC" || version=="Linuxi586")
                {
                  window.addEventListener('scroll', this.onScroll);
                  window.addEventListener('scroll', this.scrollToTop);
                }
          },

           refresh:function(done){         //下拉刷新
　　　　　　　　this.timeout = setTimeout(()=>{
				if(this.houldshow==true){
                	this.num1=1;
                	 this.getchicang(this.num1);
                }else{
                	this.num2=1;
                	 this.getjiesuan(this.num2);
                }
               done();
　　　　　　　　}, 1500);

　　　　　　},

         infinite:function(done) {             //上拉加载
               var that=this;
             if(that.houldshow==true){
                if(that.hasNext1){
                  setTimeout(() => {
                    if(that.hasNext1){
                    	  that.num1=that.num1+1;
                       that.getchicang(that.num1);
                      done();
                    }else{
                       done("noDataText");
                    }
                  },1500)
                 //that.num1=that.num1+1
                   if(that.num1==that.last_page1){
                     done("noDataText");
                   }
                }else {
                  done("noDataText");

                }
               }else{
               	 if(that.hasNext2){
                  setTimeout(() => {
                    if(that.hasNext2){
                    	   that.num2=that.num2+1;
                         that.getjiesuan(that.num2);
                      done();
                    }else{
                       done("noDataText");
                    }
                  },1500)

                   if(that.num2==that.last_page2){
                     done("noDataText");
                   }
                }else {
                    done("noDataText");

                }

               }
            },

	  	back(){

	  		if(this.formurl=='Selldetail'){
	  		  this.$router.push('/deal')
	  		}else{
	  		  this.$router.go(-1)
	  		}

	  	},
		chicang(){  //持仓
			this.houldshow=true;
		},
    home(){
     this.$router.push('/')
    },
		jiesuan(){ //结算
			this.houldshow=false;
		},
		getchicang(num1){
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'product/getAccountPosition',
			 	data:{
			 		uid:localStorage.getItem('uid'),
			 		num:num1,
			 		size:100
			 	},
			 	success:function(res){
		       		if(res.code==200){
		       			_this.last_page1=res.data.pages;
		       			 _this.hasNext1=res.data.pages-res.data.current;
		       			 if(_this.num1==1){
		       			   _this.list=res.data.records;
		       			 }else{
		       			 	for(var i=0;i<res.data.records.length;i++){
		       			 		 _this.list.push(res.data.records[i])
		       			 	}
		       			 }
		       		}else if(res.code==400){
		       		    _this.$toast(res.msg);
		       		   _this.$router.push({path:'/login'})
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
		getjiesuan(num2){
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'product/getSellList',
			 	data:{
			 		uid:localStorage.getItem('uid'),
			 		num:num2,
			 		size:10,
			 	},
			 	success:function(res){
		       		if(res.code==200){
		       			$('#loading').hide()
		       			_this.last_page2=res.data.pages;
		       			_this.hasNext2=res.data.pages-res.data.current;
		       			if(_this.num2==1){
		       			    _this.list1=res.data.records;
		       			 }else{
                    // _this.list1 = _this.list1.concat(res.data.records);
		       			 	for(var i=0;i<res.data.records.length;i++){
		       			 		 _this.list1.push(res.data.records[i])
		       			 	}
		       			 }

		       		}else if(res.code==400){
		       		    _this.$toast(res.msg);
		       		   _this.$router.push({path:'/login'})
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
		formatDate(now) {
		     var year=now.getFullYear();
		     var month=now.getMonth()+1;
		        month<10?month='0'+month:month=month;
		     var date=now.getDate();
		       date<10?date='0'+date:date=date;
		     var hour=now.getHours();
		       hour<10?hour='0'+hour:hour=hour;
		     var minute=now.getMinutes();
		    minute<10?minute='0'+minute:minute=minute;
		     var second=now.getSeconds();
		    second<10?second='0'+second:second=second;
		     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
		},
//如果记得时间戳是毫秒级的就需要*1000 不然就错了记得转换成整型


		sell(orderNumber){
			this.$router.push({path:'/selldetail',query:{type:'in',orderNumber:orderNumber}})
		}
  	}
  }
</script>

<style scoped>
.header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: #fff;
	z-index: 3;
}
.dealdetail{
	height: 100vh;
	background: #F1F1F1;
}
.hd{
	background: #fff;
	height: 1.06rem;
	line-height: 1.06rem;
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid #eee;
	position: fixed;
	top: 1.18rem;
	left: 0;
	width: 100%;
	z-index: 3;
}
.hd span{
	color: #333333;
	font-size: 0.4rem;
	font-weight: bold;
}
/*.content{
	margin-top: 2.24rem;
}*/
.content>div{
	border-bottom: 1px solid #999;
	background: #fff;
	box-sizing: border-box;
	padding: 0.1rem 0.4rem;
  position: relative;
}
.content>div>button{
  position: absolute;
  bottom: 0.7rem;
  right: 0.3rem;
  background: #1D7DB1;
  color: #FFFFFF;
}
.content>div>p{
	text-align: left;
  margin: 0.2rem 0;
}
.chicang>p:nth-child(1){
	font-size: 0.42rem;
	color: #111111;
	font-weight: bold;
}


button{
	padding: 0.13rem  0.4rem;
	border-radius: 6px;
/*	margin-top: 0.48rem;*/
}
.active{
	display:inline-block;
	height:0.74rem;
	/* width: 2rem; */
  padding: 0 0.2rem;
	line-height: 0.74rem;
	background: #3168FA;
	border-radius: 0.74rem;
	color: #fff !important;
	margin: auto 0;

}
.jiesuan>p:nth-child(1){
	display: flex;
	justify-content: space-between;
}
</style>
