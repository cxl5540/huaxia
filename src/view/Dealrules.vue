<template>
 <div class="dealrules">
	 <div class="header">
	 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
	 	<span>交易规则</span>
	 	<span style="opacity: 0;">title</span>
	 </div>
	 <div class="bgline"></div>
	 <div class="content">
	 	<ul>
	 		<li v-for="item,index in list" :key='index' @click="godetail(item.id)"><span>{{item.ruleName}}</span><img src="../assets/b_xia.png"/></li>
	 	</ul>
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
    	list:''
    }
  },
 
  created(){
    this.getlist()
  },
  mounted(){
		
  },
  methods:{
		back(){
			this.$router.go(-1)
		},
		getlist(){
			$('#loading').show()
			let _this=this;
			$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'mobile/getRuleList',
			 	data:{},
			 	success:function(res){
		       		if(res.code==200){
		       		  _this.list=res.data;
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
		godetail(id){
			this.$router.push({path:'/rulesdetail',query:{id:id}})
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
li img{
	max-height: 0.45rem;
	vertical-align: middle;
}	
</style>