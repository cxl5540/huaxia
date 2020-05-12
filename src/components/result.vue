<template>
	<div class="result">
		<div class="head">
			 <h3>企业数字化成熟度自测</h3>
		</div>
		<div class="echart"  ref="chart" :style="{height: '300px'}" style="width: 350px;margin:-150px auto 0;border-radius: 10px;">
			
		</div>
		<div class="defen">
			<p>数字化成熟度水平阶段</p>
			<div>
				<p>我的得分{{info.score}}分：{{info.title}}</p>
				<p>{{info.comment}}</p>
			</div>
		</div>
		<button @click="share">分享给朋友</button>
		<div class="model" v-show="showmodel==true">
			<div>
				<img src="../assets/images/pic_chenggong.png"/>
				<p>链接已复制</p>
				<span>快去分享给你的好友吧！</span>
				<p @click="closemodel">我知道了</p>
			</div>
		</div>
	</div>
	
</template>
 
<script>
import echarts from 'echarts'
	export default {
	  name: 'HelloWorld',
	  data () {
	    return {
	    	showmodel:false,
	    	info:'',
	    	code_id:'',
	    }
	  },
	  created(){
	    this.uid=this.$route.query.uid;
		   this.code_id=this.$route.query.code_id;
	  },
	  　  mounted () {
//		　　this.initCharts(data);
		 
		   	this.getdata();
		　},
	  methods: {
		  	getdata(){
		  	let _this=this;
		  		$.ajax({
				 	dataType:"json", 
				 	type:"post",
				 	url:this.testUrl,
				 	data:{
				 		action:'Questionnaire/radar_chart',
						uid:this.$route.query.uid,
						code_id: this.$route.query.code_id,
				 	},
				 	success:function(res){
				 		_this.info=res.data.info;
				 		var data1=res.data.menu;
				 		var maxattr=[];
				 		var valueattr=[];
				 		for(var i=0;i<data1.length;i++){
				 			maxattr.push(data1[i].max);
				 			valueattr.push(data1[i].value)
				 		}
				 		console.log(data1)
						　_this.initCharts(data1,maxattr,valueattr);
						
			       
			         },          
			         error:function(){
			           _this.$message.error('网络错误！'); 
			         }
				 });	
		  	},
		　　initCharts (data,maxattr,valueattr) {
		　　let myChart = this.$echarts.init(this.$refs.chart);
//		　　console.log(this.$refs.chart)
		　　// 绘制图表
		　　myChart.setOption({backgroundColor:"#FFF",
		
            radar: {
              name: {
                textStyle: {
                  color: '#000524',
                },
                 formatter: function(text){
                             var strlength = text.length;
                             if(strlength % 4 == 1){
                                 text = text.replace(/\S{4}/g,function(match){
                                     console.log(match);
                                     return match + '\n'
                                 })
                             }else{
                                text = text.replace(/\S{4}/g,function(match){
                                     console.log(match);
                                     return match + '\n'
                                 })
                                 strlength = text.length;
                                 text = text.substring(0,strlength - 1);
                             }
                             return text
                         },
              },
              splitArea: {
                areaStyle: {
                  color: ['#fff', '#fff', '#fff', '#fff'],
                  shadowColor: 'rgba(0, 100, 0, 0.3)'
                }
              },
            radius:95,
//              center:['50%','50%'], 
              indicator: data,
              splitLine : {
		            show : true,
		            lineStyle : {
		                width : 1,
		                color : '#0A75DA', // 设置网格的颜色
		            },
		        },
            },
            

            series: [{
            	 
              type: 'radar',
              data: [
                {
                  value: valueattr,
                  name: 'DATA',
                   label: {
                        normal: {
                            show: true,
                            color:'#000524',
                            formatter:function(params) {
                            	var list=maxattr;
//                        	console.log(params)
                                return ((params.value/list[params.dimensionIndex])* 100).toFixed(2) + '%';
                            }
                        }
                   },
                  itemStyle: {
                    normal: {
                      color: 'rgba(5, 128, 242, 0.5)',                    
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: '#37A2DA'
                    }
                  },

                }
              ]
            }]
          });
		},
		share(){
			this.showmodel=true;
			this.$copyText('http://120.27.3.220:8000/gld/selftest?codeid='+this.code_id).then((e) => {
			      // success
			      console.log(e);
			  }, (e) => {
			      // fail
			      console.log(e);
			  });
		},
		closemodel(){
			this.showmodel=false;
		}
	 },
		
}
</script>

<style scoped>
h3{
	font-size:40px;
	font-family:PingFang SC;
	font-weight:800;
	color: #FFFFFF;
	margin: 50px 0;
}
.result{
	height: 100vh;
	width: 100%;	
	background: #F6F6F6;
	z-index: -1;
}
.head{
	width: 100%;
	 height:450px;
	 background: #0236A4;
	 overflow: hidden;
}
.echart{
	width:100%;
/*	height: auto;*/
position: relative;

}
.defen{
	width:702px;
	height:320px;
	background:rgba(255,255,255,1);
	border-radius:10px;
	margin:40px auto;
}
.defen>p{
	font-size:24px;
	font-family:PingFang SC;
	font-weight:500;
	color:rgba(102,102,102,1);
	border-bottom: 1px solid #eee;
	padding: 20px 0;
}
.defen>div>p{
	text-align: left;
	font-size:28px;
	color:rgba(51,51,51,1);
	margin:20px;
}
.defen>div>p:nth-child(1){
	color: #0236A4;
}
button{
	width:245px;
	height:86px;
	background:rgba(248,150,10,1);
	border:2px solid rgba(0,5,36,1);
	border-radius:14px;
	font-size:36px;
	color: #FFFFFF;
	line-height: 86px;
}
.model{
	height: 100vh;
	width: 100%;
	background:rgba(0,0,0,0.4);
	position: absolute;
	top: 0;
	left: 0;	
}
.model>div{
	background: #FFFFFF;
	width:456px;
	border-radius:20px;
	height:422px;
	position: absolute;
	top: 50%;
	margin-top: -211px;
	left: 50%;
	margin-left: -228px;
}
.model>div>img{
	width: 90px;
	height: 90px;
	margin: 40px 0;
}
.model>div>p{
	font-size:32px;
	font-family:PingFang SC;
	font-weight:bold;
}
.model>div>span{
	font-size:24px;
	font-family:PingFang SC;
	font-weight:500;
	color:rgba(153,153,153,1);
	display: inline-block;
	margin: 30px 0;
}
.model>div>p:nth-child(4){
	width: 100%;
	position: absolute;
	bottom: 0;
	border-top: 1px solid #eee;
	height: 100px;
	line-height: 100px;
	color: #0236A4;
}	
</style>