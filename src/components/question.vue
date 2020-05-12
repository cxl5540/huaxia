<template>
	<div class="question">
		 <h3>企业数字化成熟度自测</h3>
		  <div class="content">
			<p style="padding-left: 20px;">
				<span>{{title}}</span>
				<span>{{current}}/{{totle}}</span>
			</p>
			<div class="checkredio" v-if="question_type==3" v-for="(item,index) in radios" :key="index">
				<h4 class="questionnname">{{current}}.{{item.content}}</h4>
				<div  v-for="(val,index) in item.arr" :key="index">
	   				<div class="radio-box" >
	   				<p>{{val.children_content}}</p>
	   			 	<span  v-for="(anser,index) in val.children_arr" :key="index">
					    <span class="radio" :class="{'on':anser.isChecked}"></span>
					    <input v-model="company" :value="anser.value" class="input-radio" :checked='anser.isChecked' :id="anser.value"   type="radio">
					    <label :for='anser.value' @click="check(item,val,anser,anser.value,index)">{{anser.label}}</label> 				    	
					  </span>
	   			   </div>
   			   </div>
   			</div>
   			<div class="checkbox" v-if="question_type!==3" v-for="(item,index) in chexbox" :key="index">
   				<h4 class="questionnname">{{current}}.{{item.content}}{{item.question_type==2?" (多选)":' (单选)'}}</h4>
   				<div>
   					<p  v-for="(val,index) in item.arr" :key="index"  @click="choose(chexbox,val,index)" v-show="val.label" :class="{'choose':val.isChecked}">{{val.label}}</p>
   				</div>
   			</div>
		  </div>
		<div class="btn">
   			 <button @click="back">返回</button>
   			 <button @click="next">{{nexttext}}</button>
   		</div>  
	</div>
</template>

