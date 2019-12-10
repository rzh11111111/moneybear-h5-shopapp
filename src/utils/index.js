// import local from '../store/localStorage'
import session from '../store/sessionStorage'
var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'

function padding(s, len) {
    let l = len - (s + '').length
    for (var i = 0; i < l; i++) {
        s = '0' + s
    }
    return s
}
export function isNull(arg1) //判断是否为null
{
    return !arg1 && arg1 !== 0 && typeof arg1 !== "boolean" ? true : false;
}
// 时间戳转换
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}
export function formNow (date) {
    
    let dur = new Date - new Date(format(date));
    let nowdur = new Date(format(date, 'yyyy/MM/dd hh:mm:ss'))
    let nowdur0= new Date(new Date().toLocaleDateString()).getTime()//当天0点
    // console.log(new Date,new Date(date),dur)
    // console.log(format(dur, "MM月dd日 hh:mm:ss"), dur, nowdur0)
    // console.log(new Date,new Date(format(date, 'yyyy/MM/dd hh:mm:ss')))
    if (dur < 60 * 1000) {
        return '刚刚'
    } else if (dur < 59 * 60 * 1000 ) {
        return format(dur, "mm")+'分钟前'
    } else if (new Date(format(date, 'yyyy/MM/dd hh:mm:ss'))-nowdur0>0) {
        return '今日'+format(nowdur, "hh:mm")
    }else if (new Date(format(date, 'yyyy/MM/dd hh:mm:ss'))-nowdur0+3600 * 1000 * 24>0) {
        return '昨天'+format(nowdur, "hh:mm")
    }else if (dur < 12 * 30 * 24 * 60 * 60 * 1000) {
        return format(nowdur, "MM/dd hh:mm")
    } else {
        return format(date)
    }
    // return {
    //     ((dur < 10 * 1000) && '刚刚') ||
    //    ( dur < 60 * 60 * 1000 && date) ||
    //     (dur < 24 * 60 * 60 * 1000 && '今天'+date )||
    //    ( dur < 48 * 60 * 60 * 1000 && '昨天'+date )||
    //     (dur < 12 * 30 * 24 * 60 * 60 * 1000 && '月时分秒'+date) || date
    // }
}

// 时间转换



export function format(date, pattern) {
    if (!date) {
        return '';
    }
    if (typeof (date) === 'string') {
        let s = '';
        if (/\./.test(date)) {
            let arr = date.split(' ');
            s = [arr[0], arr[1].split('.')[0]].join(' ');
        } else {
            s = date;
        }
        s = s.replace(/-|\./g, '/');
        date = new Date(s);
    } else if (typeof (date) === 'number') {
        date = new Date(date);
    }
    pattern = pattern || DEFAULT_PATTERN
    return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
            case 'y':
                return padding(date.getFullYear(), $0.length)
            case 'M':
                return padding(date.getMonth() + 1, $0.length)
            case 'd':
                return padding(date.getDate(), $0.length)
            case 'w':
                return date.getDay() + 1
            case 'h':
                return padding(date.getHours(), $0.length)
            case 'm':
                return padding(date.getMinutes(), $0.length)
            case 's':
                return padding(date.getSeconds(), $0.length)
        }
    })
}

export function limitInput(o) { // input只能输入1-10并且小数点后1位
    // Number()方法能保留小数点后的值,你用parseInt(),如果输入10.1，会变成10
    var value = Number(o.value)
    if (value < 1 || value > 10) {
        // alert('请输入1-10之间数字')
        o.value = ''
    } else {
        // 匹配1.0-10.0的数
        var reg = new RegExp(/^\d{1,2}(\.\d)?$/)
        if (reg.test(value)) {
            return true
        } else {
            // alert('输入错误！')
            return false
        }
    }
}
export function phonestar(phone) {
    if (!phone) {
        return '未知手机号'
    }
    let str2 = phone.substr(0, 3) + "****" + phone.substr(7);
    return str2
}
export function usernamestar(phone) {
    let str2 = "****" + phone.substr(-1, 4);
    return str2
}

// 价格过滤
const digitsRE = /(\d{3})(?=\d)/g
export function currency(value, currency, decimals) {
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    currency = currency != null ? currency : ''
    decimals = decimals != null ? decimals : 2
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals ?
        stringified.slice(0, -1 - decimals) :
        stringified
    var i = _int.length % 3
    var head = i > 0 ?
        (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) :
        ''
    var _float = decimals ?
        stringified.slice(-1 - decimals) :
        ''
    var sign = value < 0 ? '-' : ''
    return sign + currency + head +
        _int.slice(i).replace(digitsRE, function (val) {
            return val + ',';
        }) +
        _float
}


