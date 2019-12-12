/**
 * Created by jince on 2018/4/9.
 */
//王品
const w_login = r => require.ensure([], () => r(require('@/pages/wowprime/login/index')), 'w_login')
const w_dataView = r => require.ensure([], () => r(require('@/pages/wowprime/dataView/dataView')), 'w_dataView')
const w_logins = r => require.ensure([], () => r(require('@/pages/wowprime/logins')), 'w_logins')
const w_report = r => require.ensure([], () => r(require('@/pages/wowprime/report/report')), 'w_report') //王品月报
const w_reportMonth = r => require.ensure([], () => r(require('@/pages/wowprime/report/reportMonth')), 'w_reportMonth') //王品月报单独入口month
const w_loginMonth = r => require.ensure([], () => r(require('@/pages/wowprime/login/loginMonth')), 'w_loginMonth') //月报登录页

//404
const routes = [{
    name: 'w_dataView',
    path: '/wowprime/w_dataView',
    component: w_dataView,
  },
  {
    name: 'w_report',
    path: '/wowprime/w_report',
    component: w_report,
  },
  {
    name: 'w_reportMonth',
    path: '/wowprime/w_reportMonth',
    component: w_reportMonth,
  },
  {
    name: 'w_login',
    path: '/wowprime/w_login',
    component: w_login,
  },
  {
    name: 'w_loginMonth',
    path: '/wowprime/w_loginMonth',
    component: w_loginMonth,
  },
  {
    name: 'w_logins',
    path: '/wowprime/w_logins',
    component: w_logins,
  },
  {
    path: '*',
    redirect: {
      name: 'w_logins'
    }
  }

]

export default routes
