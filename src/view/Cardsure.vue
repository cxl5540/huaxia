<template>
 <div class="cardsure">
  	<div class="header">
	<span style="opacity: 0;"><img src="../assets/b_fanhui.png"/ >{{$store.state.lg=='C'?'返回':'Back'}}</span>
	 	<span>{{$store.state.lg=='C'?'银行卡管理':'Bank card management'}}</span>
	 	<span @click="person">{{$store.state.lg=='C'?'个人中心':'Me'}}</span>
	 </div>
	 <div class="content">
	 	<p>
	 		<img v-if="!status=='0'" src="../assets/b_zhushi_l.png"/>
	 		<img v-if="status=='0'" src="../assets/b_zhushi_h.png" alt="" />
	 		<span v-show="$store.state.lg=='C'">{{status=='0'?'审核未通过':status=='1'?'审核中':'审核通过'}}</span>
      <span v-show="$store.state.lg=='E'">{{status=='0'?'Audit failed':status=='1'?'In audit':'Approved'}}</span>
	 	</p>
	 	<div>
	 		<p>{{$store.state.lg=='C'?'银行':'bank'}}：<span>{{info.bankName}}</span></p>
	 		<p>{{$store.state.lg=='C'?'卡号':'card'}}：<span>{{info.bankCard}}</span></p>
	 		<p>{{$store.state.lg=='C'?'持卡人':'name'}}：<span>{{info.accountName}}</span></p>
	 		<p>{{$store.state.lg=='C'?'开卡行详细地址':'Address'}}：</p>
	 		<p>{{info.address}}</p>
	 	</div>
	 	 <button  v-show="status=='2'" @click="changecard()">{{$store.state.lg=='C'?'换绑银行卡':'Change bank card'}}</button>
	 	 <button  v-show="status=='1'" class="disagree">{{$store.state.lg=='C'?'审核中':'In audit'}}</button>
	 	 <button  v-show="status=='0'"  @click="changecard()">{{$store.state.lg=='C'?'重新绑定银行卡':'Rebind bank card'}}</button>
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
    	agree:true,
    	status:'',
    	tip:'',
    	info:''
    }
  },

  created(){
	this.getBank()
  },
  mounted(){

  },
  methods:{
	back(){
		this.$router.go(-1)
	},
		getBank(){
			let _this=this;
	  		$.ajax({
			 	dataType:"json", 
			 	type:"get",
			 	url:this.testUrl+'mobile/getBank',
			 	data:{
			 		uid:localStorage.getItem('uid'),
			 	},
			 	success:function(res){
		       		if(res.code==200){
						_this.status=res.data.status;
						_this.info=res.data;
						console.log(_this.status)
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
		person(){
			this.$router.push({path:'/mine'})
		},

		changecard(){
			this.$messagebox.confirm('', {
                title: '注意',
                message: '重新绑定银行卡',
                showCancelButton: true,
                // confirmButtonText: 'abc',
                // cancelButtonText: '123'
            }).then(action => {
                if (action == 'confirm') { //确认的回调
			this.$router.push({path:'/carset'})
                }
            }).catch(err => {
                if (err == 'cancel') { //取消的回调
//                      window.location.reload();
                }
            });
		}
  	}
  }
</script>

<style scoped>
.cardsure{
	height: 100vh;
	background: #F1F1F1;
}
.content>p{
	color: #3168FA;
	font-size: 0.32rem;
	text-align: center;
	padding: 0.26rem 0;
}
.content>p>img{
	max-height: 0.32rem;
	margin-right: 0.13rem;
	vertical-align: middle;
}
.content>div{
	width: 9.36rem;
	height:6.2rem;
	background: #fff;
	text-align: left;
	margin: auto;
	border-radius:10px;
	color: #666666;
	font-size: 0.37rem;
	padding-top: 0.3rem;
}
.content>div>p{
	margin: 0.4rem;
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
.disagree{
	background: #999999;
}
</style>
