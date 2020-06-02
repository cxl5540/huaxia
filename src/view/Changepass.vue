
<template>
 <div class="forget">
     <div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>{{$store.state.lg=='C'?'返回':'Back'}}</span>
		 	<span>{{$store.state.lg=='C'?'修改密码':'Change Password'}}</span>
		 	<span style="opacity: 0;">title</span>
		 </div>
     <div class="msg">
     	<p>
     		<span><img src="../assets/b_shouji.png"/></span>
     		<input type="text"  v-model="oldpassword" :placeholder="$store.state.lg=='C'?'请输入旧密码':'Enter old password'"/>
     	</p>
     	<p>
     		<span><img src="../assets/b_yanzheng.png"/></span>
     		<input type="text"  v-model="newpassword"  :placeholder="$store.state.lg=='C'?'请输入新密码':'Enter new password'"/>
     	</p>
     	<p>
     		<span><img src="../assets/b_mima.png"/></span>
     		<input type="text"  v-model="newagpassword" :placeholder="$store.state.lg=='C'?'请再次输入新密码':'Enter the new password again'"/>
     	</p>
     </div>
     <div class="btn">
     	<button @click="changepass">{{$store.state.lg=='C'?'修改密码':'Change Password'}}</button>
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
              var msg='';
               _this.$store.state.lg=='C'?msg='修改成功！':msg='Update success';
	       		  _this.$toast(msg);
	       		  _this.$router.push({path:'/login'})
	       		}else{
	       			 _this.$toast(res.msg);
	       		}

	         },
	         error:function(res){
	          _this.$toast(emsg);
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