// keyRoot 为 父组件的 属性,valRoot为根节点的值，
// value 为显示的value label为显示的label
export function treeData(data, keyRoot, valRoot, value, label) {
    let data2 = [];
    if (typeof (valRoot) == 'string') {
        valRoot = [valRoot];
    }
    for (let i = 0; i < data.length; i++) {
        valRoot.map(v => {
            if (data[i][keyRoot] === v) {
                let item = Object.assign({}, data[i], {
                    id: data[i][value],
                    value: data[i][value],
                    label: data[i][label],
                    // disabled:true
                });
                if (value !== 'id') {
                    item.ids = data[i].id;
                }
                recursion(data, item, keyRoot, valRoot, value, label);
                data2.push(item);
            }
        })
    }
    return data2;
}
export function treeData2(data, keyRoot, valRoot, value, label) {
    let data2 = [];
    if (typeof (valRoot) == 'string') {
        valRoot = [valRoot];
    }
    for (let i = 0; i < data.length; i++) {
        valRoot.map(v => {
            if (data[i][keyRoot] === v) {
                let item = Object.assign({}, data[i], {
                    id: data[i][value],
                    value: data[i][value],
                    label: data[i][label],
                });
                if (value !== 'id') {
                    item.ids = data[i].id;
                }
                recursion2(data, item, keyRoot, valRoot, value, label);
                data2.push(item);
            }
        })
    }

    return data2;
}

// 递归便利数据
function recursion(data, item, keyRoot, valRoot, value, label) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][keyRoot] == item.value) {
            let itemChild = Object.assign({}, data[i], {
                id: data[i][value],
                value: data[i][value],
                label: data[i][label]
            });
            if (value !== 'id') {
                itemChild.ids = data[i].id;
            }
            if (!item.children || !item.children.length) {
                item.children = [];
            }
            item.children.push(itemChild);
            recursion(data, itemChild, keyRoot, valRoot, value, label);
        }
    }
}
// 递归便利数据(品牌专用)
function recursion2(data, item, keyRoot, valRoot, value, label) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][keyRoot] == item.value) {
            let itemChild = Object.assign({}, data[i], {
                id: data[i][value],
                value: data[i][value],
                label: data[i][label]
            });
            if (value !== 'id') {
                itemChild.ids = data[i].id;
            }
            if (!item.children || !item.children.length) {
                item.children = [];
                item.disabled = true
            }
            item.children.push(itemChild);
            recursion2(data, itemChild, keyRoot, valRoot, value, label);
        }
    }
}

/**
 * 根据数组对象里的关联字段生成对应数组
 * @param  {[array]} list     [数据源]
 * @param  {[number/string]} parentId [关联的字段值]
 * @param  {[string]} sortBy   [匹配关联的字段]
 * @param  {[string]} backStr  [需要返回的字段]
 * @param  {[array]} arr      [返回结果的数组]
 */
export function sortByParentId(list, parentId, sortBy, backStr, arr) {
    for (var i = 0; i < list.length; i++) {
        if (list[i][sortBy] === parentId && list[i][backStr]) {
            return arr.unshift(list[i][backStr]);
        }
    }
}
/**
 * [根据数组元素间的关系组成字符串]
 * @param  {[array]} list     [数据源]
 * @param  {[number/string]} parentId [关联的字段值]
 * @param  {[string]} sortBy   [匹配关联的字段]
 * @param  {[string]} backStr  [需要返回的字段]
 * @param  {[string]} formatter [值之间的连接符]
 * @return {[string]}           [组成的字符串]
 */
export function arrToString(list, parentId, sortBy, backStr, formatter) {
    if (!sortBy) {
        sortBy = 'id';
    }
    if (!formatter) {
        formatter = '>';
    }
    if (!backStr) {
        backStr = 'name';
    }
    let arr = [];
    sortByParentId(list, parentId, sortBy, backStr, arr);

    let str = '';
    if (arr.length) {
        str = arr.join(formatter);
    }
    return str;
}

