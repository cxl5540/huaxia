import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Deal from '@/view/deal'
import News from '@/view/news'
import Mine from '@/view/mine'
import Moneydetail from '@/view/moneydetail'
import Dealdetail from '@/view/dealdetail'
import Dealrules from '@/view/dealrules'
import Setting from '@/view/setting'
import Login from '@/view/login'
import Register from '@/view/register'
import Agreement from '@/view/agreement'
import Forgetpass from '@/view/forgetpass'
import Changepass from '@/view/changepass'
import Changetel from '@/view/changetel'
import Prodetail from '@/view/prodetail'
import Buyin from '@/view/buyin'
import Surebuy from '@/view/surebuy'
import Selldetail from '@/view/selldetail'
import Dealagree from '@/view/dealagree'
import Carset from '@/view/carset'
import Cardsure from '@/view/cardsure'
import Rulesdetail from '@/view/rulesdetail'
import Addmoney from '@/view/addmoney'
import Home from '@/components/Home'
import question from '@/components/question'
import result from '@/components/result'
Vue.use(Router)

export default new Router({
  routes: [
  {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
      	title:'首页',
      }

    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta:{
      	title:'首页',
      }

    },
    {
      path: '/news',
      name: 'News',
      component: News,
      meta:{
      	title:'资讯'
      }
    },
    {
      path: '/deal',
      name: 'Deal',
      component: Deal,
      meta:{
      	title:'交易',
        // keepAlive:true,
      }
    },
    {
      path: '/moneydetail',
      name: 'Moneydetail',
      component: Moneydetail,
      meta:{
      	title:'出入金明细'
      }
    },
    {
      path: '/addmoney',
      name: 'Addmoney',
      component: Addmoney,
      meta:{
      	title:'充值提现'
      }
    },
    {
      path: '/dealdetail',
      name: 'Dealdetail',
      component: Dealdetail,
      meta:{
      	title:'交易明细'
      }
    },
    {
      path: '/dealrules',
      name: 'Dealrules',
      component: Dealrules,
      meta:{
      	title:'交易明细'
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta:{
      	title:'设置'
      }
    },
    {
      path: '/carset',
      name: 'Carset',
      component: Carset,
      meta:{
      	title:'银行卡设置'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
      	title:'登录'
      }
    },{
      path: '/forgetpass',
      name: 'Forgetpass',
      component: Forgetpass,
      meta:{
      	title:'忘记密码'
      }
    },
    {
      path: '/changepass',
      name: 'Changepass',
      component: Changepass,
      meta:{
      	title:'修改密码'
      }
    },
    {
      path: '/cardsure',
      name: 'Cardsure',
      component: Cardsure,
      meta:{
      	title:'银行卡设置'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{
      	title:'注册'
      }
    },
    {
      path: '/surebuy',
      name: 'Surebuy',
      component: Surebuy,
      meta:{
      	title:'确认买入'
      }
    },
    {
      path: '/selldetail',
      name: 'Selldetail',
      component: Selldetail,
      meta:{
      	title:'卖出详情'
      }
    },
    {
      path: '/changetel',
      name: 'Changetel',
      component: Changetel,
      meta:{
      	title:'修改手机号'
      }
    },
    {
      path: '/dealagree',
      name: 'Dealagree',
      component: Dealagree,
      meta:{
      	title:'交易协议'
      }
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement,
      meta:{
      	title:'用户协议'
      }
    },
    {
      path: '/rulesdetail',
      name: 'Rulesdetail',
      component: Rulesdetail,
      meta:{
      	title:'规则详情'
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta:{
      	title:'我的'
      }
    },
    {
      path: '/prodetail',
      name: 'Prodetail',
      component: Prodetail,
      meta:{
      	title:'产品详情'
      }
    },
    {
      path: '/buyin',
      name: 'Buyin',
      component: Buyin,
      meta:{
      	title:'买入'
      }
    },
    {
      path: '/question',
      name: 'question',
      component: question,

    },
    {
      path: '/result',
      name: 'result',
      component: result,

    },

  ]
})