<script>
	export default {
  name: 'HelloWorld',
  data () {
    return {
    question_type:'',
    nexttext:'下一题',	
   	title:'企业数字化现状调查',
   	totle:19,
   	current:1,
   	company:'',
   	radios:[],
	chexbox:[],
	test_list:'',
	anserattr:[],
	str:'',
	str1:'',
	ansterstr:'',
	aaa:[],
	uid:'',
	code_id:'',
  }
 },
  created(){
	
  },
  mounted(){
  	this.uid=this.$route.query.uid;
  	this.code_id=this.$route.query.code_id;
  	this.get();
  },
   watch:{
   	 current(val){
   	 	 console.log(val);
   	 	 if(val==this.totle){
   	 	 	this.nexttext='查看结果';
   	 	 }
   	 }
   	
   },
  methods:{
  	  	get(){
  	  		let _this=this;
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",

		 	url:this.testUrl,
		 	data:{
		 		action:'Questionnaire/index',
		 		code_id:this.$route.query.code_id,
		 		
		 	},
		 	success:function(res){
	       		if(res.code==20){
	       		  let test_list=res.data.test_list;
	       		  _this.totle=test_list.length;
	       		  _this.test_list=res.data.test_list;
	       		   _this.question_type=test_list[0].question_type;
	       		  if(test_list[0].question_type==3){
	       		  	 _this.radios.push(test_list[0]);
	       		  	 	console.log(_this.radios)
	       		  }else{	       		  		       			       		 
	       		  _this.chexbox.push(test_list[0]);
	       		    }

	       		}
	       
	         },          
	         error:function(){
	           _this.$message.error('网络错误！'); 
	         }
		 });	
  	},
  	submit(ansterstr){ 		
  		let _this=this;
  		$('#loading').show();
  		$.ajax({
		 	dataType:"json", 
		 	type:"post",
		 	url:this.testUrl,
		 	data:{
		 		action:'Questionnaire/submit_test',
		 		answer_str:ansterstr,
				uid:this.$route.query.uid,
				code_id:this.code_id,
		 	},
		 	success:function(res){
		 		$('#loading').hide();
	       		if(res.code==20){
	       		  _this.$router.push({path:'/result',query:{uid:_this.uid,code_id:_this.code_id}})
	       		}
	       
	         },          
	         error:function(){
	            _this.$message.error('网络错误！');
	         }
		 });
  	},
  	back(){
  		if(this.current!==1){
  			this.current=this.current-1;
  			this.nexttext='下一题';
  			var index=this.current-1;
  			this.question_type=this.test_list[index].question_type;
  			if(this.test_list[index].question_type==3){
  				this.radios=[];
  				this.radios.push(this.test_list[index]);
  			
  			}else{
  				this.chexbox=[];
  			   this.chexbox.push(this.test_list[index]);
  			}  
  		
  		}	
  	},
	   unique(array) {
          var res = [];
          for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
              for (var j = 0, resLen = res.length; j < resLen; j++ ) {
                  if (array[i] === res[j]) {
                      break;
                  }
              }
              // 如果array[i]是唯一的，那么执行完循环，j等于resLen
              if (j === resLen) {
                  res.push(array[i])
              }
          }
          console.log(res)
          return res;
      },
  	next(){                                     //下一题
  		if(this.current!==this.totle){
			
//			if(this.question_type!==1){
//				console.log(this.str1.length)
//				if(this.str1.length<2 ){
//				this.$message.error('此题为多选题！');	
//				return;
//				}
//				if(this.str.length<2){
//				this.$message.error('此题为多选题！');	
//				return;
//				}
//		 
           if(this.question_type==1){
           	if(!this.anserattr[this.current-1]){
				this.$message.error('请答题！');
				return;
			}
           }
  			
			if(this.question_type==2){
				 this.str1='';
				for(var i=0;i<this.chexbox[0].arr.length;i++){					
					if(this.chexbox[0].arr[i].isChecked==true){
		 		  	     this.str1+=','+this.chexbox[0].arr[i].value;			 		  	  	
		 		  }										
				}
				console.log(this.str1)
				if(this.str1.length<2){
					this.$message.error('请答题！');	
					return;
				}else{
					 this.anserattr[this.current-1]=this.str1;
			        console.log(this.anserattr)
				}
			
			}else if(this.question_type==3){
				this.str='';
				console.log(this.radios)
				for(var i=0;i<this.radios[0].arr.length;i++){
					for(var j=0;j<this.radios[0].arr[i].children_arr.length;j++){
						if(this.radios[0].arr[i].children_arr[j].isChecked==true){
							console.log(this.radios[0].arr[i].children_arr[j].value)
						 this.str+=','+this.radios[0].arr[i].children_arr[j].value	
						}
					}
				}
				if(this.str.length!==this.radios[0].arr.length*2){
					this.$message.error('请完善此题！');	
					return;
				}else{
					 this.anserattr[this.current-1]=this.str;
				     console.log(this.anserattr)
				}
				console.log(this.str)
				
			}
			
			this.current=this.current+1;
  			var index=this.current-1;				  			
	  			this.question_type=this.test_list[index].question_type;
	  			if(this.test_list[index].question_type==3){
	  				this.radios=[];
	  				this.radios.push(this.test_list[index]);
	  			}else{
	  				this.chexbox=[];
	  			   this.chexbox.push(this.test_list[index]);
	  			} 
 
  		}else{
  			
//			this.nexttext='查看结果'
  		}
  		if(this.nexttext=='查看结果'){
  			if(this.question_type==2){
				 this.str1='';
				for(var i=0;i<this.chexbox[0].arr.length;i++){					
					if(this.chexbox[0].arr[i].isChecked==true){
		 		  	     this.str1+=','+this.chexbox[0].arr[i].value;			 		  	  	
		 		  }										
				}
			 this.anserattr[this.current-1]=this.str1;
			  console.log(this.anserattr)
			}else if(this.question_type==3){
				this.str='';
				console.log(this.radios)
				for(var i=0;i<this.radios[0].arr.length;i++){
					for(var j=0;j<this.radios[0].arr[i].children_arr.length;j++){
						if(this.radios[0].arr[i].children_arr[j].isChecked==true){
							console.log(this.radios[0].arr[i].children_arr[j].value)
						 this.str+=','+this.radios[0].arr[i].children_arr[j].value	
						}
					}
				}
				console.log(this.str)
				 this.anserattr[this.current-1]=this.str;
				 console.log(this.anserattr)
				
			}
  			
  			for(var i=0;i<this.anserattr.length;i++){
	  			if(this.anserattr[i].length>=2){
	  			this.anserattr[i]=this.anserattr[i].substr(1);
	  			}
	  		}
  			this.ansterstr=this.anserattr.join('***')
  			console.log(this.ansterstr)
  			 this.submit(this.ansterstr);
  		}
  	},
	check(items,item,val,value,index) {    //单选
		console.log(value)
		  item.children_arr.forEach((item1) => {
		      item1.isChecked = false;
		   });		    
		this.$set(val,'isChecked',true);
		console.log(this.current)
//		  this.str=value+','+this.str
//		
//		this.anserattr[this.current-1]=this.str;
//		
//		console.log(this.anserattr)
	  },
	 choose(items,item,index){
	 	if(this.question_type==1){
	 		this.chexbox[0].arr.forEach((item) => {
		      item.isChecked = false;
		    });
	 		this.$set(item,'isChecked',true) //单选    
	 		this.anserattr[this.current-1]=item.value;
	 		console.log(this.anserattr)
	 	}else if(this.question_type==2){
	 		console.log(items)
	 		  this.$set(item,'isChecked',!item.isChecked)  //多选
//	 		  for(var i=0;i<items[0].arr.length;i++){
//	 		  	if(items[0].arr[i].isChecked==true){
//	 		  		this.aaa.push(items[0].arr[i].value)
////	 		  	  this.str1=items[0].arr[i].value+','+this.str1;	
//	 		  	}
//	 		  }
//	 		  console.log(this.aaa)
//		   	  this.anserattr[this.current-1]=this.str1;			
//		console.log(this.anserattr)
	 	}
	  }
  }
 }
