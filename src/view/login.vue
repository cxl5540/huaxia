<template>
 <div class="login">
 	<div class="header">
	 	<span @click="back()"><img src="../assets/b_fanhui.png"/></span>
	 	<span style="opacity: 0;">银行卡管理</span>
	 	<span @click="home()" >首页</span>
	 </div>
     <div class="logo">
     	<img src="../assets/denlu.png"/>
     	<p>欢迎来到银河金服，<router-link to='/register'><span style="color: #3168FA;">立即注册</span></router-link></p>
     </div>
     <div class="msg">
     	<p>
     		<span>手机号:</span>
     		<input type="number"  v-model="tel" placeholder="请输入手机号"/>
     	</p>
     	<p>
     		<span>密码:</span>
     		<input type="password"   v-model="password" placeholder="请输入密码"/>
     	</p>     	
     </div>
     <div class="btn">
     	<p><router-link to='/forgetpass'>忘记密码<img src="../assets/b_y-x.png" alt="" /></router-link></p>
     	<button @click="login">登录</button>
     </div>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
    	tel:'',
    	password:'',
    	formurl:''
    }
  },
 
  created(){

  },
  mounted(){
  },
beforeRouteEnter (to, from, next) {
     
       next(vm => {
        vm.formurl=from.name;
      });

   },
  methods:{
  	back(){
	  	this.$router.go(-1)
	  },
	  home(){
		this.$router.push('/')  
	  },
	login(){
		$('#loading').show()
		let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'mobile/login',
		 	data:{
		 		phone:this.tel,
		 		password:this.password
		 	},
		 	
		 	success:function(res){
		 		$('#loading').hide()
	       		if(res.code==200){
	       		 localStorage.setItem('user', JSON.stringify(res.data))
	       		 localStorage.setItem('uid',res.data.clientId)
	       		 localStorage.setItem('username',res.data.realName)
	       		if(localStorage.getItem('username')){
	       			_const.username=localStorage.getItem('username');
	       		}else{
	       				_const.username=res.data.realName;
	       		}
	       		if(localStorage.getItem('uid')){
	       			_const.uid=localStorage.getItem('uid');
	       		}else{
	       		   _const.uid=res.data.clientId;
	       		}
	       			  
	       		if(_this.formurl=='Register' ||_this.formurl=='Forgetpass' ){
	       			_this.$router.push({path:'/index'})
	       		}else{
	       		_this.$router.go(-1)	
	       		}
	       		 
//	       		 _this.$router.push({path:'/index'})
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
	  },

  	}
  }	
</script>

<style scoped>
.header{
	border: none;
}
.login{
	box-sizing: border-box;
	margin: 0 0.66rem;
	overflow: hidden;
}	
.logo{
	text-align: left;
	color: #666666;
	font-size: 0.49rem;
	font-weight: bold;
	margin: 1.6rem 0 1.6rem 0;
}
.logo img{
	max-height: 1.6rem;
}
.msg>p{
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0.53rem 0;	
	text-align: left;
}
.msg>p>span{
	width: 25%;
	color: #333333;
	font-size: 0.42rem;
	position: relative;
	    top: 20px;
}
.msg input{
	width:76%;
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
	font-size: 0.48rem;

}
.btn{
	height:3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.btn>p{
	color: #333333;
	font-size: 0.42rem;
}
.btn img{
	max-height: 0.42rem;
	vertical-align: middle;
	margin-left: 0.26rem;
}
button{
	width:2.93rem;
   height:1.2rem;
   background: #3168FA;
   color: #fff;
   font-size: 0.49rem;
   border: none;
   border-radius: 1.2rem;
}	
</style>