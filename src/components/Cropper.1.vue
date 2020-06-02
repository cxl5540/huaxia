<template>
	<div>
		<div class="top">
			<img  @click="upload"  :src='userImg' alt="" />
			<div>
				<p>
          <span v-if="$store.state.lg=='C'">{{info.realName?info.realName:'未登录'}}</span>
           <span  v-if="$store.state.lg=='E'">{{info.realName?info.realName:'Sign in'}}</span>
          <img @click="changename()"  src="../assets/pic_bianji.png" alt="" />
        </p>
				<p>{{$store.state.lg=='C'?'用户':'user'}}ID:{{info.clientId}}</p>
			</div>
		</div>
		<div class="v-simple-cropper">
			 <input class="file" ref="file" type="file" accept="image/*" mutiple="mutiple" capture="camera" @change="uploadChange">
			 <div class="v-cropper-layer" ref="layer">
				  <div class="layer-header">
				  <button class="cancel" @click="cancelHandle">{{$store.state.lg=='C'?'取消':'Cancel'}}</button>
				  <button class="confirm" @click="confirmHandle" style="color: #3168FA;">{{$store.state.lg=='C'?'确定':'Determine'}}</button>
				  </div>
				  <img ref="cropperImg">
			 </div>
		 </div>
	 </div>
</template>

<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  export default {
    name: 'v-simple-cropper',
	 data () {
	 return {
	 uploadParam: {
	  fileType: 'recruit', // 其他上传参数
	  scale: 4 // 相对手机屏幕放大的倍数: 4倍
	  },
	  info:'',
	  userImg:  require('../assets/touxiang.png'),
	  cropper: {},
	  filename: '' ,
	 }
 },
 created(){
 	this.getinfo();
 	console.log(localStorage.getItem('uid'))
 },
 mounted () {
 this.init();
 },
 methods: {
 // 初始化裁剪插件
 init () {
  let cropperImg = this.$refs['cropperImg']
  this.cropper = new Cropper(cropperImg, {
  aspectRatio: 1 / 1,
  dragMode: 'move'
  })
 },
 // 点击上传按钮
 upload () {
 if(localStorage.getItem('uid')){
 	 this.$refs['file'].click()
 }else{
 	this.$router.push({path:'/login'})
 }

 },
 // 选择上传文件
 uploadChange (e) {
  let file = e.target.files[0]
  this.filename = file['name']
  let URL = window.URL || window.webkitURL
  this.$refs['layer'].style.display = 'block'
  this.cropper.replace(URL.createObjectURL(file))
 },
 // 取消上传
 cancelHandle () {
  this.cropper.reset()
  this.$refs['layer'].style.display = 'none'
  this.$refs['file'].value = ''
 },
 // 确定上传
 confirmHandle () {
  let cropBox = this.cropper.getCropBoxData()
  let scale = 4|| 1
  let cropCanvas = this.cropper.getCroppedCanvas({
  width: cropBox.width * scale,
  height: cropBox.height * scale
  })
  let imgData = cropCanvas.toDataURL('image/jpeg')
// this.userImg=imgData
   var myform = new FormData();
   this.uploadImage(imgData)
   this.$refs['layer'].style.display = 'none'
  },
   uploadImage(file){
   	$('#loading').show()
   	let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl+'mobile/uploadImage',
		 	data:{
		 		file:file,
		 		uid:localStorage.getItem('uid')
		 	},
		 	success:function(res){
	       		if(res.code==200){
	       		  _this.$toast('上传成功！');
	       		  _this.userImg=_this.testUrl+res.data.fileUrl;
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
   changename(){
   	if(localStorage.getItem('uid')&&this.info.realName!==''){
   		 var reg = /^[\u4E00-\u9FA5]{1,5}$/;  //姓名
	    this.$messagebox({
		    $type:'prompt',
		    title:this.$store.state.lg=='C'?'输入名字':'Input name',
		    message:this.$store.state.lg=='C'?'请填写您的名字':'Please fill in your name',
         cancelButtonText:this.$store.state.lg=='C'?'取消':'Cancel',
		    closeOnClickModal:false,   //点击model背景层不关闭MessageBox
		    showCancelButton:true,   //不显示取消按钮
        confirmButtonText:this.$store.state.lg=='C'?'确定':'Determine',
		    inputPattern:reg,    //正则条件
		    inputErrorMessage:'姓名为1-5个中文字符',
		    showInput:true
		}).then(({ value, action }) => {
		    /* value 为填写的值，进行下一步操作*/
		    console.log(value);
		    this.submit(value)
		});
   	}else{
   		this.$router.push({path:'/login'})
   	}


   },
   submit(newPassword){
   	let _this=this;
   	$.ajax({
	 	dataType:"json", 
	 	type:"post",
	 	url:this.testUrl+'mobile/changeNickName',
	 	data:{
	 		newPassword:newPassword,  //修改姓名
	 		uid:localStorage.getItem('uid')
	 	},
	 	success:function(res){
       		if(res.code==200){
       		  _this.$toast('修改成功！');
       		 _this.info.realName=newPassword;
       		 _const.username=newPassword;
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
       		  _this.info=res.data;
       		 if(res.data.headImg){
       		 	 _this.userImg=_this.testUrl+_this.info.headImg;
       		 }

       		   _this.$emit('fromChild',res.data.balance);
       		   console.log(res.data.balance)
       		}
         },
         error:function(res){
           _this.$toast(_this.$store.state.emsg);
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
 .file {
 display: none;
 }
 .v-cropper-layer {
 position: fixed;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 background: #fff;
 z-index: 99999;
 display: none;
 }
 .layer-header {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99999;
  background: #fff;
  width: 100%;
 /* height: .8rem; */
  padding: 0.3rem;
  box-sizing: border-box;
 }
 .cancel, .confirm {
  line-height: .8rem;
  font-size: 0.37rem;
  background: inherit;
  border: 0;
  outline: 0;
  float: left;
 }
 .confirm {
  float: right;
 }
.top{
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 0 0.4rem;
	padding-top:0.4rem; ;
}
.top>img{
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	overflow: hidden;
}
.top>div{
	margin-left: 0.4rem;
	text-align: left;
}
.top>div>p img{
	max-width: 0.42rem;
}
.top>div>p:nth-child(1){
	color: #333333;
	font-weight: bold;
	font-size: 0.48rem;
}
.top>div>p:nth-child(2){
	font-size: 0.34rem;
	color: #999999;
	margin-top: 0.13rem;
}
</style>
