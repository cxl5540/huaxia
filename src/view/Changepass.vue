<template>
 <div class="forget">
     <div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
		 	<span>修改密码</span>
		 	<span style="opacity: 0;">title</span>
		 </div>
     <div class="msg">
     	<p>
     		<span><img src="../assets/b_shouji.png"/></span>
     		<input type="text"  v-model="oldpassword" placeholder="请输入旧密码"/>
     	</p>
     	<p>
     		<span><img src="../assets/b_yanzheng.png"/></span>
     		<input type="text"  v-model="newpassword"  placeholder="请输入新密码"/>
     	</p>
     	<p>
     		<span><img src="../assets/b_mima.png"/></span>
     		<input type="text"  v-model="newagpassword"  placeholder="请再次输入新密码"/>
     	</p>
     </div>
     <div class="btn">
     	<button @click="changepass">修改密码</button>
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
    	check:false,
    	oldpassword:'',
    	newpassword:'',
    	newagpassword:'',
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
	changepass(){
	 $('#loading').show()
		let _this=this;
		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'mobile/changePassword',
		 	data:{
		 		uid:localStorage.getItem('uid'),
		 		oldPassword:this.oldpassword,
		 		newPassword:this.newpassword,
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.$toast('修改成功');
	       		  _this.$router.push({path:'/login'})
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
	}
	
  }
 }	
</script>

<style scoped>
.msg,.btn{
	box-sizing: border-box;
	margin: 0 0.66rem;
}	
.msg>p{
	width: 100%;
	padding: 0.53rem 0;	
	text-align: left;
}
.msg>p>span{
	width: 25%;
	color: #333333;
	font-size: 0.42rem;
}
.msg>p>span>img{
	max-height: 0.42rem;
	margin-right: 0.26rem;
}
.msg input{
	width:90%;
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
	font-size: 0.48rem;
	padding: 0.26rem 0;

}
.btn>button{
	width:8.66rem;
   height:1.33rem;
   background: #3168FA;
   color: #fff;
   font-size: 0.49rem;
   border: none;
   border-radius:6px;
   margin-top: 1.33rem;
}
	
</style>