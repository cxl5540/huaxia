<template>
	<div class="header">
		   <!-- <span  :style="{'opacity': (path=='/index' ? '1':path=='/' ?'1':'0')}" @click="changelg">{{$store.state.lg=='C'?'English':'简体中文'}}</span> -->
       <span  :style="{'opacity': (path=='/index' ? '1':path=='/' ?'1':'0')}" @click="changelg"><span :class="$store.state.lg=='C'?'blue':''">中文/</span><span :class="$store.state.lg=='E'?'blue':''">EN</span></span>
      	<span>{{$store.state.lg=='C'?'华夏金服':'HuaXia gold suit'}}</span>
      	<span @click="gomine" v-if="name==''">{{$store.state.lg=='C'?'未登录':'Sign in'}}</span>
        <span @click="gomine" v-if="name!==''">{{name}}</span>
	</div>
</template>

<script>
export default {
	  name: 'tabar',
	  components:{
	  },
	  data () {
	    return {
		  name:'',
      path:this.$route.path
	    }
	  },

	  created(){
	  	this.getinfo();
      this.path=this.$route.path

	  },
	  mounted(){

	  },
	  methods:{
		gomine(){
      if(this.name=='' || this.name=='未登录' || this.name=='Sign in'){
        this.$router.push({path:'/login'})
      }else{
       	this.$router.push({path:'/mine'})
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
		       				 _this.name=res.data.realName;
		       			}else{
		       				_this.$store.state.lg=='C'? _this.name='未登录': _this.name='Sign in'
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
       changelg(){
         console.log(this.$store.state.lg)
          if(this.$store.state.lg=='C'){
            this.$store.state.lg='E';
           this.$store.state.emsg='network error!'
          }else{
           this.$store.state.lg='C';
           this.$store.state.emsg='网络错误'
          }

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
/* 		width: 33%; */
	}
	.header>span:nth-child(1){
		text-align: left;
    width:200px;
	}
	.header>span:nth-child(3){
		text-align: right;
      width:200px;
	}
  .blue{
    color: #3168FA;
  }
</style>
