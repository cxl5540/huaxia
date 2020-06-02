<template>
	<div class="deal">
		<Header></Header>
		<div style="padding-bottom: 50px;">
		  <ul class="title">
		    <li>{{$store.state.lg=='C'?'交易产品':'Symbol'}}</li>
		     <li>{{$store.state.lg=='C'?'最新价':'Last'}}</li>
		     <li>{{$store.state.lg=='C'?'状态':'Status'}}</li>
		  </ul>
		  <ul v-for="item,index in prolist" :key="index" @click="prodetail(item,item.productCode)">
		  	<li>
		  		<p class="name">{{$store.state.lg=='C'?item.productName:item.englishName}}</p>
		  		<p class="code">{{item.productCode}}</p>
		  	</li>
		  	<li :class="item.status==0?'stop':item.status==1&&item.lastZf<0?'down':'up'">
		  		<p class="zhishu">{{item.lastP}}</p>
		  		<p class="zf">{{Tomunber(item.lastZf)}}</p>
		  	</li>
		  	<li class="btn">
		  		<span :class="item.status==0?'bgstop':item.status==1&&item.lastZf<0?'bgdown':'bgup'">
          {{$store.state.lg=='C'&&item.status==1?'交易中':$store.state.lg=='C'&&item.status==0?'已休市':$store.state.lg=='E'&&item.status==1?'Transaction':'Closed'}}
          </span>
		  	</li>
		  </ul>

		</div>
		<Tabbar></Tabbar>
	</div>
</template>

<script>
import Header from "../components/Header.vue"
import Tabbar from "../components/tabbar.vue"
export default {
  name: 'HelloWorld',
  components:{
  	Header,
  	Tabbar
  },
  data () {
    return {
    prolist:[],
    timer:'',
    id:''
    }
  },

  created(){
	this.getpro();
  $('#loading').show();
  },
  mounted(){
  	$('#loading').show()
	 this.timer = setInterval(() => {
                this.getpro();
           }, 5000)
  },
  beforeDestroy() {       // 页面离开时断开连接,清除定时器
      clearInterval(this.timer);
   },
  methods:{
	getpro(){          //获取行情

		let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"get",
		 	url:this.testUrl+'product/products',
		 	data:{
        typeId:this.$route.query.id?this.$route.query.id:''
      },
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.prolist=res.data;
                 $('#loading').hide()
	       		}

	         },
	         error:function(res){
	           _this.$toast(_this.$store.state.emsg);
	         },
	        complete:function(){

	        }
		 });
		},
	 prodetail(item,productCode){      //跳转详情页
	 	if(item.status=='0'){
        var msg='';
        this.$store.state.lg=='C'?msg='已休市':msg='Closed market'
	  		 this.$toast(msg);
	  		return false;
	  	}else{
	  	this.$router.push({path:'/prodetail',query:{productCode:productCode}})
	  	}
	  },
  	}
  }
</script>

<style scoped="scoped">
.title{
	font-size:0.4rem;
	color: #333333;
}
ul{
	display: flex;
	justify-content: space-around;
	border-bottom:1px solid #eee;
	padding: 0.4rem 0;
}
.name{
	font-size:0.42rem;
	color: #333333;
}
.code{
	font-size:0.37rem;
	color: #999999;
}
.zhishu{
	font-size: 0.42rem;
	font-weight: bold;
}
.zf{
	font-size: 0.32rem;
	margin-top: 0.1rem;
}
.btn{
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn>span{
	display: inline-block;
  width: 1.9rem;
  text-align: center;

	height: 0.56rem;
	border-radius:4px;
	font-size: 0.32rem;
	line-height: 0.56rem;
	font-weight: bold;
}
li{
  width: calc(100% /3);
}
.stop{
	color: #ccc;
}
.bgstop{
	background: #999;
	color: #eee;
}
</style>
