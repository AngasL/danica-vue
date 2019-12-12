// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import store from './vuex/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {
  AlertPlugin,
  ToastPlugin,
  LoadingPlugin
} from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ElementUI);


FastClick.attach(document.body)

Vue.directive('bodyDefault', {
  bind(el, binding) {
    el.addEventListener("touchmove", function (e) {
      e.preventDefault()
    }, false)
  }
})
Vue.filter('capitalize', function (value) {
  if (value == 0) {
    // console.log(123)
    //return '0.00'
    return '0'
  }
  if (!value) return ''
  // console.log(value)

  // var value = Math.round(parseFloat(value) * 100) / 100;
  if (value > 0) {
    var value = Math.round(value);
    return value;
  }

  // if (value < 0) {
  // var value1 = Math.abs(value);
  // var value2 = Math.round(value1);
  // var value = '-' + value2;
  var value = '-' + Math.round(Math.abs(value));
  return value;

  // }

  // var xsd = value.toString().split(".");
  // // console.log(xsd)
  // if (xsd.length == 1) {
  //   value = value.toString() + ".00";
  //   return value;
  // }
  // if (xsd.length > 1) {
  //   if (xsd[1].length < 2) {
  //     value = value.toString() + "0";
  //   }
  //   return value;
  // }

})
Vue.filter('numformat1', function (str) {
  if (str == 0) {
    // console.log(123)
    return '0'
  }
  if (!str) return ''
  str = String(str);
  if (str.indexOf('.') >= 0) {
    var postfix = str.substring(str.indexOf('.'));
    str = str.substring(0, str.indexOf('.'));
  } else {
    var postfix = '';
  };
  var iNum = str.length % 3;
  var prev = '';
  var iNow = 0;
  var temp = '';
  var arr = [];
  if (iNum != 0) {
    prev = str.substring(0, iNum);
    arr.push(prev);
  }
  str = str.substring(iNum);
  for (var i = 0; i < str.length; i++) {
    iNow++;
    temp += str[i];
    if (iNow == 3 && temp) {
      arr.push(temp);
      temp = '';
      iNow = 0;
    }
  }
  return arr.join(',') + postfix
})

Vue.filter('tofixedTwo', function (value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
})

/*Vue.prototype.$formatCurrency = function (str) {
  // var m = parseFloat(n);
  // // return m.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  // return m.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  if (str == 0) {
    // console.log(123)
    return '0'
  }
  if (!str) return ''
  str = String(str);
  if (str.indexOf('.') >= 0) {
    var postfix = str.substring(str.indexOf('.'));
    str = str.substring(0, str.indexOf('.'));
  } else {
    var postfix = '';
  };
  var iNum = str.length % 3;
  var prev = '';
  var iNow = 0;
  var temp = '';
  var arr = [];
  if (iNum != 0) {
    prev = str.substring(0, iNum);
    arr.push(prev);
  }
  str = str.substring(iNum);
  for (var i = 0; i < str.length; i++) {
    iNow++;
    temp += str[i];
    if (iNow == 3 && temp) {
      arr.push(temp);
      temp = '';
      iNow = 0;
    }
  }
  return arr.join(',') + postfix
}*/

Vue.prototype.$formatCurrency = function (str) {
  str = String(str); //将数字转化为字符串			
  var strs, symbols = ''; //strs去掉正负号以后的字符串，symbols正负号			
  var Integer = str.split('.')[0]; //整数部分包括正负号
  //			console.log(Integer.split('-').length)			
  if (Integer.split('-').length > 1 || Integer.split('+').length > 1) { //判断Integer是否带有正负号,长度为2时候带有正负号				 
    strs = Integer.split('-')[1] || Integer.split('+')[1];
    //				 console.log('长度',Integer.split('-').length);				
    if (Integer.split('-').length == 1) { //判断是不是长度为1的数组，是的话就不是负号，否则是负号					
      symbols = '+'
    } else {
      symbols = '-'
    }
  } else {
    strs = Integer;
  };
  //			console.log('没有符号',strs)
  //			console.log(symbols)			
  var Decimal = str.split('.')[1]; //小数部分
  //			console.log(Decimal);			
  var IntegerReverse = strs.split('').reverse(); //整数转化成数组 再倒序排列
  //			console.log(IntegerReverse);			
  var NewArr = []; //申明一个空数组			
  for (var i = 0; i < IntegerReverse.length; i++) {
    NewArr.push(IntegerReverse[i]) //往新的数组中添加数字				
    if ((i + 1) % 3 == 0 && i != IntegerReverse.length - 1) { //如果当前i+1是3的倍数 同时满足IntegerReverse[i]不是IntegerReverse[length-1]					
      NewArr.push(',')
    }
  }
  var zs = NewArr.reverse().join(''); //反转数组再合并成字符串			
  var newStr = Decimal ? zs + '.' + Decimal : zs; //获得最终字符串			
  return symbols + newStr

}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
