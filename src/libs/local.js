//把获得到的token存到localStorage里
export const setLocal = (key,value)=>{
    if(typeof value == 'object'){   //如果传过来的是对象，则转换成字符串
        value = JSON.stringify(value)
    }
    localStorage.setItem(key,value)     //存到localStorage里
}

//获取localStorage里的token
export const getLocal = (key)=>{
    return localStorage.getItem(key)
}