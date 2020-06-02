import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 const state={//要设置的全局访问的state对象
     lg:'C',
     emsg:'网络错误',
     //要设置的初始属性值
   };
 const store = new Vuex.Store({
       state
    });

export default store;
