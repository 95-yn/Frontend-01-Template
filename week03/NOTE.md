# 每周总结可以写在这里


###    对象的一些特殊属性
        Array
            length   
            length改变，增加空元素或截断数组
        String
            length  无法修改
        object
            get 取值时调用
            set 赋值时调用
            HasProperty  判断是否有私有属性
            DefineOwnProperty  定义对象属性
            GetOwnProperty  获取私有属性
            




###    数字转字符串
```
function convertNumberToString(number, x = 10) {
    let integer = Math.floor(number);
    let fraction = null;
    if (x === 10) fraction = ('' + number).match(/\.\d*/) && ('' + number).match(/\.\d*/)[0];
    let string = ''
    while(integer > 0) {
      string = integer % x + string;
      integer = Math.floor(integer / x);
    }
    return fraction ? string + fraction : string;
}
```
###   字符串转数字

```
function convertStringToNumber(string, radix = 10) {
  if (radix > 10) {
    return;
  }
  let flag = /e|E/.test(string);
  if (!flag) {
    let chars = string.split('');
    let number = 0;
    let i = 0;
    while (i < chars.length && chars[i] != '.') {
      number = number * radix;
      number += chars[i].codePointAt(0) - '0'.codePointAt(0);
      i++;
    }
    if (chars[i] === '.') {
      i++;
    }
    let fraction = 1;
    while (i < chars.length) {
      fraction /= radix;
      number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
      i++;
    }
    return number;
  } else {
    let logNumber = Number(string.match(/\d+$/)[0]);
    let number = string.match(/^[\d\.]+/)[0].replace(/\./, '');
    if (/e-|E-/.test(string)) {
      return Number(number.padEnd(logNumber + 1, 0));
    } else {
      return Number(number.padStart(logNumber + number.length, 0).replace(/^0/, '0.'));
    }
  }
}
```