<template>
	<div>
		<div class="header">
			<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
			<span>联系客服</span>
			<span style="opacity: 0;">title</span>
		</div>
		<img src="../assets/images/ewm.jpg" alt="">
	</div>
</template>

<script>
	export default {
	  name: 'HelloWorld',
	  data () {
	    return {

	    }
	  },

	  mounted(){
			
	  },
	  methods:{
		  back(){
			  this.$router.go(-1)
		  }
	  },
	  }
</script>

<style>
</style>
