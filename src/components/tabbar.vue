<template>
	<div class="tabar">
		<ul>
			<!--<li v-for="(item,index) in list" @click="active(item,index)" >
				<img :src="index == colin?item.imgac:item.img" alt="" />
				<span :class="index == colin?'red':''">{{item.name}}</span>
			</li>-->
			
			<li v-for="(item, index) in list"  @click="linkTo(item.urlac,index)" >
				<img  v-if="$route.path.indexOf(item.urlac) !== -1" :src="item.imgac" alt="">
      			<img v-else :src="item.img" alt="">
				<span :class="{red: item.urlac === $route.path}">{{item.name}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
	  name: 'tabar',
	  components:{
	  },
	  data () {
	    return {
	   		list:[
			   	{
		            img: require("../assets/t_faxian_h.png"),
		            imgac:  require("../assets/t-faxian.png"),
		            urlac:'/index',
		            name:'发现'
		        },
		        {
		            img:  require("../assets/t_jiaoyi.png"),
		            imgac:  require("../assets/t_jiaoyi2.png"),
		            urlac:'/deal',
		            name:'交易'
		        },
		        {
		            img: require( "../assets/t_zixun.png"),
		            imgac:  require("../assets/t_zixun2.png"),
		            urlac:'/news',
		            name:'资讯'
		        },
		        {
		            img: require( "../assets/T_wode.png"),
		            imgac: require("../assets/t_-wode-x.png"),
		            urlac:'/mine',
		            name:'我的'
		        }
	   		],
	    }
	  },
	 
	  created(){
	   if(this.$route.path=='/'){
	   	this.list[0].img=this.list[0].imgac;
	   }
	  },
	  mounted(){
			
	  },
	  methods:{
	  	 linkTo(path,index){
	       this.$router.replace(path)   
	     }
	  	}
	  }
</script>

<style scoped="scoped">
.tabar{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1.4rem;
	border-top: 1px solid #eee;
	background: #fff;
	z-index: 99;
	box-shadow:0px 2px 32px 0px rgba(58,84,139,0.31);
}
ul{
 width: 100%;
 display: flex;
 height: 100%;
 align-items: center;
 justify-content: space-around; 		
}
li{
	display: flex;
	flex-direction: column;
}
li>span{
	margin-top: 0.05rem;
}
img{
	max-width: 0.64rem;
}
.red{
	color: #3168FA;
}	
</style>