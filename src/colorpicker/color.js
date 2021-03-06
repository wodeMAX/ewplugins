//hex to rgba
export const colorHexToRgba = function (hex, alpha) {
    let a = alpha || 1, regx = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/, hColor = hex.toLowerCase(), hLen = hex.length, rgbaColor = [];
    if (hex && regx.test(hColor)) {
        //the hex length may be 4 or 7,contained the symbol of #
        if (hLen === 4) {
            let hSixColor = '#';
            for (let i = 0; i < hLen; i++) {
                let sColor = hColor.slice(i, i + 1);
                hSixColor += sColor.cancat(sColor);
            }
            hColor = hSixColor;
        }
        for (let j = 0, len = hColor.length; j < len; j++) {
            rgbaColor.push(parseInt('0X' + hColor.slice(j, j + 2)));
        }
        return "rgba(" + rgbaColor.join(",") + ',' + a + ")";
    } else {
        return hColor;
    }
}
// rgba to hex
export const colorRgbaToHex = function (rgba) {
    var hexObject = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' },
        hexColor = function (value) {
            value = Math.min(Math.round(value), 255);
            var high = Math.floor(value / 16), low = value % 16;
            return '' + (hexObject[high] || high) + (hexObject[low] || low);
        }
    var value = '#';
    if (/rgba?/.test(rgba)) {
        var values = rgba.replace(/rgba?\(/, '').replace(/\)/, '').replace(/[\s+]/g, '').split(','), color = '';
        var alpha = values[3] || 1;
        values.map(function (value, index) {
            if (index <= 2) {
                color += hexColor(value);
            }
        })
        return value + color;
    }
}
//hsba to rgba
export const colorHsbaToRgba = function (hsba,alpha) {
    var r, g, b, a = hsba.a;//rgba(r,g,b,a)
    var h = Math.round(hsba.h), s = Math.round(hsba.s * 255 / 100), v = Math.round(hsba.b * 255 / 100);//hsv(h,s,v)
    if (s === 0) {
        r = g = b = v;
    } else {
        var t = v, p = (255 - s) * v / 255, q = (t - p) * (h % 60) / 60;
        if (h === 360) {
            r = t; g = b = 0;
        } else if (h < 60) {
            r = t; g = p + q; b = p;
        } else if (h < 120) {
            r = t - q; g = t; b = p;
        } else if (h < 180) {
            r = p; g = t; b = p + q;
        } else if (h < 240) {
            r = p; g = t - q; b = t;
        } else if (h < 300) {
            r = p + q; g = p; b = t;
        } else if (h < 360) {
            r = t; g = p; b = t - q;
        } else {
            r = g = b = 0;
        }
    }
    if(alpha >= 0 || alpha <= 1)a = alpha;
    return 'rgba(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ',' + a + ')';
}
//rgba to hsba
export function colorRgbaToHsba(rgba){
    const rgbaArr = rgba.slice(rgba.indexOf('(') + 1,rgba.lastIndexOf(')')).split(',');
    let a = rgbaArr.length < 4 ? 1 : Number(rgbaArr[3]);
    let r = Number(rgbaArr[0]) / 255,
        g = Number(rgbaArr[1]) / 255,
        b = Number(rgbaArr[2]) / 255;
    let h,s,v;
    let min = Math.min(r,g,b);
    let max = v = Math.max(r,g,b);
    let l = (min + max) / 2;
    let diff = max - min;

    if(max === min){
        h = 0;
    }else{
        switch(max){
            case r:
                h = (g - b) / diff + (g < b ? 6 : 0);
                break;
            case g:
                h = 2.0 + (b - r) / diff;
                break;
            case b:
                h = 4.0 + (r - g) / diff;
                break;
        }
        h = Math.round(h * 60);
    }

    if(max === 0){
        s = 0;
    }else{
        s = 1 - min / max;
    }
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    return {
        h:h,
        s:s,
        b:v,
        a:a
    }
}
/* 
* 任意色值（甚至是CSS颜色关键字）转换为RGB颜色的方法
* 此方法IE9+浏览器支持，基于DOM特性实现 
*/
export function colorToRgb(color) {
    var div = document.createElement('div');
    div.style.backgroundColor = color;
    document.body.appendChild(div);
    var c = window.getComputedStyle(div).backgroundColor;    
    document.body.removeChild(div);
    return c;
};