//日期控件
function dateChoose() {
  var start = {
    elem: "#queryDate",
    format: "YYYY-MM-DD",
    min: "1900-01-01",
    max: "2099-06-16",
    istime: false,
    istoday: true,
    choose: function (datas) {
      end.min = datas;
      end.start = datas
    }
  };
  // var end = {
  //     elem: "#endDate",
  //     format: "YYYY-MM-DD",
  //     min: "1900-01-01",
  //     max: "2099-06-16",
  //     istime: false,
  //     istoday: true,
  //     choose: function (datas) {
  //         start.max = datas
  //     }
  // };
  // laydate(start);
  //	laydate(end);
}
//获取当前日期
function nowDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var thisDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
  $('#queryDate').val(thisDate);
  // $('#form-field-2').val(thisDate);
}
//获取昨日日期
function GetDay() {
  var today = new Date();
  var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;

  var yesterday = new Date();
  yesterday.setTime(yesterday_milliseconds);

  var strYear = yesterday.getFullYear();
  var strDay = yesterday.getDate();
  var strMonth = yesterday.getMonth() + 1;
  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay;
  }
  var strYesterday = strYear + "-" + strMonth + "-" + strDay;
  return strYesterday;
  //console.log(strYesterday);
}

function getLocalTime() { //获取上一周周一到周日的日期
  var today, ms, endms, thatDay, thatendDay, y, m, d, endDate;
  var now = new Date();
  var nowDayOfWeek = now.getDay();
  today = new Date().getTime();
  ms = today - (6 + nowDayOfWeek) * 24 * 60 * 60 * 1000;
  endms = today - nowDayOfWeek * 24 * 60 * 60 * 1000;
  thatDay = new Date(ms);
  thatendDay = new Date(endms);
  //	console.log(thatendDay)
  var y1 = thatDay.getFullYear();
  var m1 = thatDay.getMonth() + 1;
  var d1 = thatDay.getDate();
  var y2 = thatendDay.getFullYear();
  var m2 = thatendDay.getMonth() + 1;
  var d2 = thatendDay.getDate();

  var binDate = "" + y1 + "-" + formatDate1(m1) + "-" + formatDate1(d1);
  var endDate = "" + y2 + "-" + formatDate1(m2) + "-" + formatDate1(d2);
  var Week = {};
  Week.MStartDate = binDate;
  Week.MEndDate = endDate;
  return Week;
}

function formatDate1(date) {
  if (date < 10) {
    date = "0" + date;
  }
  return date;
}
var now = new Date();
var nowDay = now.getDate();
var nowMonth = now.getMonth();
var nowYear = now.getYear();
nowYear += (nowYear < 2000) ? 1900 : 0;
//console.log(nowYear);
function getMonthStartDate() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate2(monthStartDate);
}

function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

function getMonthEndDate() {
  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return formatDate2(monthEndDate);
}

function formatDate2(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
}

function getMonth() { //获取当前月
  var getMonth = {};
  getMonth.MStartDate = getMonthStartDate();
  getMonth.MEndDate = getDay();
  return getMonth;
}

//上月日期
var lastMonthDate = new Date();
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastMonth = lastMonthDate.getMonth();

//获取上个月
function getLastMonth() {
  var getMonth = {};
  getMonth.MStartDate = getLastMonthStartDate();
  getMonth.MEndDate = getLastMonthEndDate();
  return getMonth;
}
//获得上月开始时间
function getLastMonthStartDate() {
  var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
  return formatDate2(lastMonthStartDate);
}

//获得上月结束时间
function getLastMonthEndDate() {
  var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
  return formatDate2(lastMonthEndDate);
}

//获取本月至今为止的日期
function getDay() {
  var today, ms, thatDay, y1, m1, d1, endDate;
  today = new Date().getTime();
  thatDay = new Date(today);
  console.log(thatDay)
  y1 = thatDay.getFullYear();
  m1 = thatDay.getMonth() + 1;
  d1 = thatDay.getDate();
  var binDate = "" + y1 + "-" + formatDate1(m1) + "-" + formatDate1(d1);
  return binDate;
}

//千位分隔
function numFormat(num) {
  var res = parseInt(num).toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  });
  if (parseFloat(num) - parseInt(num) == 0) {
    return res;
  } else {
    var s = (parseFloat(num) - parseInt(num)).toFixed(2);
    return res + '.' + parseInt(s * 100);
  };
}
//千位分隔
function numFormats(str) {
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


}

//toFixed
function tofixP(value) {
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
}


//转换时间戳
function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D;
}
//转换时间戳--转换到天
function timestampToTimeDay(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return D;
}
//
function toFixed(num) {
  var num = (num * 100).toFixed(2)
  return num;
}

var Main = {
  'getLocalTime': getLocalTime,
  'getLastMonth': getLastMonth,
  'getMonth': getMonth,
  'timestampToTime': timestampToTime,
  'timestampToTimeDay': timestampToTimeDay,
  'nowDate': nowDate,
  'dateChoose': dateChoose,
  'numFormats': numFormats,
  'GetDay': GetDay,
  'tofixP': tofixP
}
export default Main
