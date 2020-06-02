<template>
 <div class="dealrules">
	 <div class="header">
	 	<span @click="back()"><img src="../assets/b_fanhui.png"/>{{$store.state.lg=='C'?'返回':'Back'}}</span>
	 	<span>{{$store.state.lg=='C'?'设置':'Set'}}</span>
	 	<span style="opacity: 0;">title</span>
	 </div>
	 <div class="bgline"></div>
	 <div class="content">
	 	<ul>
	 		<router-link to="/changepass">
	 		<li><span><img src="../assets/b_mima.png" alt="" />{{$store.state.lg=='C'?'修改密码':'Reset password'}}</span><img src="../assets/b_xia.png"/></li>
	 		</router-link>
	 		<router-link to="/changetel">
	 		<li><span><img src="../assets/b_shouji.png"/>{{$store.state.lg=='C'?'修改手机号':'Reset phone number'}}</span><img src="../assets/b_xia.png"/></li>
	 		</router-link>
	 	</ul>
	 </div>
	  <div class="bgline"></div>
	  <div class="bgline"></div>
	 <p class="esc" @click="esc">{{$store.state.lg=='C'?'退出当前账号':'Exit the current account'}}</p>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
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
		esc(){
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"post",
			 	url:this.testUrl+'mobile/logout',
			 	data:{
			 		uid:localStorage.getItem('uid')
			 	},
			 	success:function(res){
		       		if(res.code==200){
		       		    _this.$toast('退出成功！');
		       		   localStorage.clear();
		       		   _const.uid='';
		       		   _this.$router.go(-1)
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
.dealrules{
	height: 100vh;
	background: #F1F1F1;
}
.content{
	background: #fff;
}
ul{
	box-sizing: border-box;
	padding: 0 0.4rem;
}
li{
	display: flex;
	justify-content: space-between;
	padding: 0.4rem 0;
	color: #666666;
	font-size: 0.42rem;
	align-items: center;
	border-bottom: 1px solid #eee;
}
.esc{
	background: #fff;
	text-align: center;
	padding: 0.4rem 0;
	color: #666666;
	font-size: 0.42rem;
	margin-top:0.53rem;
}
li img{
	max-height: 0.45rem;
	vertical-align: middle;
}
li>span>img{
	margin-right: 0.26rem;
	vertical-align: text-top;
}
</style>
