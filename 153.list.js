

//面向过程写法：
var current = 0 //记录当前是第几页
var isLoading = false //记录当前是否正在请求（防止多次请求）
var total = 0 //记录总数据长度，用于if里

//获取数据，渲染页面
async function getList() {
    current++
    var res = await fetch(`http://localhost:3000/goods?_page=${current}&_limit=5`)
    //打印headers，用于if里找出list.children.length可用的条件
    //打印出来在原型prototype里有get方式,可以拿到x-total-count
    // console.log(res.headers.get("x-total-count"))
    total = res.headers.get("x-total-count")
    var list = await res.json()
    console.log(list)
    renderHTML(list)

}
getList()


function renderHTML(arr) {
    for (let i = 0; i < arr.length; i++) {
        var oli = document.createElement("li")
        //图片路径修改为db文件夹下public的images
        oli.innerHTML = `<img src="http://localhost:3000/${arr[i].
            poster}" "alt="">
    <h3>${arr[i].title}</h3>`

        oli.onclick = function () {
            console.log(arr[i].id)
            //跳转
            //把id挂在location.href传过去
            location.href = `154-大案例-详情.html?id=${arr[i].id}`
        }
        list.appendChild(oli)
    }
}

window.onscroll = function () {
    //划到最后会一直数据，会加载很多空数组，设置个if到最后一条就return不请求数据children子元素
    //后端goods里headers里的response headers有x-total-count:16
    //===list.children.length数字，total是字符串
    if (list.children.length === Number(total)) {
        return
    }
    var listHeight = list.offsetHeight
    var listTop = list.offsetTop

    var windowHeight = document.documentElement.clientHeight
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (isLoading) return
    if ((listHeight + listTop) - Math.round(windowHeight + scrollTop) < 50) {
        console.log("daodile")
        isLoading = true

    }
    //重新渲染页面
    getList().then(() => {
        isLoading = false
    })

}