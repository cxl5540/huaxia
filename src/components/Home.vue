<template>
  <div class="index">

     <img src="../assets/banner.png"/>
     <mt-tabbar v-model="selected">
		  <mt-tab-item id="外卖">
		    <img src="../assets/b_-shezhi.png"/>
		    外卖
		  </mt-tab-item>
		  <mt-tab-item id="订单">
		    <img src="../assets/b_-shezhi.png"/>
		    订单
		  </mt-tab-item>
		  <mt-tab-item id="发现">
		    <img src="../assets/b_-shezhi.png"/>
		    发现
		  </mt-tab-item>
		  <mt-tab-item id="我的">
		    <img src="../assets/b_-shezhi.png"/>
		    我的
		  </mt-tab-item>
		</mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
   
    }
  },
 
  created(){

  },
  mounted(){
		
  },
  methods:{
		  
  		}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
	background: #F1F1F1;
}
</style>
