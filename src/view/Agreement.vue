<template>
	<div class="agree">
		<div class="header">
		 	<span @click="back()"><img src="../assets/b_fanhui.png"/>返回</span>
		 	<span>用户协议</span>
		 	<span style="opacity: 0;">title</span>
		 </div>
		 <div class="content">
		 	<p>银河金服</p>
		 	<p>一、我们如何收集和使用您的个人信息 个人信息是指以电子或者其他方式记录的能够单独或者与 其他信息结合识别特定自然人身份或者反映特定自然人活 动情况的各种信息。本协议中涉及的个人信息包括:基本信息(包括个人姓名、生日、性别、住址、个人电话号码、电子邮箱) ;个人身份信息(包括身份证、军官证、护照、驾驶证等) ;网络身份标识信息(包括系统账号、IP地址、邮箱地址及与前述有关的密码、口令、口令保护答案) ;个人财产信息(交易和消费记录、以及余额、优惠券);通讯录;个人上网记录(包括网站浏览记录、软件使用记录、点击记录) ;个人常用设备信息(包括硬件型号、设备MAC地址、操作系统类型、软件列表唯一设备识别码(如MEl/android ID/IDFA/OPENUDID/GUID、SIM卡IMSI信息等在内的描述个人常用设备基本情况的信息) ;个人位置信息(包括行程信息、精准定位信息、住宿信息、经纬度等) ;个人敏感信息是指一-旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息，本协议中涉及的个人敏感信息包括:您的财产信息(包括交易记录、优惠券) ;个人身份信息(包括身份证、军官证、护照、驾驶证、户口本) ;网络身份识别信息(包括账户名账户昵称) ;其他信息(包括通讯录、行程信息、网页浏览记录住宿信息、精准定位信息)。我们仅会出于以下目的，收集和使用您的个人信息: (一)您须授权我们收集和使用您个人信息的情形 我们的产品与/或服务包括一些核心功能，这些功能包含了 实现网_上购物所必须的功能、改进我们的产品与/或服务所 必须的功能及保障交易安全所必须的功能。我们可能会收 集、保存和使用下列与您有关的信息才能实现上述这些功 O</p>
		 </div>
		 <button @click="agree()">已阅读并同意</button>
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
	agree(){
		if(this.$route.query.type=='see'){
			this.$router.go(-1)
		}else{
			this.$router.push({path:'/register',query:{agree:'yes'}})
		}
		
	}
  }
 }	
</script>

<style scoped>
.content{
	color: #333333;
	font-size: 0.34rem;
	text-align: left;
	box-sizing: border-box;
	padding: 0.4rem;
	text-align: justify;
	line-height: 0.48rem;
}
button{
	width: 100%;
	height: 1.29rem;
	font-size: 0.48rem;
	border: none;
	background: #3168FA;
	color: #fff;
	position: absolute;
	bottom: 0;
	left: 0;
}	
</style>