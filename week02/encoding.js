


const encoding = (number) => {
    let arr = ["1110","10","10"];
    let str = number.toString(2);
    arr[2] += str.substring(str.length-6);
    arr[1] += str.substring(str.length-12,str.length-6);
    arr[0] += str.substring(0,str.length-12).padStart(4,'0');
    let result =  arr.join('');
    return parseInt(result,2).toString(16);
}

console.log(encoding(0x4e25));

// 严 \u4e25
// utf-8值e4b8a5