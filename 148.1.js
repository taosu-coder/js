
function queryStringify(obj) {
    let str = ''
    for (let k in obj) str += `${k}=${obj[k]}&`

    //username=kerwin&password=789&
    return str.slice(0, -1)
}

// 封装 ajax
function ajax(options) {
    let defaultoptions = {
        url: "",
        method: "GET",
        async: true,
        data: {},
        headers: { "content-type": "application/x-www-form-urlencoded" },
        success: function () { },
        error: function () { }
    }
    let { url, method, async, data, headers, success, error } = {
        ...defaultoptions,
        ...options
    }

    if (typeof data === 'object' && headers["content-type"]?.indexOf("json") > -1) {
        data = JSON.stringify(data)
    }
    else {
        data = queryStringify(data)
    }
    // //如果是 get 请求, 并且有参数, 那么直接组装一下 url 信息
    if (/^get$/i.test(method) && data) url += '?' + data

    //4. 发送请求
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, async)
    xhr.onload = function () {
        if (!/^2\d{2}$/.test(xhr.status)) {
            // console.log(error)
            error(`错误状态码:${xhr.status}`) //回调
            return
        }

        // 执行解析


        try {
            // let result = JSON.parse("111 & 222")
            //捕捉error 解析失败 ! 因为后端返回的结果不是 json 格式字符串，使代码不会直接在控制台报红色错，自己捕捉错误原因
            let result = JSON.parse(xhr.responseText)
            success(result)
        } catch (err) {
            error('解析失败 ! 因为后端返回的结果不是 json 格式字符串')
        }
    }

    // // console.log(22222)

    // 设置请求头内的信息
    for (let k in headers) xhr.setRequestHeader(k, headers[k])
    if (/^get$/i.test(method)) {
        xhr.send()
    } else {
        xhr.send(data)
    }

    // xhr.send()
}
// function pajax(options) {
//     var q = new Promise(function (resole, reject) {
//         ajax({
//             ...options,
//             success: function (res) {
//                 resole(res)
//             },
//             error: function (err) {
//                 reject(err)
//             }
//         })
//     })
//     return q
// }
//简化一下
function pajax(options) {
    return new Promise((resole, reject) => {
        ajax({
            ...options,
            success(res) {
                resole(res)
            },
            error(err) {
                reject(err)
            }
        })
    })

}

export { ajax, pajax }

// q.then(function(){

// }).catch(function(){

// })