/**
 * Created by rainyiwo on 2017/8/8.
 */

import Vue from 'vue'
import vueResource from 'vue-resource'
import Md5 from '../assets/js/md5'
Vue.use(vueResource)

const actions = {
  httpGet({
    commit,
    state
  }, url, data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(url, {
        params: data,
        emulateJSON: true
      }).then(res => {
        resolve(res.body)
      }).catch(res => {
        reject(res)
      })
    })
  },
  httpPost({
    commit,
    state
  }, obj) {
    obj.data.data = JSON.stringify(obj.data.data)
    obj.data.token = sessionStorage.getItem('token')
    obj.data.stmb = new Date().getTime();
    var signData = encodeURIComponent(obj.data.data)
    // var signData = obj.data.data;
    var data1 = "data=" + signData + "&stmb=" + obj.data.stmb;
    obj.data.sign = Md5(data1).toUpperCase();
    return new Promise((resolve, reject) => {
      Vue.http.post(obj.url, obj.data, {
        emulateJSON: true
      }).then(res => {
        if (res.code == '1999') {
          //跳转登录页
        }
        resolve(res.body)

      }).catch(res => {
        reject(res)
      })
    })
  },
  httpLogin({
    commit,
    state
  }, obj) {
    obj.data.data = JSON.stringify(obj.data.data)
    return new Promise((resolve, reject) => {
      Vue.http.post(obj.url, obj.data, {
        emulateJSON: true
      }).then(res => {
        resolve(res.body)
      }).catch(res => {
        reject(res)
      })
    })
  },
  httpJsonp({
    commit,
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(obj.url, {
        params: obj.data,
        emulateJSON: true
      }).then(res => {
        resolve(res.body)
      }).catch(res => {
        reject(res)
      })
    })
  },
}

export default actions
