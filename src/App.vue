<template>
  <div id="app">
  <div id="loading">
	  <div class="loading">
			        <div><span></span></div>
			        <div><span></span></div>
			        <div><span></span></div>
		</div>
  </div>
	
    <keep-alive>
       <router-view v-if='$route.meta.keepAlive'></router-view>
    </keep-alive><router-view v-if='!$route.meta.keepAlive'></router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
data () {
    return {
    	
    }
},

    methods:{
		  
  	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    padding: 0;
   margin: 0;
	background-size: cover;
	height: 100vh;
}

body{
  padding: 0;
   margin: 0;
}
a{
	text-decoration: none;
}
img{
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
}
button{
	outline:none !important;
	border: none;
}
button:focus{
    outline: 0 !important;
}
input:focus,textarea:focus{
    outline: 0 !important;
}
li{
	list-style:none;
}
ul{
	margin: 0;
	padding: 0;
}
h3,p{
	margin: 0;
}

#loading{
	 width: 100%;
	 height: 100vh;
	 background: rgba(0,0,0,.5);
	 position: absolute;
	 top: 0;
	 left: 0;
	 z-index: 999;
	 display: none;
}
.loading{
        width: 60px;
        height: 60px;
        margin: 0 auto;
        margin-top:500px;
        position: relative;
        -webkit-animation: load 3s linear infinite;
    }
    .loading div{
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .loading span{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #99CC66;
        position: absolute;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
        -webkit-animation: changeBgColor 3s ease infinite;
    }
    @-webkit-keyframes load{
        0%{
            -webkit-transform: rotate(0deg);
        }
        33.3%{
            -webkit-transform: rotate(120deg);
        }
        66.6%{
            -webkit-transform: rotate(240deg);
        }
        100%{
            -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes changeBgColor{
        0%,100%{
            background: #99CC66;
        }
        33.3%{
            background: #FFFF66;
        }
        66.6%{
            background: #FF6666;
        }
    }
    .loading div:nth-child(2){
        -webkit-transform: rotate(120deg);
    }
    .loading div:nth-child(3){
        -webkit-transform: rotate(240deg);
    }
    .loading div:nth-child(2) span{
        -webkit-animation-delay: 1s;
    }
    .loading div:nth-child(3) span{
        -webkit-animation-delay: 2s;
    }
 .header{
	height: 1.17rem;
	font-size: 0.48rem;
	color: #333333;
	background: #fff;
	line-height: 1.17rem;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 0.26rem;
	border-bottom: 1px solid #eee;
}
 .header img{
 	max-height: 0.4rem;
 	margin-right: 0.13rem;
 }
	.header>span{
		display: inline-block;
		/* width: 33%; */
	}
	.header>span:nth-child(1){
		text-align: left;
	}
	.header>span:nth-child(3){
		text-align: right;
	} 
.up{
	color: #EE4B43;
}
.down{
	color: #0BA293;
}
.bgup{
	background:#EE4B43 ;
	color: #fff;
		border: none;
}
.bgdown{
	background:#0BA293 ;
	color: #fff;
	border: none;
}
.bgline{
	background: #F1F1F1;
	width: 100%;
	height: 0.26rem;

}
.mint-swipe{
	height: 4rem;
}
.mint-tab-container-item{
	width: 100% !important; 
}
.mint-swipe, .mint-swipe-items-wrap{
	height:300px !important ;
}
.mint-radiolist-label{
	font-size: 32px !important;
	margin: 20px 0 !important;
}
.mint-msgbox-title{
	font-size: 36px !important;
}
.mint-msgbox-message{
	font-size:30px !important ;
	margin: 20px 0 !important;
}
.mint-msgbox-btns{
	padding: 18px 0 !important;
	
}
.mint-msgbox-btn,.invalid,.mint-msgbox-input input{
	font-size: 32px !important;
}
.mint-toast-text{
	font-size: 28px !important;
}

.mint-tab-item-label,.mint-msgbox-errormsg{
	font-size: 26px !important;	
}

</style>
