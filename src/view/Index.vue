<template>
  <div class="index">
      <Header></Header>
      <div style="margin-top: 1.17rem;">
		    <mt-swipe :auto="5000" >
				  <mt-swipe-item  v-for='item,index in bannerlist' :key='index'>
				  	 <img style="width: 100%;" :src='item.image'/>
				  </mt-swipe-item>
				</mt-swipe>
		</div>
     <div class="product" >
     		<p>{{$store.state.lg=='C'?'产品交易':'Trading products'}}</p>
     		<ul>
     			<li  v-for="item,index in prolists" :key="index" :class="item.lastZf<0?'down':'up'" @click="deal(item.id)">
            <img :src=item.image alt="">
            <p>{{$store.state.lg=='C'?item.productName:item.eproductName}}</p>
     			</li>
     		</ul>
     </div>

     <div class="news">
	     	<p style="border-bottom: 1px solid #eee;">{{$store.state.lg=='C'?'新闻资讯':'News'}}</p>
	     	<div>
	     		<iframe frameborder="0" width="100%" height="500" scrolling="yes" src="https://www.jin10.com/example/jin10.com.html?fontSize=14px&theme=white"></iframe>
	     	</div>
     </div>
     <Tabbar></Tabbar>
     <!--<div class="img" v-if="flag==true">
     	<img src="../assets/pic_qidong.png"/>
     </div>-->
  </div>
</template>

<script>
	import Header from "../components/Header.vue"
	import Tabbar from "../components/tabbar.vue"
	/*import SockJS from 'sockjs-client';
import Stomp from 'stompjs';*/
export default {
  name: 'HelloWorld',
  components:{
  	Header,
   Tabbar,
  },
  data () {
    return {
    	stompClient:'',
            timer:'',
            prolist:[],
		        prolists:[
			        {
								productName:'股指期货',
                eproductName:'Equity Index',
								productCode:'stock',
                id:1,
					      image:require('../assets/images/股票2.png')
					     },
				      {
				      productName:'商品期货',
              eproductName:'Commodity Futures',
							productCode:'product',
               id:2,
				      image:require('../assets/images/期货.png')
				      },
				      {
				      productName:'汇率期货',
               eproductName:'Forex',
							productCode:'exchange',
               id:3,
				      image:require('../assets/images/币种汇率.png')
				      },
				      {
				      productName:'数字货币',
               eproductName:'Digital Currency',
							productCode:'digital',
               id:4,
				      image:require('../assets/images/比特币产品.png')
				      }
		       ],
			   		bannerlist:'',
			   		flag:true,
			   		timer:'',
    }
  },

  created(){
   this.getbanner();
   // this.getpro();
  },
  mounted(){
  		$('#loading').show()
		   // this.timer = setInterval(() => {
     //            this.getpro();
     //       }, 10000)
  },
   beforeDestroy() {       // 页面离开时断开连接,清除定时器
      clearInterval(this.timer);
   },
  methods:{
  	getbanner(){           //获取轮播图
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"post",
			 	url:this.testUrl+'mobile/getBanner',
			 	data:{},
			 	success:function(res){
		       		if(res.code==200){
		       		  _this.bannerlist=res.data;
					  console.log(res)
		       		}

		         },
		         error:function(res){
		          _this.$toast(this.$store.state.emsg)
		         },
		        complete:function(){
		        	$('#loading').hide()
		        }
			 });
  	},
	  deal(id){      //跳转详情页
	  		this.$router.push({path:'/deal',query:{id:id}})
	  },
		getpro(){          //获取行情
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'product/getIndex',
			 	data:{},
			 	success:function(res){
		       		if(res.code==200){
		       		  _this.prolist=res.data;
		       		}

		         },
		         error:function(res){
		          _this.$toast(this.$store.state.emsg)
		         },
		        complete:function(){

		        }
			 });
		},


  }
 }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: #fff;
	z-index: 9;
}
.product>ul{
	display: flex;
	flex-wrap:wrap;
	 box-sizing: border-box;
}
.product>ul>li{
	width: calc(100% /3);
	border: 1px solid #eee;
	padding: 0.4rem 0;
	margin: 0 0 -1px -1px;
	    float: left;
}
.product>p,.news>p{
 font-size:0.4rem;
 padding: 0.26rem 0;
 text-align: left;
 padding-left:0.4rem;
}
li{
  border-left: 0;
}
li>img{
  width: 1.4rem;
  height: 1.4rem;
}
li>p{
  font-size: 0.32rem;
  color: #000000;
  font-weight: bold;
}
/* li>p:nth-child(1){
	color: #333333;
	font-size: 0.4rem;
}
li>p:nth-child(2){
	font-size:0.48rem;
	font-weight: 800;
	margin: 0.13rem 0;
}
li>p:nth-child(2)>img{
	height: 0.32rem;
}
li>p:nth-child(3){
	font-size: 0.32rem;
} */
ul>li:nth-child(1){
	border-bottom:0;
	border-left: 0;
}
ul>li:nth-child(2){
	border-left: 0;
	border-right: 0;
}
ul>li:nth-child(3){
		border-right: 0;
}
.news{
	height: 5.33rem;
	margin-bottom: 4.3rem;
}
.stop{
	color: #ccc;
}
.img{
	height: 100vh;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
}
.img>img{
	width: 100%;
	height: 100%;
}
</style>