export function setStorage(key, value) {
    var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
    var valueDate = JSON.stringify({
        val: value,
        timer: curtime
    });
    try {
        // local.$setLocalStorageByName(key, valueDate);
        window.localStorage.setItem(key, valueDate)
    } catch (e) {
        /*if(e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
     console.log("Error: 本地存储超过限制");
     localStorage.clear();
 } else {
     console.log("Error: 保存到本地存储失败");
 }*/
        // 兼容性写法
        if (isQuotaExceeded(e)) {
            // console.log("Error: 本地存储超过限制");
            window.localStorage.setItem.clear();
        } else {
            // console.log("Error: 保存到本地存储失败");
        }
    }
}

function isQuotaExceeded(e) {
    var quotaExceeded = false;
    if (e) {
        if (e.code) {
            switch (e.code) {
                case 22:
                    quotaExceeded = true;
                    break;
                case 1014: // Firefox
                    if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if (e.number === -2147024882) { // IE8
            quotaExceeded = true;
        }
    }
    return quotaExceeded;
}
export function getStorage(key, time) {
    var exp = 60 * 60 * 1000 * time; // 一天的秒数
    if (window.localStorage.getItem(key)) {
        var vals = window.localStorage.getItem(key); // 获取本地存储的值
        var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
        // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
        var isTimed = (new Date().getTime() - dataObj.timer) > exp;
        if (isTimed) {
            // console.log("存储已过期");
            window.localStorage.removeItem(key);
            return null;
        } else {
            var newValue = dataObj.val;
        }
        return newValue;
    } else {
        return null;
    }
}

function getElementOffsetTop(el) {
    let top = el.offsetTop
    let cur = el.offsetParent
    while (cur != null) {
        top += cur.offsetTop
        cur = cur.offsetParent
    }
    return top
}



export function inputup(rootelement, rootelement2) {

    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    // alert('android'+isAndroid)
    if (isAndroid) { // android统一处理，不影响ios的自身处理

        let body = document.getElementsByTagName('body')[0] // 兼容获取body
        let regDom = document.querySelector(rootelement) // 获取页面内层元素
        let regDom2 = document.querySelector(rootelement2) // 获取页面外层根元素
        // console.log(regDom.currentTarget.style.background)
        // let content = document.querySelector('.content') // 表单内容部分

        // let scrollHeight = body.scrollHeight // 网页文档高
        // let scrollTop = body.scrollTop// 卷上去的高

        let clientHeight = body.clientHeight + 41 //可见高
        // let fixHeight = clientHeight/2 // 定位高，弹出键盘时input距浏览器上部的距离，自己定义合适的
        //     let fixHeight2 = clientHeight/5*2 // 定位高，弹出键盘时input距浏览器上部的距离，自己定义合适的
        let fixHeight3 = clientHeight / 8 // 定位高，弹出键盘时input距浏览器上部的距离，自己定义合适的
        // 符合需弹出键盘的元素query
        let queryStr = 'input[type=text],input[type=tel],input[type=number],input[type=password], textarea'
        let inputs = document.querySelectorAll(queryStr)
        for (let i = 0; i < inputs.length; i++) {
            let item = inputs[i]
            // let ccc=item.getBoundingClientRect().top
            // console.log(item.getBoundingClientRect())
            item.addEventListener('focus', () => {
                // 改变top上移页面
                let offsetTopArr = Array.prototype.map.call(inputs, item => {
                    return getElementOffsetTop(item) // offsetTop只能获取到顶部距它的offsetParent的距离，需此方法获取到元素距顶部的距离
                })
                if ((offsetTopArr[i] - regDom2.scrollTop) > (7 * fixHeight3)) { //元素距离页面顶部的距离-浏览器的滚动条距离页面顶部距离>屏幕的一半
                    // regDom.style.top = '-' + (offsetTopArr[i] - fixHeight) + 'px'

                    regDom.style.top = '-' + 4 * fixHeight3 + 'px'
                } else if ((offsetTopArr[i] - regDom2.scrollTop) > (6 * fixHeight3)) {
                    regDom.style.top = '-' + 3 * fixHeight3 + 'px'

                } else if ((offsetTopArr[i] - regDom2.scrollTop) > (5 * fixHeight3)) {
                    regDom.style.top = '-' + 2 * fixHeight3 + 'px'

                } else if ((offsetTopArr[i] - regDom2.scrollTop) > (4 * fixHeight3)) {
                    regDom.style.top = '-' + fixHeight3 + 'px'

                } else if ((offsetTopArr[i] - regDom2.scrollTop) > (3 * fixHeight3)) {
                    regDom.style.top = '-' + fixHeight3 / 2 + 'px'

                }

            })
            item.addEventListener('blur', () => {
                // 恢复top
                if (regDom.style.top !== 0) {
                    regDom.style.top = 0
                }
            })
        }

        window.inputdown = function inputdown() {
            if (regDom.style.top !== 0) {
                regDom.style.top = 0
            }
            for (let i = 0; i < inputs.length; i++) {
                let item = inputs[i]
                item.blur()
            }
        }
    } else {
        // let regDom = document.querySelector(rootelement) // 获取页面根元素
        let queryStr = 'input[type=text],input[type=tel],input[type=number],input[type=password], textarea'
        let inputs = document.querySelectorAll(queryStr)
        inputs.forEach((item) => { //循环给input添加监听
            item.addEventListener('blur', () => {
                setTimeout(function () {
                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100)


            })
        })
    }
}

export function inputup2(rootelement, rootelement2) { //移除监听

    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    // alert('android'+isAndroid)
    if (isAndroid) { // android统一处理，不影响ios的自身处理

        let body = document.getElementsByTagName('body')[0] // 兼容获取body
        let regDom = document.querySelector(rootelement) // 获取页面根元素
        let regDom2 = document.querySelector(rootelement2) // 获取页面根元素
        // console.log(regDom.currentTarget.style.background)
        // let content = document.querySelector('.content') // 表单内容部分

        // let scrollHeight = body.scrollHeight // 网页文档高
        // let scrollTop = body.scrollTop// 卷上去的高

        let clientHeight = body.clientHeight + 41 //可见高
        // let fixHeight = clientHeight/2 // 定位高，弹出键盘时input距浏览器上部的距离，自己定义合适的
        // let fixHeight2 = clientHeight/5*2 // 定位高，弹出键盘时input距浏览器上部的距离，自己定义合适的
        let fixHeight3 = clientHeight / 8 // 定位高，弹出键盘时input距浏览器上部的距离，自己定义合适的
        // 符合需弹出键盘的元素query
        let queryStr = 'input[type=text],input[type=tel],input[type=number],input[type=password], textarea'
        let inputs = document.querySelectorAll(queryStr)

        inputs.forEach((item, i) => { //循环给input添加监听
            // let ccc=item.getBoundingClientRect().top
            // console.log(item.getBoundingClientRect())
            item.removeEventListener('focus', () => {
                // 改变top上移页面
                let offsetTopArr = Array.prototype.map.call(inputs, item => {
                    return getElementOffsetTop(item) // offsetTop只能获取到顶部距它的offsetParent的距离，需此方法获取到元素距顶部的距离
                })
                if ((offsetTopArr[i] - regDom2.scrollTop) > (7 * fixHeight3)) { //元素距离页面顶部的距离-浏览器的滚动条距离页面顶部距离>屏幕的一半
                    // regDom.style.top = '-' + (offsetTopArr[i] - fixHeight) + 'px'

                    regDom.style.top = '-' + 4 * fixHeight3 + 'px'
                } else if ((offsetTopArr[i] - regDom2.scrollTop) > (6 * fixHeight3)) {
                    regDom.style.top = '-' + 3 * fixHeight3 + 'px'

                } else if ((offsetTopArr[i] - regDom2.scrollTop) > (5 * fixHeight3)) {
                    regDom.style.top = '-' + 2 * fixHeight3 + 'px'

                } else if ((offsetTopArr[i] - regDom2.scrollTop) > (4 * fixHeight3)) {
                    regDom.style.top = '-' + fixHeight3 + 'px'

                } else if ((offsetTopArr[i] - regDom2.scrollTop) > (3 * fixHeight3)) {
                    regDom.style.top = '-' + fixHeight3 / 2 + 'px'

                }

            })
            item.removeEventListener('blur', () => {
                // 恢复top
                if (regDom.style.top !== 0) {
                    regDom.style.top = 0
                }
            })
        })
        // window.inputdown=inputdown(rootelement)
        // window.inputdown=function inputdown() {
        //     regDom.style.top =0
        // }
    } else {
        // let regDom = document.querySelector(rootelement) // 获取页面根元素
        let queryStr = 'input[type=text],input[type=tel],input[type=number],input[type=password], textarea'
        let inputs = document.querySelectorAll(queryStr)
        inputs.forEach((item) => { //循环给input添加监听
            item.removeEventListener('blur', () => {
                setTimeout(function () {
                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100)
            })
        })
    }
}



// function inputdown(rootelement){
//     document.querySelector(rootelement).style.top=0
// }


let cNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
// let cUnit = ['十', '百', '千', '万', '十万', '百万', '千万', '亿'];

export function num2chinese(num) {
    let str = num.toString();
    // let strNum = '';
    if (str.length === 1) {
        return cNum[num * 1];
    } else {
        let arr = str.split('');
        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            arr2.push(cNum[arr[i] * 1]);
        }
        console.log(arr2);
    }
}
export function getSessionStorage(key) {
    return session.$getSessionStorageByName(key);
}
export function voice(id) { //开启语音播报
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    // alert('android'+isAndroid)
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.JPushRegister(JSON.stringify({
            storeId: id
        }))
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.JPushRegister.postMessage({
                storeId: id
            })
        }
    }
}

export function exitvoice(id) { //关闭语音播报
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    // alert('android'+isAndroid)
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.JPushExit()
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.JPushExit.postMessage({
                storeId: id
            })
        }
    }
}
export function back(id) { //头上背景颜色
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    // alert('android'+isAndroid)
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理

        window.AndroidJs.background(JSON.stringify({
            color: id
        }))


    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.background.postMessage({
                color: id
            })
        }

    }
}
export function phonearea(id1, id2, id3, id4, id5) { //详情地图
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    // alert('android'+isAndroid)
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.Area(JSON.stringify({
            logo: id1,
            longitude: id2,
            latitude: id3,
            name: id4,
            address: id5
        }));
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.Area.postMessage({
                logo: id1,
                longitude: id2,
                latitude: id3,
                name: id4,
                address: id5
            });
        }
    }
}

