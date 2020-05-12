<template>
	<div class="mine">
		<div class="head">
			个人中心
		</div>
		<div class="bgline"></div>
		<Cropper  @fromChild="getChild"></Cropper>
		<div class="info">
			<div class="bottom">
				<div>
					<p>钱包余额</p>
					<p class="moneny">{{childVal}}</p>
				</div>
	
					<button class="cz" @click="addmoney">充值</button>
					<button class="tx" @click="cutmoney">提现</button>			
			</div>			
		</div>
		<div class="bgline"></div>
		<ul>
			 <!--<router-link :to="{path:'/moneydetail',query:{type:'in'}}">-->
				<li @click="gomoneydetail()">			 
					<span>
						<img src="../assets/b_chongzhi.png" alt="" />
						<span>入金明细</span>
					</span>
					<img src="../assets/b_xia.png"/>
				 	
				</li>
			 <!--</router-link>-->
			 <!-- <router-link :to="{path:'/moneydetail',query:{type:'out'}}">-->
				<li   @click="gomoneydetailout">
					<span>
						<img src="../assets/b_tixian.png" alt="" />
						<span>出金明细</span>
					</span>
					<img src="../assets/b_xia.png"/>
				</li>
		<!--	</router-link>-->
		</ul>

		<ul>
		<!-- <router-link :to="{path:'/dealdetail'}">-->
			 <li  @click="godealdetail()">
				<span>
					<img src="../assets/b_jiaoyi.png" alt="" />
					<span>交易记录</span>
				</span>
				<img src="../assets/b_xia.png"/>
			</li>
		<!--</router-link>-->
		</ul>
		<div class="bgline"></div>
		<ul>
		<!--  <router-link :to="{path:'/dealrules'}">-->
			<li  @click="godealrules()">
				<span>
					<img src="../assets/b_guize.png" alt="" />
					<span>交易规则</span>
				</span>
				<img src="../assets/b_xia.png"/>
			</li>
		<!--  </router-link>-->
		</ul>
		<ul>
			<!--<router-link :to="{path:'/carset'}">-->
			<li @click="gocarset()">
				<span>
					<img src="../assets/b_zhifushezhi.png" alt="" />
					<span>银行卡管理</span>
				</span>
				<img src="../assets/b_xia.png"/>
			</li>
		<!--	</router-link>-->
		</ul>
		<ul>
			<!--<router-link :to="{path:'/setting'}">-->				
				<li  @click="gowechat()">
					<span>
						<img src="../assets/images/chat.png" alt="" />
						<span>联系客服</span>
					</span>
					<img src="../assets/b_xia.png"/>
				</li>
			<!--  </router-link>-->
		</ul>
		<ul>
			<li  @click="gosetting()">
				<span>
					<img src="../assets/b_-shezhi.png" alt="" />
					<span>设置</span>
				</span>
				<img src="../assets/b_xia.png"/>
			</li>
		</ul>
		<Tabbar></Tabbar>
		
	</div>
</template>

