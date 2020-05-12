<template>
 <div class="login">
 	
     <div class="logo">
     	<img src="../assets/denlu.png"/>
     	<p>欢迎来到银河金服，已有账号 <router-link to='/login'><span style="color: #3168FA;">去登录</span></router-link></p>
     </div>

     <div class="msg">
     	<p>
     		<span>真实姓名:</span>
     		<input type="text"  maxlength="5" v-model="name" placeholder="请输入姓名"/>
     	</p>
     	<p>
     		<span>手机号:</span>
     		<input type="number" v-model="tel" placeholder="请输入手机号"/>
     	</p>
     	<p>
     		<span>密码:</span>
     		<input type="password" v-model="password" placeholder="请输入密码"/>
     	</p>
		<p>
			<span>邀请码:</span>
			<input type="text" v-model="yqm" placeholder="请输入邀请码(选填)"/>
		</p>
     	<p style="position: relative;">
     		<span>验证码:</span>
     		<input type="number" v-model="yzm" placeholder="请输入验证码"/>
     		<button  @click="getCode"  v-bind:class="{gray:wait_timer>0}">{{ getMobileCodeText() }}</button>
     	</p>
     	
     </div>
     <div class="btn">
     	<p @click="checkyh()">
     		<img v-if="check==false" src="../assets/b_fuxuankuang2.png" alt="" />
     		<img v-if="check==true" src="../assets/b_fuxuankuang.png"/>
     		用户协议
     	</p>
     	<button @click="submit()">注册</button>
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
    	check:false,
    	name:'',
    	tel:'',
    	code:'',
    	yzm:'',
    	password:'',
    	 wait_timer:false, 
		 yqm:''
    }
  },
 
  created(){
	this.$route.query.agree=='yes'?this.check=true:this.check=false;
	if(sessionStorage.getItem('name')){
		this.name=sessionStorage.getItem('name');
	}
	if(sessionStorage.getItem('tel')){
		this.tel=sessionStorage.getItem('tel');
	}
	if(sessionStorage.getItem('yzm')){
		this.yzm=sessionStorage.getItem('yzm');
	}
	if(sessionStorage.getItem('password')){
		this.password=sessionStorage.getItem('password');
	}
  },
  mounted(){
		
  },
  beforeRouteEnter (to, from, next) {
       if(from.name=='Login'){
       	 sessionStorage.clear();
       }
       next(vm => {
       
      });

   },
// beforeDestroy(){
// 	  sessionStorage.clear();
// },
  methods:{
	checkyh(){
		console.log(this.tel)
	    sessionStorage.setItem('name',this.name)
	    sessionStorage.setItem('tel',this.tel)
	    sessionStorage.setItem('yzm',this.yzm)
	    sessionStorage.setItem('password',this.password)
		 sessionStorage.setItem('yqm',this.yqm)
		this.$router.push('/agreement')
	},
	  getCode(){
	  	if (this.wait_timer > 0) {
                return false;
            }
	  	if (!this.tel) {
               this.$toast('手机不能为空！');
                return false;
            }
            if(!/^1[3|4|5|7|8]\d{9}$/.test(this.tel)){
                 this.$toast('手机格式有误！');
                return false;
           }
		 this.wait_timer = 59;
            var that = this;
            var timer_interval = setInterval(function(){
                if(that.wait_timer > 0){
                    that.wait_timer -- ;
                }else{
                    clearInterval(timer_interval);
                }
            },1000);
              //在这里调取你获取验证码的ajax
              that.getyazm()
		},
		getMobileCodeText(){
            if(this.wait_timer > 0){
                return this.wait_timer+'s后获取';
            }          
            if(this.wait_timer === 0){
                return '重新获取';
            }           
            if(this.wait_timer === false){
                return '获取验证码';
            }
           
        },
        getyazm(){
        	$('#loading').show()
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"post",
			 	url:this.testUrl+'mobile/getAuthCode',
			 	data:{
			 		phone:this.tel,
			 	},
			 	
			 	success:function(res){
		       		if(res.code==200){
		       		
		       		}
		       
		         },          
		         error:function(res){
		          _this.$toast(res.msg);
		         },
		        complete:function(){
		        	$('#loading').hide()
		        }
			 });
       },
       submit(){          //注册
        if(this.checkreg())	{       	       
       	$('#loading').show()
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"post",
			 	url:this.testUrl+'mobile/register',
			 	data:{
			 		phone:this.tel,
			 		realName:this.name,
			 		password:this.password,
			 		authCode :this.yzm,
					invitationCode:this.yqm,
			 	},
			 	
			 	success:function(res){
		       		if(res.code==200){
		       		    _this.$toast(res.msg);
		       		    _this.$router.push({path:'/login'});
		       		     sessionStorage.clear();
		       		}else{
		       		   _this.$toast(res.msg);
		       		}
		       
		         },          
		         error:function(res){
		          _this.$toast(res.msg);
		         },
		        complete:function(){
		        	$('#loading').hide()
		        }
			 });
			} 
      },
      checkreg(){  //验证
      	var reg = /^[\u4E00-\u9FA5]{1,5}$/;  //姓名
      	var reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;  //姓名
      	
      	if(!reg.test(this.name) || this.name==''){
      		 this.$toast('姓名为1-5个中文字符');
      		return false;
      	}else  if(!/^1[3|4|5|7|8]\d{9}$/.test(this.tel)){
      		  this.$toast('手机格式有误！');
      		return false;
      	}else if(!reg1.test(this.password) || this.password==''){
      		 this.$toast('密码为6-20位数字+字母');
      		return false;
      	}else if(this.check==false){
      		 this.$toast('请先阅读并同意用户协议');
      		return false;
      	}else{
      		return true;
      	}
      	
      },
	
  }
 }	
</script>

<style scoped>
.login{
	box-sizing: border-box;
	margin: 0 0.66rem;
	overflow: hidden;
}	
.logo{
	text-align: left;
	color: #666666;
	font-size: 0.49rem;
	font-weight: bold;
	margin: 1.6rem 0 1.6rem 0;
}
.logo img{
	max-height: 1.6rem;
}
.msg>p{
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0.53rem 0;	
	text-align: left;
}
.msg>p>span{
	width: 25%;
	color: #333333;
	font-size: 0.42rem;
	position: relative;
	    top: 20px;
}
.msg input{
	width:76%;
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
	font-size: 0.48rem;

}
.btn{
	height:3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.btn>p{
	color: #333333;
	font-size: 0.42rem;
}
.btn img{
	max-height: 0.42rem;
	vertical-align: middle;
	margin-left: 0.26rem;
}
.btn>button{
	width:2.93rem;
   height:1.2rem;
   background: #3168FA;
   color: #fff;
   font-size: 0.49rem;
   border: none;
   border-radius: 1.2rem;
}
p>button{
	width: 2.4rem;
	height: 0.8rem;
	background: #3168FA;
	color: #fff;
	font-size: 0.32rem;
	border-radius: 6px;
	position: absolute;
	right: 0;
	top: 0.37rem;
}
.gray{
	background: #C0C0C0;
}	
</style>