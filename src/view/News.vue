<template>
	<div class="news">
	  <Header></Header>
	  <div class="bgline"></div>
	  <div>
	  	<iframe id="cha" frameborder="0" width="100%" height="900" scrolling="yes" src="https://www.jin10.com/example/jin10.com.html?fontSize=14px&theme=white"></iframe>
	  </div>
	  <Tabbar></Tabbar>
	</div>
</template>

<script>
import Header from "../components/Header.vue"
import Tabbar from "../components/tabbar.vue"
export default {
  name: 'HelloWorld',
  components:{
  	Header,
  	Tabbar
  },
  data () {
   return {

    }
  },
 
  created(){
//	 $("#cha").contents().find("jin-flash-remark__item:last-child").css('display','none');     

//$('.jin-flash-remark__item:last-child').hide()
  },
  mounted(){
		
  },
  methods:{
		  
  	}
  }
</script>

<style>
</style>