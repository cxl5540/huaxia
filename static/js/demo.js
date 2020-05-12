 GetQueryString(name) { 
 let reg = new RegExp("(^|\\?|&)" + 'id'+ "=([^&]*)(\\s|&|$)","i");
      if(reg.test(window.location.href)){
          let idstr=unescape(RegExp.$2.replace(/\+/g," "));
          let idar=idstr.split('#');
          let id=(idar[0]);
         this.id=id;
         console.log(id);
         console.log(this.id);

        }
  },
   formatTime(number,format) {         //日期时间格式化
    var formateArr  = ['Y','M','D','h','m','s'];  
    var returnArr   = [];     
    var date = new Date(number * 1000);  
    returnArr.push(date.getFullYear());  
    returnArr.push(this.formatNumber(date.getMonth() + 1));  
    returnArr.push(this.formatNumber(date.getDate()));      
    returnArr.push(this.formatNumber(date.getHours()));  
    returnArr.push(this.formatNumber(date.getMinutes()));  
    returnArr.push(this.formatNumber(date.getSeconds()));     
    for (var i in returnArr)  
    {  
      format = format.replace(formateArr[i], returnArr[i]);  
    }  
    return format;  
  }, 

  //数据转化  
  formatNumber(n) {  
    n = n.toString()  
    return n[1] ? n : '0' + n  
  },