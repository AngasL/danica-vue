/**
 * Created by rainyiwo on 2017/8/8.
 */

// const states = {
//   base: {
//     url: {
//       'jds': '2222',
//       'qds': '/api/zbs/butlerService/'
//     }
//   }
// }

import Main from '../assets/js/main.js'
const states = {
  base: {
    // url: '/api',
    url: 'https://wechat.megameta.cn/wang-server/',
    Code: '',
    token: '',
    queryDate: Main.GetDay(),
    queryDateR: Main.GetDay(),
    queryType: '00',
    shopType: '',
    turnoverType: '',
    brandId: '',
    brandIdR: '',
    marketId: '',
    operationId: '',
    shopId: '',
    userMenuList: [],
    brandName: '',
    marketName: '',
    operationName: '',
    shopName: '',
    codeis: "",
    brandId_R: '',
    brandId_RName: ''
  },
}

export default states
