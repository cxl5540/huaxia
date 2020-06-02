<template>
 <div>
 	<div class="header">
	 	<span @click="back()"><img src="../assets/b_fanhui.png"/>{{$store.state.lg=='C'?'返回':'Back'}}</span>
	 	<span>{{info.ruleName}}</span>
	 	<span style="opacity: 0;">title</span>
	</div>
	<div class="detail">
		<div v-html="info.content">{{info.content}}</div>
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
    	info:''
    }
  },
 
  created(){
	this.getdata();
  },
  mounted(){		
  },
  methods:{
  	back(){
  		this.$router.go(-1)
  	},
	getdata(){
		$('#loading').show()
		let _this=this;
		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'mobile/getRule',
		 	data:{
		 		id:this.$route.query.id
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.info=res.data;
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
.header>span:nth-child(2){
	width: 50%;
}	
</style>