export function merchantcode(id1, id2) { //二维码
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    // alert('android'+isAndroid)
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.code(JSON.stringify({
            codeUrl: id1,
            codeImg: id2
        }))
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.code.postMessage({
                codeUrl: id1,
                codeImg: id2
            })
        }
    }
}
export function ringup(tel) { //是否开启语音播报的声音
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.ringup(JSON.stringify({
            phone: tel
        }))
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.ringup.postMessage({
                phone: tel
            })
        }
    }
}
export function voiceSwitch(tel) { //语音 0不播报 1播报
    console.log('tel', tel)
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.voiceSwitch(JSON.stringify({
            isVoice: tel ? 1 : 0
        }))
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.voiceSwitch.postMessage({
                isVoice: tel ? 1 : 0
            })
        }
    }
}
export function showLocation() { //获取定位权限
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.showLocationPermissions()
    }
    // else {
    //     if(window.webkit) {

    //     }
    // }
}

export function loginFirst() { //冷加载
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.loginFirstRefresh()
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.loginFirstRefresh.postMessage({

            })
        }
    }
}

export function appUpdate(android, ios, isForce, appUrl, updateContent,isInput) { //app自动更新
    console.log(android,ios)
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.shopUpdateVersion(JSON.stringify({
            newVersionAndroid: android, //安卓最新版本号
            isForce: isForce, // 0 提示更新  1 强制更新
            appUrl: appUrl, //下载地址 安卓的  iOS可以写空值
            updateContent: updateContent, //:版本升级内容
            isInput:isInput
        }))

    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.shopUpdateVersion.postMessage({
                newVersioniOS: ios, //ios最新版本号
                isForce: isForce,
                appUrl: '',
                updateContent: updateContent,
                isInput:isInput
            })
        }
    }
}


