<template>
 <div class="carset">
 	<div class="header">
	 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
	 	<span>银行卡管理</span>
	 	<span style="opacity: 0;">title</span>
	 </div>
	 <div class="content">
	 	<p><img src="../assets/b_zhushi_l.png"/>此为提现到账的银行卡，请务必妥善完善您的信息</p>
	 	<ul>
	 		<li>
	 			<span>银行：</span>
	 			<input type="text" v-model="band" placeholder="请输入开户银行"/>
	 		</li>
	 		<li>
	 			<span>卡号：</span>
	 			<input type="number"  v-model="cardnumer" placeholder="请输入银行卡号" />
	 		</li>
	 		<li>
	 			<span>持卡人：</span>
	 			<input type="text"   v-model="name" maxlength="5" placeholder="请输入持卡人姓名"/>
	 		</li>
	 		<li>
	 			<span>手机号：</span>
	 			<input type="number"  v-model="tel" placeholder="请输入预留手机号"/>
	 		</li>
	 		<li>
	 			<span style="width: 100%;">开卡行详细地址：</span>
	 			<textarea style="width: 100%;border: none;" type="text"  v-model="adress" placeholder="xx省xx市xx行"/>
	 		</li>
	 	</ul>
	 </div>
	 <button @click="savemsg()">保存信息</button>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
    	cardnumer:'',
    	band:'',
    	name:'',
    	tel:'',
    	adress:''
    }
  },
 
  created(){

  },
  mounted(){
		
  },
  methods:{
	back(){
	  	this.$router.go(-1)
	  },
	savemsg(){
		if(this.check()){
			$('#loading').show();		
		let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'mobile/bindingBank',
		 	data:{
		 		uid:localStorage.getItem('uid'),
		 		bankName:this.band,
		 		bankCard:this.cardnumer,
		 		accountName:this.name,
		 		phone:this.tel,
		 		address:this.adress,
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       			_this.$toast('绑定成功');
	       		  _this.$router.push({path:'/cardsure'})
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
	},
	check(){
		if(this.band==''||this.cardnumer==''||this.cardnumer==''||this.adress==''||this.name==''){
				 this.$toast('请完善信息！');
				return false;
		}else if(!/^[\u4E00-\u9FA5]{1,5}$/.test(this.name)){
                 this.$toast('姓名式有误！');
                return false;
        }else if(!/^1[3|4|5|7|8]\d{9}$/.test(this.tel)){
                 this.$toast('手机格式有误！');
                return false;
        }else if(!/^\d{16}|\d{19}$/.test(this.cardnumer)){
        	 this.$toast('银行卡格式有误！');
                return false;
        }else{
        		return true;
        }
	}
	
   }
  }	
</script>

<style scoped>
.carset{
	height: 100vh;
	background: #F1F1F1;
}
ul{
	width: 100%;
	background: #fff;
}
ul>li{
	border-bottom: 1px solid #eee;
	box-sizing: border-box;
	margin:0 0.53rem ;
	padding: 0.4rem 0;
	text-align: left;
	font-size: 0.42rem;
	color: #666666;
	
}
ul>li>span{
	display: inline-block;
	width: 20%;
}
ul input{
	border: none;
	width: 70%;
	font-size: 0.42rem;
	text-align: left;
}
textarea{
	font-size: 0.42rem;
}
.content>p{
	color: #3168FA;
	font-size: 0.32rem;
	text-align: center;
	padding: 0.26rem 0;
}
.content>p>img{
	max-height: 0.32rem;
	margin-right: 0.13rem;
	vertical-align: middle;
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