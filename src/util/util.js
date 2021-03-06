/*
   * 功能:判断是否是一个数值
   * params@1:字符串
*/
export function isNumber(str) {
    return typeof str === 'number';
}
/*
* 功能:判断是否是一个字符串
* params@1:字符串
*/

export function isStr(str) {
    return typeof str === 'string';
}

/*
* 功能:判断是否是一个undefined
* params@1:值
*/

export function isUndefined(value) {
    return typeof value === 'undefined';
}
/*
* 功能:判断是否是一个null
* params@1:值
*/

export function isNull(value) {
    return value === null;
}
/*
* 功能:判断是否是一个函数
* params@1:值
*/

export function isFunction(fn) {
    return typeof fn === 'function';
}

/*
* 功能:判断是否是一个对象
* params@1:对象
*/

export function isShallowObject(obj) {
    return obj !== null && typeof obj === 'object';
};
/*
* 功能:判断是否是一个对象
* params@1:对象
*/

export function isDeepObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
};

/*
* 功能:判断是否是一个数组
* params@1:对象
*/

export function isDeepArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};

/*
* 功能:将类数组对象转换成数组
* params@1:类数组对象
*/
export function ewObjToArray(obj) {
    if (obj && obj.length) {
        return Array.prototype.slice.call(obj);
    }
}
/*
* 功能:是否是行内块元素
* params@1:字符串
*/
export function isIB(str) {
    return str.indexOf('inline-block') > -1;
}
/*
* 功能:是否是默认定位
* params@1:字符串
*/
export function isStat(str) {
    return str.indexOf('static') > -1;
}
/*
* 功能:是否是相对定位
* params@1:字符串
*/
export function isRel(str) {
    return str.indexOf('relative') > -1;
}
/*
* 功能:是否是绝对定位
* params@1:字符串
*/
export function isAbs(str) {
    return str.indexOf('absolute') > -1;
}
/*
* 功能:判断是否是一个DOM元素
* params@1:元素
*/
export function isDom(el) {
    return typeof HTMLElement === 'object' ? el instanceof HTMLElement : el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string' || el instanceof HTMLCollection || el instanceof NodeList;
}
/*
* 功能:合并对象
* params@1:源数据对象
* params@2~...:多个对象
*/

export function ewAssign(target, args) {
    if (target === null) return;
    if (Object.assign) {
        return Object.assign(target, args);
    } else {
        var _ = Object(target);
        for (var j = 1; j < arguments.length; j++) {
            var source = arguments[j];
            if (source) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        _[key] = source[key];
                    }
                }
            }
        }
        return _;
    }
};

/*
* 功能:错误函数
* params@1:字符串
*/

export function ewError(str) {
    return new Error(str);
}

/*
* 功能:深度克隆对象
* params@1:对象
*/

export function deepCloneObjByJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/*
* 功能:深度克隆对象
* params@1:对象
*/
export const deepCloneObjByRecursion = (function f(obj) {
    if (!isShallowObject(obj)) return;
    let cloneObj = isDeepArray(obj) ? [] : {};
    for (var k in obj) {
        cloneObj[k] = isShallowObject(obj[k]) ? f(obj[k]) : obj[k];
    }
    return cloneObj;
})
/*
* 功能:将CSS对象转成CSStext字符串
* 参数:css对象
*/
export function cssObjToStr(obj) {
    if (!isShallowObject(obj)) return;
    // 将大写字母换成短横线加小写字母

    var cssStr = '';
    for (var key in obj) {
        cssStr += keba(key) + ':' + obj[key] + ';';
    }
    return cssStr;
}
/*
* 功能:将大写字母换成短横线加小写字母
* 参数:字符串
*/
export function keba(str) {
    if (!isStr(str)) return;
    return str.replace(/A-Z/g, function (w) {
        return '-' + w.toLowerCase();
    })
}
/*
* 功能:获取css属性值
* params@1:元素对象
* params@2:css属性名
*/

export function getCss(el, prop) {
    var getStyle = el.currentStyle ? function (prop) {
        var propName = el.currentStyle[prop];
        if (propName.indexOf('height') > -1 && propName.search(/px/i) > -1) {
            var rect = el.getBoundingClientRect;
            return rect.bottom - rect.top - parseInt(getStyle('padding-bottom')) - parseInt(getStyle('padding-top')) + 'px';
        }
    } : function (prop) {
        return window.getComputedStyle(el, null)[prop];
    };
    return getStyle(prop);
};
/*
* 功能:动画函数
*/
export function requestAnimationFrame() {
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
            || window.oRequestAnimationFrame || function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
    })();
}
/*
* 功能:获取dom元素
* params@1:元素字符串
*/
export const getDom = function (ident) {
    var selector,
        sType = ident.slice(0, 1),
        identTxt = ident.slice(1);
    if (/^[#\.]/.test(sType)) {
        if (sType === "#") {
            selector = document.getElementById(identTxt);
        }
        else if (sType === ".") {
            selector = document.getElementsByClassName(identTxt);
        }
    } else {
        selector = document.getElementsByTagName(ident);
    }
    return selector;
};
//the event
export const eventType = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
/*
* 功能:创建一个dom元素
* params@1:元素标签名
*/
export function createElement(tag) {
    return document.createElement(tag);
}
/*
* 功能:为元素添加一个类名
* params@1:元素与类名
*/
export function addClass(el, className) {
    return el.classList.add(className);
}
/*
* 功能:为元素移除一个类名
* params@1:元素与类名
*/
export function removeClass(el, className) {
    return el.classList.remove(className);
}
/*
* 功能:复制一个元素
* params@1:元素
*/
export function clone(el) {
    return el.cloneNode(true);
}
/*
* 功能:事件
* params@1:事件名，回调函数
*/
export function addEvent(el,eventName, callback) {
    el.addEventListener ? el.addEventListener(eventName, callback, false) : el.attachEvent('on' + eventName, callback);
}
/*
* 功能:是否是数组的某一项
* params@1:数组，匹配项
*/
export function oneOf(arr,every){
    if(!isDeepArray(arr))return;
    let result = false;
    arr.map((a) => {
        if(every === a){
            result = true;
        }
    })
    return result;
}