export function getCode() { //扫描条形码
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.shopappScan()
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.shopappScan.postMessage({

            })
        }
    }
}

export function downQr(urls) { //下载图片
    console.log(urls)
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.downQrImg(JSON.stringify({
            urls: urls, //安卓最新版本号
            
        }))
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.downQrImg.postMessage({
                urls: urls, 
            })
        }
    }
}
export function lookContract(urls) { //查看合同
    console.log(urls)
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    if (isAndroid && window.AndroidJs) { // android统一处理，不影响ios的自身处理
        window.AndroidJs.lookContract(JSON.stringify({
            urls: urls, //安卓最新版本号
            
        }))
    } else {
        if (window.webkit) {
            window.webkit.messageHandlers.lookContract.postMessage({
                urls: urls, 
            })
        }
    }
}


export function onewatermark(rst, callback) { //图片水印
    // let tpl = '<canvas id = "watermark" width = "160px" height = "100px" style="display:none;"></canvas>';
    let cw
    var img = new Image();
    img.src = rst.base64;




    // let tplr = '<canvas id = "repeat-watermark"></canvas>';
    let tplr = document.createElement("canvas");
    tplr.id = 'repeat-watermark'
    // document.body.appendChild(tplr)
    // let crw = document.getElementById('repeat-watermark');



    img.onload = function () {
        let tpl = document.createElement("canvas");
        tpl.id = 'watermark'
        if (img.width > 600) {
            tpl.width = img.width / 3
        } else if (img.width > 400) {
            tpl.width = img.width / 2
        } else {
            tpl.width = img.width / 1
        }
        // tpl.width=img.width/4
        tpl.height = img.height / 4
        tpl.style = 'display:none'
        document.body.appendChild(tpl)
        cw = document.getElementById('watermark');
        let ctx = cw.getContext("2d"); //返回一个用于在画布上绘图的环境
        ctx.clearRect(0, 0, img.width / 4, img.height / 4); //绘制之前画布清除
        ctx.font = "20px Arial";
        ctx.rotate(-20 * Math.PI / 180);
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillText("省钱熊入驻专用其他无效", -20, 100);
        ctx.rotate('20*Math.PI/180'); //坐标系还原

        // console.log(crw)
        let ctxr = tplr.getContext("2d");
        tplr.width = img.width;
        tplr.height = img.height;
        ctxr.clearRect(0, 0, img.width, img.height); //清除整个画布
        ctxr.drawImage(img, 0, 0);
        let pat = ctxr.createPattern(cw, "repeat"); //在指定的方向上重复指定的元素
        ctxr.fillStyle = pat;
        ctxr.fillRect(0, 0, img.width, img.height);
        // var image = new Image();
        // image.src=tplr.toDataURL("image/jpeg");
        let dataUrl = tplr.toDataURL("image/jpeg")
        // console.log(dataUrl)
        callback(dataUrl)
        document.body.removeChild(tpl);
        // return dataUrl
    }
    // return '111'
}


