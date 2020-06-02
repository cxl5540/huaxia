<template>
	<div class="kline">
		<mt-navbar v-model="selected">
		    <mt-tab-item id="1">{{$store.state.lg=='C'?'分时':'Timesharing'}}</mt-tab-item>
		    <mt-tab-item id="2">{{$store.state.lg=='C'?'15分':'15 minutes'}}</mt-tab-item>
          <mt-tab-item id="5">{{$store.state.lg=='C'?'30分':'30 minutes'}}</mt-tab-item>
		    <mt-tab-item id="3">{{$store.state.lg=='C'?'1小时':'An hour'}}</mt-tab-item>
	        <mt-tab-item id="4">{{$store.state.lg=='C'?'日k ':'Day'}}</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  		<div id="echartContainermin" ref="echartContainermin"  style="width:100%; height:400px"></div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	 <div id="echartContainerdate" ref="echartContainerdate"  style="width:100%; height:400px"></div>
		  </mt-tab-container-item>
      <mt-tab-container-item id="5">
       <div id="echartContainer30" ref="echartContainer30"  style="width:100%; height:400px"></div>
      </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		  		<div id="echartContainerweek" ref="echartContainerweek"  style="width:100%; height:400px"></div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="4">
		  	 <div id="echartContainermonth" ref="echartContainermonth"  style="width:100%; height:400px"></div>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import echarts from "echarts";
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
    	selected:'1',
    	 option: null,
    	 mindata:'',
    	 myChart1:'',
    	 myChart2:'',
    	 myChart3:'',
    	 myChart4:'',
        myChart5:'',
    	 ftimeArr:'',
		 ftimeArr60:'',
    	 timer:'',
       nowtime:this.$store.state.lg=='C'?'时间:':'  Time:',
       nowprice:this.$store.state.lg=='C'?'当前价:':'Last:',
       nownum:this.$store.state.lg=='C'?'交易量:':'Vol:',
       edate:this.$store.state.lg=='C'?'时间:':'Date:',
       eopen:this.$store.state.lg=='C'?'开盘:':'Open:',
       eclose:this.$store.state.lg=='C'?'收盘:':'Colse:',
       elow:this.$store.state.lg=='C'?'最低:':'Low:',
       ehigh:this.$store.state.lg=='C'?'最高:':'High:',
		 a:5,
     b:30,

    }
  },

  created(){
  	 this.time_arr();
	 // this.time_arr60();
	// this.getKLineMinute()

  },
  watch: {
    selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
       if(val==1){  //5分钟
          this.a=5;
           this.time_arr();
        	this.getKLineMinute()
        }else if(val==2){  //15分钟

			this.a=15;
      this.time_arr();
			this.getKLineMinute();
        }else if(val==3){  //60分钟
        // this.b=60;
        // this.aaaaa(val);
       this.time_arr60()
			this.getKLineMinute60(val)
        }else if(val==4){  //一天
			this.getKLineHour();
        }else if(val==5){//30分钟
          // this.b=30;
          // this.aaaaa(val);
           this.time_arr60()
         this.getKLineMinute60(val)
        }
       }
    },
  mounted(){
     this.getKLineMinute();
	   // this.timer = setInterval(() => {
    //             this.getKLineMinute();
    //        }, 5000)
  },
   beforeDestroy() {
         clearInterval(this.timer);
   },
  methods:{
  addTimeStr(time,num){   //计算时间
		  var hour=time.split(':')[0];
		  var mins=Number(time.split(':')[1]);
		  var mins_un=parseInt((mins+num)/60);
		  var hour_un=parseInt((Number(hour)+mins_un)/24);
		  if(mins_un>0){
		    if(hour_un>0){
		      var tmpVal=((Number(hour)+mins_un)%24)+"";
		      hour=tmpVal.length>1? tmpVal:'0'+tmpVal;//判断是否是一位
		    }else{
		      var tmpVal=Number(hour)+mins_un+"";
		      hour=tmpVal.length>1? tmpVal:'0'+tmpVal;
		    }
		    var tmpMinsVal=((mins+num)%60)+"";
		    mins=tmpMinsVal.length>1? tmpMinsVal:0+tmpMinsVal;//分钟数为 取余60的数
		  }else{
		    var tmpMinsVal=mins+num+"";
		    mins=tmpMinsVal.length>1? tmpMinsVal:'0'+tmpMinsVal;//不大于整除60
		  }
		  return hour+":"+mins;
		},
		  getNextTime(startTime, endTIme, offset, resultArr) {//计算时间
		    var result = this.addTimeStr(startTime, offset);
		    resultArr.push(result);
		    if (result == endTIme) {
		      return resultArr;
		    } else {
		      return this.getNextTime(result, endTIme, offset, resultArr);
		    }
		  },
		  time_arr(){ //计算时间
		  	if(this.$route.query.productCode=='COMEXGC'){    //没黄金
		  		 var timeArr = new Array();
			      timeArr.push('07:00');
			      timeArr.concat(this.getNextTime('07:00', '23:45', this.a, timeArr));
			      timeArr.push('00:00');
			      timeArr.concat(this.getNextTime('00:00', '04:15',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}else if(this.$route.query.productCode=='NYMEXCL' || this.$route.query.productCode=='NYMEXNG'
        || this.$route.query.productCode=='COMEXSI'|| this.$route.query.productCode=='COPPER'|| this.$route.query.productCode=='CMENQ'
        || this.$route.query.productCode=='SZ161125' || this.$route.query.productCode=='USA30'|| this.$route.query.productCode=='AUDCAD'
        || this.$route.query.productCode=='GBPAUD' || this.$route.query.productCode=='CMEEC'|| this.$route.query.productCode=='SPX500'){

          //美原油,天然气，美白银，黄铜，纳斯达克指数，标普500，道琼斯指数，澳元，英镑，欧元
		  		 var timeArr = new Array();
			      timeArr.push('06:00');
			      timeArr.concat(this.getNextTime('06:00', '23:45',this.a, timeArr));
			      timeArr.push('00:00');
			      timeArr.concat(this.getNextTime('00:00', '05:00',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}else if(this.$route.query.productCode=='BTC'||this.$route.query.productCode=='ETH'||this.$route.query.productCode=='EOS'||this.$route.query.productCode=='LTC'){
              var timeArr = new Array();
              timeArr.push('00:00');
              timeArr.concat(this.getNextTime('00:00', '23:45',this.a, timeArr));
              this.ftimeArr=timeArr;
        }else if(this.$route.query.productCode=='CFFEXIF'){  //沪深
		  		 var timeArr = new Array();
           if(this.b=30){
             timeArr.push('09:30');
             timeArr.concat(this.getNextTime('09:30', '23:30',this.b, timeArr));
           }else{
             timeArr.push('10:00');
             timeArr.concat(this.getNextTime('10:00', '23:00',this.b, timeArr));
           }
		  		 // timeArr.push('09:30');
			    //   timeArr.concat(this.getNextTime('09:30', '11:15',this.a, timeArr));
			    //   timeArr.push('13:00');
			    //   timeArr.concat(this.getNextTime('13:00', '15:15',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}else if(this.$route.query.productCode=='EUREXDAX'){  //德国DAX指数   FDAX
		  		 var timeArr = new Array();
		  		 timeArr.push('08:15');
			      timeArr.concat(this.getNextTime('08:15', '23:45',this.a, timeArr));
			      timeArr.push('00:00');
			      timeArr.concat(this.getNextTime('00:00', '04:15',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}else{      //恒生
		  		 var timeArr = new Array();
		  		   timeArr.push('09:15');
			       timeArr.concat(this.getNextTime('09:15', '12:00',this.a, timeArr));
			       timeArr.push('13:00');
			       timeArr.concat(this.getNextTime('13:00', '16:30',this.a, timeArr));
			        timeArr.push('17:15');
			       timeArr.concat(this.getNextTime('17:15', '23:45',this.a, timeArr));
			        timeArr.push('00:00');
			       timeArr.concat(this.getNextTime('00:00', '03:00',this.a, timeArr));
			      this.ftimeArr=timeArr;
		  	}
		  },
		  time_arr60(){ //计算时间
		  	if(this.$route.query.productCode=='COMEXGC'){    //没黄金
		  		 var timeArr = new Array();
            timeArr.push('07:00');
            timeArr.concat(this.getNextTime('07:00', '23:00',this.b, timeArr));
            timeArr.push('00:00');
            timeArr.concat(this.getNextTime('00:00', '04:00',this.b, timeArr));
            this.ftimeArr60=timeArr;
		  	}else if(this.$route.query.productCode=='NYMEXCL' || this.$route.query.productCode=='NYMEXNG'|| this.$route.query.productCode=='COMEXSI'
        || this.$route.query.productCode=='COPPER'|| this.$route.query.productCode=='CMENQ'
        || this.$route.query.productCode=='SZ161125'|| this.$route.query.productCode=='USA30'|| this.$route.query.productCode=='AUDCAD'
        || this.$route.query.productCode=='GBPAUD'|| this.$route.query.productCode=='CMEEC'|| this.$route.query.productCode=='SPX500'){
              //美原油，天然气，美白银，黄铜，纳斯达克指数，标普500，道琼斯指数，澳元，英镑，欧元
          var timeArr = new Array();
          timeArr.push('06:00');
          timeArr.concat(this.getNextTime('06:00', '23:00',this.b, timeArr));
          timeArr.push('00:00');
          timeArr.concat(this.getNextTime('00:00', '04:00',this.b, timeArr));
          this.ftimeArr60=timeArr;
		  	}else if(this.$route.query.productCode=='BTC'||this.$route.query.productCode=='ETH'||this.$route.query.productCode=='EOS'||this.$route.query.productCode=='LTC'){
          var timeArr = new Array();
          timeArr.push('00:00');
          timeArr.concat(this.getNextTime('00:00', '23:00',this.b, timeArr));
          this.ftimeArr60=timeArr;
        }else if(this.$route.query.productCode=='CFFEXIF'){  //沪深
		  		 var timeArr = new Array();
           if(this.b=30){
             timeArr.push('09:30');
             timeArr.concat(this.getNextTime('09:30', '23:30',this.b, timeArr));
           }else{
             timeArr.push('10:00');
             timeArr.concat(this.getNextTime('10:00', '23:00',this.b, timeArr));
           }
		  		 // timeArr.push('10:00');
       //    timeArr.concat(this.getNextTime('10:00', '11:00',this.b, timeArr));
       //    timeArr.push('13:00');
       //    timeArr.concat(this.getNextTime('13:00', '15:00',this.b, timeArr));
          this.ftimeArr60=timeArr;
		  	}else if(this.$route.query.productCode=='CFFEXIF'){  //德国DAX指数   FDAX
		  		var timeArr = new Array();
		  		timeArr.push('08:00');
          timeArr.concat(this.getNextTime('08:00', '24:00',this.b, timeArr));
          timeArr.push('00:00');
          timeArr.concat(this.getNextTime('00:00', '04:00',this.b, timeArr));
          this.ftimeArr60=timeArr;
		  	}else if(this.$route.query.productCode=='EUREXDAX'&&this.b==30){  //德国  FDAX
		  		 var timeArr = new Array();
		  		 timeArr.push('08:30');
		  		 timeArr.concat(this.getNextTime('08:30', '23:30',this.b, timeArr));
		  		 timeArr.push('00:00');
		  		 timeArr.concat(this.getNextTime('00:00', '04:00',this.b, timeArr));
			      this.ftimeArr60=timeArr;

		  	}else if(this.$route.query.productCode=='EUREXDAX'&&this.b==60){  //德国  FDAX
		  		 var timeArr = new Array();
		  		 timeArr.push('09:00');
		  		 timeArr.concat(this.getNextTime('09:00', '23:00',this.b, timeArr));
		  		 timeArr.push('00:00');
		  		 timeArr.concat(this.getNextTime('00:00', '04:00',this.b, timeArr));
			      this.ftimeArr60=timeArr;

		  	}else{      //恒生
		  		 var timeArr = new Array();
           if(this.b=30){
             timeArr.push('09:30');
             timeArr.concat(this.getNextTime('09:30', '23:30',this.b, timeArr));
           }else{
             timeArr.push('10:00');
             timeArr.concat(this.getNextTime('10:00', '23:00',this.b, timeArr));
           }

           // timeArr.push('13:00');
           // timeArr.concat(this.getNextTime('13:00', '17:00',this.b, timeArr));
           // timeArr.push('17:00');
           // timeArr.concat(this.getNextTime('17:00', '23:00',this.b, timeArr));
           // timeArr.push('00:00');
           // timeArr.concat(this.getNextTime('00:00', '03:00',this.b, timeArr));
           this.ftimeArr60=timeArr;
		  	}
		  },
  getKLineMinute(){  //获取5、15分时线
  let url='';
  if(this.a==5){
	  url=this.testUrl+'product/getKLineMinute'
  }else if(this.a==15){
	   url=this.testUrl+'product/getKLineFifteenMinute'
  }
      let data={
        productCode:this.$route.query.productCode,
      }
      let _this=this;
       $.ajax({
         url:url,
          dataType:"json",   
          data:data,    //参数值
          type:"get",   //请求方式
          success:function(res){
            if(res.code==200){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let close_px=[];
             let avg_px=[];
             let volume=[];
              for(let p of res.data){
            	p.D=p.D.split(':')[0]+':'+p.D.split(':')[1];
            	p.D=p.D.split(' ')[1]
                     categoryData.push(p.D)  //拆分' ' 去掉分时
                     close_px.push({'value':Number(p.C).toFixed(2),'volume':p.V});
//                   volume.push(p.V);
                     volume.push({'value':p.V,'close':p.C,'yclose':p.VC,})
                   }
     var dataattr=[];
     _this.$store.state.lg=='C'?dataattr[0]='当前价':dataattr[0]='Last';
     var option = {
       color: ['#1E90FF'],
       backgroundColor: '#fff',
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
         formatter:function(res){
         	if(res.length&&res[0].seriesType=='line'){
         		return _this.nowtime+ res[0].axisValue+ '<br/>' +
                 _this.nowprice + res[0].data.value + '<br/>' +
                 _this.nownum + res[0].data.volume + '<br/>'
         	}else{
         		return  _this.nowtime+ res[0].axisValue+ '<br/>' +
         					 _this.nowprice+ res[0].data.close + '<br/>' +
         		        _this.nownum+ res[0].data.value + '<br/>'
         	}
           }
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100


        },
        {
          show: false,
          type: "slider",
//     y: "90%",
          start:0,
          end: 100
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 0,
          end: 100
        },
      ],

        legend: {
        top: 10,
        data:dataattr,
        textStyle: {
          fontSize: 12,
          color: '#1E90FF'
        },
    },
      grid: [
        {
          left: "3%",
          top: "3%",
          height: "50%"
        },
        {
          left: "1%",
          right: "10%",
          top: "54%",
          height: "10%"
        }
      ],
      xAxis: [

        {
          data: _this.ftimeArr,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },
        splitNumber: 100
        },
        {
          gridIndex: 1,
          data:_this.ftimeArr,
          axisLabel: {
            show: false,

           }
        }
      ],

      yAxis: [
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },

          },
          position: "right",

        },

        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
              widith:1
            }
          },
          position: "right"
        }
      ],
      series: [
        {
          name:dataattr[0],
          type: "line",
          data: close_px,
          smooth: false,
           showSymbol: false,
          lineStyle: {
            normal: {
					opacity: 0.8,
					color: '#39afe6',
					width: 1
				}
          },
          areaStyle: {
                normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 136, 212, 0.7)'
						}, {
							offset: 0.8,
							color: 'rgba(0, 136, 212, 0.02)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowBlur: 10
					}
                }
        },
        {
          name: '成交量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volume,
          itemStyle: {
              normal: {
	            color: function(params) {
	                var colorList;
	               if (params.data.close-params.data.yclose >0) {
	                  colorList = "#FD1050";
	                } else {
	                  colorList = "#00da3c";
	                }
	                return colorList;
	              }
	            }
          },

        },
        ]
    }
	if(_this.a==5){
		_this.myChart1 = echarts.init(_this.$refs.echartContainermin);
		 _this.myChart1.setOption(option);
	}else if(_this.a==15){
		_this.myChart2 = echarts.init(_this.$refs.echartContainerdate);
		 _this.myChart2.setOption(option);
	}

            }else if(res.code==402){
               _this.$toast.error(res.msg);
            }else if(res.code==401){
               _this.$toast.error(res.msg);
            }
          },
          error:function(){
          
          }
      });
   },
   getKLineMinute60(val){  //获取1小时时线
   let url='';
   val==3?url=this.testUrl+'product/getKLineHourMinute':url=this.testUrl+'product/getKLine30Minute'
       // let url=this.testUrl+'product/getKLineHourMinute'
         let data={
           productCode:this.$route.query.productCode,
         }
         let _this=this;
          $.ajax({
            url:url,
             dataType:"json",   
             data:data,    //参数值
             type:"get",   //请求方式
             success:function(res){
               if(res.code==200){
               _this.mindata=res.data;
                let categoryData = [];
                let values = [];
                let close_px=[];
                let avg_px=[];
                let volume=[];
                 for(let p of res.data){
               	p.D=p.D.split(':')[0]+':'+p.D.split(':')[1];
               	p.D=p.D.split(' ')[1]
                        categoryData.push(p.D)  //拆分' ' 去掉分时
                        close_px.push({'value':Number(p.C).toFixed(2),'volume':p.V});
   //                   volume.push(p.V);
                        volume.push({'value':p.V,'close':p.C,'yclose':p.VC,})
                      }

    var dataattr=[];
     _this.$store.state.lg=='C'?dataattr[0]='当前价':dataattr[0]='Last';
        var option = {
          color: ['#1E90FF'],
          backgroundColor: '#fff',
         tooltip: {
           trigger: "axis",
           axisPointer: {
             type: "cross"
           },
            formatter:function(res){
            	if(res.length&&res[0].seriesType=='line'){
            		return _this.nowtime+ res[0].axisValue+ '<br/>' +
                    _this.nowprice + res[0].data.value + '<br/>' +
                     _this.nownum + res[0].data.volume + '<br/>'
            	}else{
            		return   _this.nowtime+ res[0].axisValue+ '<br/>' +
            					 _this.nowprice + res[0].data.close + '<br/>' +
            		         _this.nownum + res[0].data.value + '<br/>'
            	}
              }
         },
         dataZoom: [
           {
             type: "inside",
             start: 0,
             end: 100


           },
           {
             show: false,
             type: "slider",
   //     y: "90%",
             start:0,
             end: 100
           },
           {
             show: false,
             xAxisIndex: [0, 1],
             type: "slider",
             start: 0,
             end: 100
           },
         ],

           legend: {
           top: 10,
           data:dataattr,
           textStyle: {
             fontSize: 12,
             color: '#1E90FF'
           },
       },
         grid: [
           {
             left: "3%",
             top: "3%",
             height: "50%"
           },
           {
             left: "1%",
             right: "10%",
             top: "54%",
             height: "10%"
           }
         ],
         xAxis: [

           {
             data: _this.ftimeArr60,
             scale: true,
             boundaryGap: false,
             axisLine: { lineStyle: { color: '#8392A5' } },
             splitLine: {
               show: false
             },
           splitNumber: 100
           },
           {
             gridIndex: 1,
             data:_this.ftimeArr60,
             axisLabel: {
               show: false,

              }
           }
         ],

         yAxis: [
           {
             scale: true,
             splitArea: {
               show: false,
             },
              splitLine: {
               show: true
             },
             axisLine: {
               lineStyle: {
                 color: "#8392A5"
               },

             },
             position: "right",

           },

           {
             gridIndex: 1,
             splitNumber: 3,
             axisLine: { onZero: false },
             axisTick: { show: false },
             splitLine: { show: false },
             axisLabel: { show: true },
             axisLine: {
               lineStyle: {
                 color: "#8392A5",
                 widith:1
               }
             },
             position: "right"
           }
         ],
         series: [
           {
             name: dataattr[0],
             type: "line",
             data: close_px,
             smooth: false,
              showSymbol: false,
             lineStyle: {
               normal: {
   					opacity: 0.8,
   					color: '#39afe6',
   					width: 1
   				}
             },
             areaStyle: {
                   normal: {
   						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
   							offset: 0,
   							color: 'rgba(0, 136, 212, 0.7)'
   						}, {
   							offset: 0.8,
   							color: 'rgba(0, 136, 212, 0.02)'
   						}], false),
   						shadowColor: 'rgba(0, 0, 0, 0.1)',
   						shadowBlur: 10
   					}
                   }
           },
           {
             name: '成交量',
             type: 'bar',
             xAxisIndex: 1,
             yAxisIndex: 1,
             data: volume,
             itemStyle: {
                 normal: {
   	            color: function(params) {
   	                var colorList;
   	               if (params.data.close-params.data.yclose >0) {
   	                  colorList = "#FD1050";
   	                } else {
   	                  colorList = "#00da3c";
   	                }
   	                return colorList;
   	              }
   	            }
             },

           },
           ]
       }
       if(val==3){
         _this.myChart3 = echarts.init(_this.$refs.echartContainerweek);
          _this.myChart3.setOption(option);
       }else{
         _this.myChart5 = echarts.init(_this.$refs.echartContainer30);
          _this.myChart5.setOption(option);
       }

               }else if(res.code==402){
                  _this.$toast.error(res.msg);
               }else if(res.code==401){
                  _this.$toast.error(res.msg);
               }
             },
             error:function(){
             
             }
         });
      },
   getKLineHour(){  //获取日线
    let url=this.testUrl+'/product/getKLineHour'
      let data={
        productCode:this.$route.query.productCode,
      }
      let _this=this;
       $.ajax({
         url:url,
          dataType:"json",   
          data:data,    //参数值
          type:"get",   //请求方式
          success:function(res){
            if(res.code==200){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let close_px=[];
             let avg_px=[];
             let volume=[];
              for(let p of res.data){
              	p.D=p.D.split(' ')[0]
                     categoryData.push(p.D)  //拆分' ' 去掉分时
                     close_px.push(Number(p.C).toFixed(2));
                      values.push([p.O,p.C,p.L,p.H,p.V]);
                      volume.push({'value':p.V,'close':p.C,'yclose':p.VC})
                   }
     function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += values[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            }
     var option = {
       color: ['#1E90FF','red','green','yellow'],
       backgroundColor: '#fff',
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },

      },
        legend: {
        top: 10,
        data: ['日k','MA5', 'MA10','MA20'],
        textStyle: {
          fontSize: 12,
          color: ['#1E90FF','red','green','yellow'],
        },
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
         formatter:function(res){
                  if(res.length==1){
                    return _this.nownum+res[0].value;
                   } else{
                      return _this.edate+ res[0].axisValue + '<br/>' +
                    _this.eopen + res[0].data[1] + '<br/>' +
                    _this.eclose + res[0].data[2] + '<br/>' +
                     _this.elow + res[0].data[3] + '<br/>' +
                     _this.ehigh + res[0].data[4] + '<br/>' +
                     _this.nownum + res[0].data[5] + '<br/>' +
                    (res[1] && res[1].data!== '-'? res[1].seriesName + '：' + res[1].data.toFixed(2) + '<br/>' : '') +
                    (res[2] && res[2].data!== '-'? res[2].seriesName + '：' + res[2].data.toFixed(2) + '<br/>' : '') +
                    (res[3] && res[3].data!== '-'? res[3].seriesName + '：' + res[3].data.toFixed(2) + '<br/>' : '')
                   }
            }
      },
     dataZoom: [
        {
          type: "inside",
          start: 50,
          end: 100
        },
        {
          show: false,
          type: "slider",
       y: "90%",
          start:50,
          end: 100
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 50,
          end: 100
        },
      ],
      grid: [
        {
          left: "3%",
          top: "3%",
          height: "50%"
        },
        {
          left: "1%",
          right: "10%",
          top: "54%",
          height: "10%"
        }
      ],
      xAxis: [
        {
          data: categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },

        splitNumber: 100
        },
        {
          gridIndex: 1,
          data:categoryData,
          axisLabel: {
            show: false,

           }
        }
      ],

      yAxis: [
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },

          },
          position: "right",

        },

        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
            }
          },
          position: "right"
        }
      ],
      series: [
        {
          name: "日K",
          type: "candlestick",
          data:values,
          itemStyle: {
                normal: {
                     color: '#FD1050',
                    color0: '#00da3c',
                    borderColor: '#FD1050',
                    borderColor0: '#00da3c'
                }
            },

          markLine: {
            silent: true,
            data: [
              {
                yAxis: 2222
              }
            ]
          }
        },
        {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            symbol: 'none',
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            symbol: 'none',
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
            name: 'MA20',
            type: 'line',
            symbol: 'none',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volume,
        itemStyle: {
            normal: {
	            color: function(params) {
	                var colorList;
	               if (params.data.close-params.data.yclose >0) {
	                  colorList = "#FD1050";
	                } else {
	                  colorList = "#00da3c";
	                }
	                return colorList;
	              }
	            }
	        },

	     },
        ],
    }
    _this.myChart4 = echarts.init(_this.$refs.echartContainermonth);
     _this.myChart4.setOption(option);
            }else if(res.code==402){
               _this.$toast.error(res.msg);
            }else if(res.code==401){
               _this.$toast.error(res.msg);
            }
          },
          error:function(){
          
          }
      });
    },
   aaaaa(val){  //获取日线
  let url='';
  val==3?url=this.testUrl+'product/getKLineHourMinute':url=this.testUrl+'product/getKLine30Minute';
       let data={
         productCode:this.$route.query.productCode,
       }
      let _this=this;
       $.ajax({
         url:url,
          dataType:"json",   
          data:data,    //参数值
          type:"get",   //请求方式
          success:function(res){
            if(res.code==200){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let close_px=[];
             let avg_px=[];
             let volume=[];
              for(let p of res.data){
              p.D=p.D.split(':')[0]+':'+p.D.split(':')[1];
              p.D=p.D.split(' ')[1]
                   categoryData.push(p.D)  //拆分' ' 去掉分时
                     close_px.push(Number(p.C).toFixed(2));
                      values.push([p.O,p.C,p.L,p.H,p.V]);
                      volume.push({'value':p.V,'close':p.C,'yclose':p.VC})
                   }
                   console.log(categoryData)
           function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += values[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            }
     var option = {
       color: ['#1E90FF','red','green','yellow'],
       backgroundColor: '#fff',
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },

      },
        legend: {
        top: 10,
        data: ['日k','MA5', 'MA10','MA20'],
        textStyle: {
          fontSize: 12,
          color: ['#1E90FF','red','green','yellow'],
        },
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
         formatter:function(res){
           console.log(res)
                  if(res.length==1){
                    return _this.nownum+res[0].value;
                   } else{
                      return _this.edate+ res[0].axisValue + '<br/>' +
                    _this.eopen + res[0].data[1] + '<br/>' +
                    _this.eclose + res[0].data[2] + '<br/>' +
                     _this.elow + res[0].data[3] + '<br/>' +
                     _this.ehigh + res[0].data[4] + '<br/>' +
                     _this.nownum + res[0].data[5] + '<br/>' +
                    (res[1] && res[1].data!== '-'? res[1].seriesName + '：' + res[1].data.toFixed(2) + '<br/>' : '') +
                    (res[2] && res[2].data!== '-'? res[2].seriesName + '：' + res[2].data.toFixed(2) + '<br/>' : '') +
                    (res[3] && res[3].data!== '-'? res[3].seriesName + '：' + res[3].data.toFixed(2) + '<br/>' : '')
                   }
            }
      },
     dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100
        },
        {
          show: false,
          type: "slider",
        y: "90%",
          start:0,
          end: 100
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 0,
          end: 100
        },
      ],
      grid: [
        {
          left: "3%",
          top: "3%",
          height: "50%"
        },
        {
          left: "1%",
          right: "10%",
          top: "54%",
          height: "10%"
        }
      ],
      xAxis: [
        {
          data: categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },

        splitNumber: 100
        },
        {
          gridIndex: 1,
          data:categoryData,
          axisLabel: {
            show: false,

           }
        }
      ],

      yAxis: [
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },

          },
          position: "right",

        },

        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
            }
          },
          position: "right"
        }
      ],
      series: [
        {
          name: "30",
          type: "candlestick",
          data:values,
          itemStyle: {
                normal: {
                     color: '#FD1050',
                    color0: '#00da3c',
                    borderColor: '#FD1050',
                    borderColor0: '#00da3c'
                }
            },

          markLine: {
            silent: true,
            data: [
              {
                yAxis: 2222
              }
            ]
          }
        },
        {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            symbol: 'none',
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            symbol: 'none',
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
            name: 'MA20',
            type: 'line',
            symbol: 'none',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
                normal: {
                	opacity: 0.5,
                	width: 1,
                }
            }
        },
        {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volume,
        itemStyle: {
            normal: {
              color: function(params) {
                  var colorList;
                 if (params.data.close-params.data.yclose >0) {
                    colorList = "#FD1050";
                  } else {
                    colorList = "#00da3c";
                  }
                  return colorList;
                }
              }
          },

       },
        ],
    }
  if(val==3){
    _this.myChart3 = echarts.init(_this.$refs.echartContainerweek);
     _this.myChart3.setOption(option);
  }else{
    _this.myChart5 = echarts.init(_this.$refs.echartContainer30);
     _this.myChart5.setOption(option);
  }
            }else if(res.code==402){
               _this.$toast.error(res.msg);
            }else if(res.code==401){
               _this.$toast.error(res.msg);
            }
          },
          error:function(){
          
          }
      });
    },


   }
  }
</script>

<style>
</style>