</script>

<style scoped>
h3{
	font-size:40px;
	font-family:PingFang SC;
	font-weight:800;
	color: #FFFFFF;
	margin:22px 0;
}
.content{
	width:702px;
	margin: auto;
	background:rgba(255,255,255,1);
	border:2px solid rgba(0,5,36,1);
	border-radius:10px;
	box-sizing: border-box;
	height: 76vh;
	overflow-y: scroll;
}
.content>p{
	font-size:36px;
	font-family:PingFang SC;
	font-weight:800;
	color:rgba(255,255,255,1);
	border-radius:10px 10px 0px 0px;
	border:2px solid rgba(0,5,36,1);
	border-left: none;
	border-right: none;
	color: #FFFFFF;
	background: #F8960A;
	height: 100px;
	line-height: 100px;
	text-align: left;
}
.content>p>span:nth-child(2){
	float: right;
	margin-right: 40px;
}
.questionnname{
	font-size:32px;
	font-weight:500;
	color:rgba(0,5,36,1);
	/*margin-left: 30px;
	margin-right: 10px;*/
	margin: 20px 10px 20px 30px;
	text-align: left;

}
.radio-box>span{
	margin-right: 20px;
}
.checkbox>div>p{
	text-align: left;
	width:640px;
	/*height:66px;*/
	background:rgba(238,238,238,1);
	border-radius:10px;
	margin:20px auto;
	font-weight:500;
	color:rgba(0,5,36,1);
	line-height: 66px;
	font-size:28px;
	box-sizing: border-box;
	padding-left: 30px;
}
.choose{
	background: #0032A5 !important;
	color: #FFFFFF !important;
}	
</style>