// js计算精度
// 加法： accAdd(0.1, 0.2)  // 得到结果：0.3
export function accAdd(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try {
        dec1 = countDecimals(num1) + 1;
    } catch (e) {
        dec1 = 0;
    }
    try {
        dec2 = countDecimals(num2) + 1;
    } catch (e) {
        dec2 = 0;
    }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = (num1 * times + num2 * times) / times;
    var result = (accMul(num1, times) + accMul(num2, times)) / times;
    return getCorrectResult("add", num1, num2, result);
    // return result;
}

// 减法： accSub(1, 0.9)    // 得到结果：0.1
export function accSub(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try {
        dec1 = countDecimals(num1) + 1;
    } catch (e) {
        dec1 = 0;
    }
    try {
        dec2 = countDecimals(num2) + 1;
    } catch (e) {
        dec2 = 0;
    }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = Number(((num1 * times - num2 * times) / times);
    var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
    return getCorrectResult("sub", num1, num2, result);
    // return result;
}


// 除法： accDiv(2.2, 100)  // 得到结果：0.022
export function accDiv(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var t1 = 0,
        t2 = 0,
        dec1, dec2;
    try {
        t1 = countDecimals(num1);
    } catch (e) {}
    try {
        t2 = countDecimals(num2);
    } catch (e) {}
    dec1 = convertToInt(num1);
    dec2 = convertToInt(num2);
    var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
    return getCorrectResult("div", num1, num2, result);
    // return result;
}

// 乘法： accMul(7, 0.8)    // 得到结果：5.6
export function accMul(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var times = 0,
        s1 = num1.toString(),
        s2 = num2.toString();
    try {
        times += countDecimals(s1);
    } catch (e) {}
    try {
        times += countDecimals(s2);
    } catch (e) {}
    var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
    // return result;
}

// countDecimals()方法：计算小数位的长度
var countDecimals = function (num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch (e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
}

// convertToInt()方法：将小数转成整数
var convertToInt = function (num) {
    num = Number(num);
    var newNum = num;
    var times = countDecimals(num);
    var temp_num = num.toString().toUpperCase();
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times));
    } else {
        newNum = Number(temp_num.replace(".", ""));
    }
    return newNum;
}

