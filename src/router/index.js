import Vue from 'vue'
import Router from 'vue-router'
// 首页
import homePage from '../view/homePage.vue'
import homeView from '../view/--homeView.vue'
// 营销短信
import markSent from '../view/Market/markSent.vue'
import markSend from '../view/Market/markSend.vue'
import markNadopt from '../view/Market/markNadopt.vue'
import markHistory from '../view/Market/markHistory.vue'
import markTmp from '../view/Market/markTmp.vue'
import markUser from '../view/Market/markUser.vue'
import markUsergroup from '../view/Market/markUsergroup.vue'
// 短信商城
import smsConfirm from '../view/smsShop/smsConfirm.vue'
import smsShop from '../view/smsShop/smsShop.vue'
import smsPayFail from '../view/smsShop/smsPayFail.vue'
import smsPaySuccess from '../view/smsShop/smsPaySuccess.vue'
import smsPublicTransfer from '../view/smsShop/smsPublicTransfer.vue'
import smsHistory from '../view/smsShop/smsHistory.vue'
// 系统模块短信

import tmpInterfaceDocumentation from '../view/tmp/tmpInterfaceDocumentation.vue'
import tmpConfiguration from '../view/tmp/tmpConfiguration'
import tmpSendHistory from '../view/tmp/tmpSendHistory.vue'
import tmpStatus from '../view/tmp/tmpStatus.vue'
import tmpAdd from '../view/tmp/tmpAdd.vue'

// 用户中心
import userHistory from '../view/UserCenter/--userHistory.vue'
import userSafetyReminder from "../view/UserCenter/userSafetyReminder"
import userIPBinding from "../view/UserCenter/userIPBinding"
import userSignatureSettings from "../view/UserCenter/userSignatureSettings"
import userChangePassword from "../view/UserCenter/userChangePassword"
import userBasicInformation from "../view/UserCenter/userBasicInformation"
import userMonthlyBill from "../view/UserCenter/userMonthlyBill"

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {path: '/', name: 'homePage', component: homePage, meta: {menuId: '1'}},
    {path: '/homeView', name: 'homeView', component: homeView, meta: {menuId: '1'}},

    {path: '/markSent', name: 'markSent', component: markSent},
    {path: '/markSend', name: 'markSend', component: markSend},
    {path: '/markNadopt', name: 'markNadopt', component: markNadopt},
    {path: '/markHistory', name: 'markHistory', component: markHistory},
    {path: '/markTmp', name: 'markTmp', component: markTmp},
    {path: '/markUser', name: 'markUser', component: markUser},
    {path: '/markUsergroup', name: 'markUsergroup', component: markUsergroup},


    {path: '/tmpAdd', name: 'tmpAdd', component: tmpAdd, meta: {menuId: '3-1'}},
    {
      path: '/tmpInterfaceDocumentation',
      name: 'tmpInterfaceDocumentation',
      component: tmpInterfaceDocumentation,
      meta: {menuId: '3-2'}
    },
    {path: '/tmpConfiguration', name: 'tmpConfiguration', component: tmpConfiguration, meta: {menuId: '3-1'}},
    {path: '/tmpSendHistory', name: 'tmpSendHistory', component: tmpSendHistory, meta: {menuId: '3-3'}},
    {path: '/tmpStatus', name: 'tmpStatus', component: tmpStatus, meta: {menuId: '3-1'}},


    {path: '/smsShop', name: 'smsShop', component: smsShop, meta: {menuId: '4-1'}},
    {path: '/smsConfirm', name: 'smsConfirm', component: smsConfirm, meta: {menuId: '4-1'}},
    {path: '/smsPayFail', name: 'smsPayFail', component: smsPayFail, meta: {menuId: '4-1'}},
    {path: '/smsPaySuccess', name: 'smsPaySuccess', component: smsPaySuccess, meta: {menuId: '4-1'}},
    {path: '/smsPublicTransfer', name: 'smsPublicTransfer', component: smsPublicTransfer, meta: {menuId: '4-1'}},
    {path: '/smsHistory', name: 'smsHistory', component: smsHistory, meta: {menuId: '4-2'}},

    {
      path: '/userBasicInformation',
      name: 'userBasicInformation',
      component: userBasicInformation,
      meta: {menuId: '5-1'}
    },
    {path: '/userChangePassword', name: 'userChangePassword', component: userChangePassword, meta: {menuId: '5-2'}},
    {path: '/userSafetyReminder', name: 'userSafetyReminder', component: userSafetyReminder, meta: {menuId: '5-3'}},
    {path: '/userIPBinding', name: 'userIPBinding', component: userIPBinding, meta: {menuId: '5-4'}},
    {
      path: '/userSignatureSettings',
      name: 'userSignatureSettings',
      component: userSignatureSettings,
      meta: {menuId: '5-5'}
    },
    {path: '/userMonthlyBill', name: 'userMonthlyBill', component: userMonthlyBill, meta: {menuId: '5-6'}},
    {path: '/userHistory', name: 'userHistory', component: userHistory, meta: {menuId: '5-7'}},
  ]
});

export default router
