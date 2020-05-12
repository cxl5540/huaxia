<template>
	<div class="header">
	 <!--<mt-header title='$route.meta.title'>
        <router-link to="/" slot="right">
          <mt-button>名字1</mt-button>
        </router-link>
      </mt-header>-->
		<span style="opacity: 0;">名字</span>
      	<span>银河金服</span>
      	<span @click="gomine">{{name}}</span>	
	</div>
</template>

<script>
export default {
	  name: 'tabar',
	  components:{
	  },
	  data () {
	    return {
		  name:'未登录'
	    }
	  },
	 
	  created(){
	  	this.getinfo();
//	  	  var data =JSON.parse(localStorage.getItem("user")); 
//	  	  if(localStorage.getItem('username')){
//	  	    	this.name=localStorage.getItem('username');
//	  	    	if(this.name.length>3){
//		 		this.name=this.name.substring(0,2)+'...'
//		 	  }
//	  	  }else{
//	  	  	this.name=_const.username;
//	  	  	this.name='未登录';
//	  	  }
	  	  
	  	  
//	  	  console.log(_const.username)
//		 if(_const.uid&&_const.uid){
//		 	this.name=_const.username;
//		 	if(this.name.length>3){
//		 		this.name=this.name.substring(0,2)+'...'
//		 	}
//		 }else{
//		 	this.name='未登录';
//		 }

	  },
	  mounted(){
			
	  },
	  methods:{
		gomine(){
			if(localStorage.getItem('uid')&&this.name!=='未登录'){
				this.$router.push({path:'/mine'})
			}else{
				this.$router.push({path:'/login'})
			}
		 },
		 getinfo(){
		   	let _this=this;
		   	$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'mobile/getMyCenter',
			 	data:{
			 		uid:localStorage.getItem('uid')
			 	},  
			 	success:function(res){
		       		if(res.code==200){
		       			if(res.data.realName){
		       				 _this.name=res.data.realName
		       			}else{
		       				_this.name='未登录';
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
		   }
	  	}
	  }	
</script>

<style scoped="scoped">
	.header{
		height: 1.17rem;
		line-height: 1.17rem;
		font-size: 0.48rem;
		color: #333333;
		background: #fff;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 0.26rem;
	}
	.header>span{
		display: inline-block;
		width: 33%;
	}
	.header>span:nth-child(1){
		text-align: left;
	}
	.header>span:nth-child(3){
		text-align: right;
	}
</style>