// getCorrectResult()方法：确认我们的计算结果无误，以防万一
var getCorrectResult = function (type, num1, num2, result) {
    var temp_result = 0;
    switch (type) {
        case "add":
            temp_result = num1 + num2;
            break;
        case "sub":
            temp_result = num1 - num2;
            break;
        case "div":
            temp_result = num1 / num2;
            break;
        case "mul":
            temp_result = num1 * num2;
            break;
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result;
    }
    return result;
}

export function formatter(type, value) {
    if (type === 'year') {
        return `${value}年`;
    } else if (type === 'month') {
        return `${value}月`
    } else if (type === 'day') {
        return `${value}日`
    } else if (type === 'hour') {
        return `${value}点`
    } else if (type === 'minute') {
        return `${value}分`
    }
    return value;
}
export function emojiDelete(val) {
    let regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\-+*/|\r\n\s,.?!，。: '";%￥#@（）_<>？！…—&$=(){}[\]]|/g;
    if (typeof val === 'object') {
        let param = JSON.stringify(val);
        return param.replace(regRule, "")
    } else if (typeof val === 'string') {
        let param = val;
        return param.replace(regRule, "")
    } else {
        return val
    }
}
export function getAllAreas(res) {
    let areaObj = {
        province_list: {},
        city_list: {},
        county_list: {}
    }
    console.log(res)
    res.list.map(i => {
        if (i.areaLevel == 1) {
            areaObj.province_list[i.code] = i.name
        } else if (i.areaLevel == 2) {
            // if (i.code.substr(0, 4) != '4690') {
                areaObj.city_list[i.code] = i.name
            // }
        }else if (i.areaLevel == 3) {
            areaObj.county_list[i.code] = i.name
        }
    })
    // areaObj.city_list[469000] = '省直辖县'
    //   this.address.areaList=areaObj
    return areaObj


}
export function validateForm(data, vm) {
    let bool = true;
    try {
        Object.keys(data).map(item => {
            if (data[item] === '') {
                vm.$toast('请填写完整信息！');
                bool = false;
                throw 'out';
            }
        })
    } catch (e) {

    }
    return bool;
}
export function changetime (value) {
    let arr = [value.arrMonthOfYear[0]]  //月份数组
    let arr2 = [value.arrDayOfWeek[0]]  //周数组
    
    let month = ''                      //月份展示
    let week=''                         //周展示
    let times = ''                      //日展示
    /******** 月整理*******/
    value.arrMonthOfYear.forEach((item,index)=>{  //月份整理
        
        if(value.arrMonthOfYear[index+1]-item!==1){
          arr.push(item)
          arr.push(value.arrMonthOfYear[index+1])
        }
        
    })
    arr.pop()
    
          arr.forEach((item,index)=>{
            if(index%2===0){
              if(item===arr[index+1]){
                month+=item+'月,'
              }else{
                month+=item+'~'+arr[index+1]+'月,'
              }
            }
          })
          month=month.substr(0,month.length-1);
          
          if((arr.length===2&&arr[1]-arr[0]===11)){
            // value.arrMonth='全年'
              month='全年'
          }else{
            // value.arrMonth=month
          }

    
            /******** 周整理*******/
          value.arrDayOfWeek.forEach((item,index)=>{
            // console.log(item,index,value.arrDayOfWeek[index+1])
            if(value.arrDayOfWeek[index+1]-item!==1){
              arr2.push(item)
              arr2.push(value.arrDayOfWeek[index+1])
            }
            
        })
        arr2.pop()
       
        arr2.forEach((item,index)=>{
          if(index%2===0){
            if(item===arr2[index+1]){
                week+=',周'+item
            }else{
                week+=',周'+item+'~周'+arr2[index+1]
            }
          }
        })
        week=week.substr(1,week.length);
        
// console.log(week)
        if((arr2.length===2&&arr2[1]-arr2[0]===6)){
        //   value.arrWeek='整周'
            week='整周'
        }else{
        //   value.arrWeek=week
    }
    

          /******** 日整理*******/
  
    value.subList.forEach((item,index)=>{
      times+=','+item.startHourOfDay+':';
      item.startMinuteOfHour<10?times+='0'+item.startMinuteOfHour:times+=item.startMinuteOfHour;
      times+='~'+item.endHourOfDay+':';
       item.endMinuteOfHour<10?times+='0'+item.endMinuteOfHour:times+=item.endMinuteOfHour;
})

times=times.substr(1,times.length);

return [month,week,times]
}