<script>
import Tabbar from "../components/tabbar.vue"
import Cropper from "../components/Cropper.vue"
export default {
  name: 'HelloWorld',
  components:{
   Tabbar,
   Cropper
  },
  data () {
    return {
		childVal: '',
		creadtedcar:''
    }
  },
 
  created(){
	this.getBindBank();
  },
  mounted(){
		
  },
  methods:{
  	 getChild (v) {  //获取可用资金
            this.childVal = v;
        },
     gomoneydetail(){   //入金明细      
     	localStorage.getItem('uid')?this.$router.push({path:'/moneydetail',query:{type:'in'}}):this.$router.push({path:'/login'})
     },
     gomoneydetailout(){ //出金明细
       localStorage.getItem('uid')?this.$router.push({path:'/moneydetail',query:{type:'out'}}):this.$router.push({path:'/login'})
     },
     godealdetail(){    //交易记录
     	 localStorage.getItem('uid')?this.$router.push({path:'/dealdetail',query:{type:'in'}}):this.$router.push({path:'/login'})
     },
     godealrules(){     //规则列表
     	localStorage.getItem('uid')?this.$router.push({path:'/dealrules',query:{type:'out'}}):this.$router.push({path:'/login'})
     },
	 gowechat(){
	    localStorage.getItem('uid')?this.$router.push({path:'/chat',query:{type:'out'}}):this.$router.push({path:'/login'}) 
	 },
     gocarset(){      //银行卡绑定
     	if(localStorage.getItem('uid')){
     		if(this.creadtedcar==0){
     			this.$router.push({path:'/carset'})
     		}else{
     			this.$router.push({path:'/cardsure'})
     		}
     	}else{
     	  this.$router.push({path:'/login'})	
     	}
     	
     },
     gosetting(){    //设置
     	localStorage.getItem('uid')?this.$router.push({path:'/setting',query:{type:'out'}}):this.$router.push({path:'/login'})
     },
     getBindBank(){
     	let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"get",
		 	url:this.testUrl+'mobile/getBindBank',
		 	data:{
		 		uid:localStorage.getItem('uid'),
		 	},
		 	success:function(res){
	       		if(res.code==200){
					_this.creadtedcar=res.data.created;
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
	 addmoney(){
		 if(localStorage.getItem('uid')){
		 	 // this.$router.push({path:'/addmoney',query:{type:'add'}})
			  this.$toast('充值请添加客服微信');
			 let _this=this;
			 setTimeout(function(){
				_this.$router.push({path:'/chat'}) 
			 },2000)
		 }else{
		    this.$router.push({path:'/login'})
		 }
	 },
	 cutmoney(){
		if(localStorage.getItem('uid')){
			 // this.$router.push({path:'/addmoney',query:{type:'cut'}})
			 this.$toast('提现请添加客服微信');
			 let _this=this;
			 setTimeout(function(){
			 _this.$router.push({path:'/chat'}) 
			 },2000)
		}else{
		   this.$router.push({path:'/login'})
		} 
	 }
	  
  	}
  }	
</script>

<style scoped>
.mine{
	padding-bottom: 2.6rem;
}	
.head{
	height: 1.17rem;
	font-size: 0.48rem;
	color: #333333;
	background: #fff;
	line-height: 1.17rem;
}
.info{
	box-sizing: border-box;
	padding: 0 0.4rem;
	/*	padding-top: 0.4rem;*/
}
ul{
	margin: 0 0.4rem;
}
.info{
	background: #fff;
}
.top{
	display: flex;
	align-items: center;
}
.top>img{
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	overflow: hidden;
}
.top>div{
	margin-left: 0.4rem;
	text-align: left;
}
.top>div>p img{
	max-width: 0.42rem;
}
.top>div>p:nth-child(1){
	color: #333333;
	font-weight: bold;
	font-size: 0.48rem;
}
.top>div>p:nth-child(2){
	font-size: 0.34rem;
	color: #999999;
	margin-top: 0.13rem;
}
.bottom{
	display: flex;
	margin: 0.4rem 0;
	align-items:flex-end;
	justify-content: space-around;
}
.bottom>div{
	color: #333333;
	font-size: 0.42rem;
}
.moneny{
	color: #333333;
	font-size: 0.74rem;
	margin-top: 0.13rem;
}
.cz{
	width: 2.13rem;
	height: 0.82rem;
	background: #3168FA;
	color: #fff;
	border-radius:6px;
	border: none;
	font-size: 0.42rem;
	margin-bottom:0.13rem;
}
.tx{
	width: 2.13rem;
	height: 0.82rem;
	border-radius:6px;
	background: #fff;
	color:#3168FA;
	border:2px solid #3168FA;
	font-size: 0.42rem;	
	margin-bottom:0.13rem;
}
ul{
	border-bottom: 1px solid #eee;
}
li{
	display: flex;
	justify-content: space-between;
	padding: 0.32rem 0;
	color: #666666;
	font-size: 0.42rem;
	align-items: center;
}
li img{
	max-height: 0.45rem;
	vertical-align: middle;
}
</style>