<template>
	<div class="moneydetail">
		 <div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>{{$store.state.lg=='C'?'返回':'Back'}}</span>
		 	<span>{{title}}</span>
		 	<span style="opacity: 0;">title</span>
		 </div>
		 	<scroller :on-refresh="refresh"
                  :on-infinite="infinite"
                   ref="my_scroller"
                  style="margin-top:40px;"
               >
			 <div class="content">
			 	<ul v-for="item,index in list" :key="index">
			 		<li>
			 			<div>
			 				<p class="name">{{item.type_id==9?'充值':item.type_id==10?'卖出':item.type_id==11?'提现':item.type_id==12?'买入恒指':item.type_id==13?'买入沪深300':item.type_id==14?'买入美原油':'买入黄金'}}</p>
			 				<p>{{$store.state.lg=='C'?'支付方式':'Payment method'}}:{{item.remark}}</p>
              <p>{{$store.state.lg=='C'?'订单号':'Order number'}}:{{item.order_num}}</p>
              <p class="time">{{item.create_time}}</p>
			 			</div>
			 			<p class="money"  :style="{'color': (type=='in' ? 'red':'#000')}">{{type=='in'?'+':'-'}}{{item.currency_unit==''?'￥':item.currency_unit}}{{item.money}}</p>
			 		</li>
			 	</ul>
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
     title:'出金明细',
     num:1,
	 list:'',
	 hasNext:false,
	 num:1,
	 last_page:'',
     type:this.$route.query.type
    }
  },

  created(){
   this.$store.state.lg=='C'&&this.$route.query.type=='in'?this.title='入金明细':this.$store.state.lg=='C'&&this.$route.query.type=='out'?this.title="出金明细":this.$store.state.lg=='E'&&this.$route.query.type=='in'?this.title='Deposit Detailed':this.title="Expend Detailed";

   if(this.$route.query.type=='in'){
   	this.getGoldenDetail(this.num);
   }else{
   	this.getWithdrawDetail(this.num);
   }
  },
  mounted(){
  },
  methods:{
    refresh:function(done){         //下拉刷新
　　this.timeout = setTimeout(()=>{
		if(this.$route.query.type=='in'){
    	this.num=1;
        	 this.getGoldenDetail(this.num); //入金
        }else{
        this.num=1;
        this.getWithdrawDetail(this.num); //出金
              }
             done();
　　　　　　　　}, 1500);

　　　　　　},
         infinite:function(done) {             //上拉加载
           var that=this;
            if(that.hasNext){
              setTimeout(() => {
                if(that.hasNext){
                	if(this.$route.query.type=='in'){
                	  that.num=that.num+1;
                      that.getGoldenDetail(that.num);	//入金
                	}else{
                	  that.num=that.num+1;
                      that.getWithdrawDetail(that.num);	//出金
                	}

                  done();
                }else{
                   done("noDataText");
                }
              },1500)
             //that.num1=that.num1+1
               if(that.num==that.last_page){
                 done("noDataText");
               }
            }else {
              done("noDataText");

            }
        },
  	getGoldenDetail(num){   //入金
  		$('#loading').show()
  		let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'mobile/getGoldenDetail',
			 	data:{
			 		uid:localStorage.getItem('uid'),
			 		num:num,
			 		size:10
			 	},
			 	success:function(res){
		       		if(res.code==200){
		       			_this.last_page=res.data.pages;
		       			 _this.hasNext=res.data.pages-res.data.current;
						if(_this.num==1){
		       			   _this.list=res.data.records;
		       			 }else{
		       			 	for(var i=0;i<res.data.records.length;i++){
		       			 		 _this.list.push(res.data.records[i])
		       			 	}
		       		  }
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
  	getWithdrawDetail(num){   //出金
  		$('#loading').show()
  		let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'mobile/getWithdrawDetail',
			 	data:{
			 		uid:localStorage.getItem('uid'),
			 		num:num,
			 		size:10
			 	},
			 	success:function(res){
		       		if(res.code==200){
		       			_this.last_page=res.data.pages;
		       			 _this.hasNext=res.data.pages-res.data.current;
						if(_this.num==1){
		       			   _this.list=res.data.records;
		       			 }else{
		       			 	for(var i=0;i<res.data.records.length;i++){
		       			 		 _this.list.push(res.data.records[i])
		       			 	}
		       		    }
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
	back(){
	  	this.$router.go(-1)
	  },
  	}
  }
</script>

<style scoped>
.header{
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	background: #fff;
    z-index: 9;
}

.content ul{
	box-sizing: border-box;
	margin: 0 0.4rem;
	border-bottom: 1px solid #eee;
	padding: 0.2rem 0;
}
 .content li{
 	display: flex;
 	justify-content: space-between;
 	align-items: center;
  position: relative;
 }
  .content li>div>p{
    text-align: left;
    margin: 0.1rem 0;
  }
  .content li>div>p:nth-child(2){
    margin: 0.2rem 0;
  }
 .name{
 	font-size: 0.42rem;
 	color: #212121;
 	text-align: left;
 	font-weight: bold;
 }
 .time{
 	font-size: 0.28rem;
 	text-align: left;
 }
 .money{
 	color: #212121;
 	font-size: 0.48rem;
 	font-weight: bold;
  position: absolute;
  top: 0;
  right: 0;
 }

</style>
