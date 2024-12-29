//拿153.html的location.href = `154-大案例-详情.html?id=${arr[i].id}`列表传来的id
//方法1：截取字符串
// console.log(location.href.split("=")[1])

//方法2：构造函数URL（html5标准方式）
//构造新对象obj传入location.href再获取
var obj = new URL(location.href)
// console.log(obj)
//obj的URL下SearchParams下原型prototype里有get
// console.log(obj.searchParams.get("id"))
var id = obj.searchParams.get("id")

//面向对象方式
//154html只要一加载立即拿到id，在new Detail传入id挂在实例化对象上
class Detail {
    constructor(id) {
        this.id = id
        this.init()
    }
    async init() {
        //获取数据
        var info = await this.getList()
        console.log(info)
        //渲染页面
        this.renderHTML(info)
    }

    async getList() {
        var res = await fetch(`http://localhost:3000/goods/${this.id}`)
        var info = res.json()
        return info
    }

    renderHTML(info) {
        console.log(info)
        //解构
        var { title, price, feature, desc } = info
        var oh1 = document.querySelector("h1")
        var ofeature = document.querySelector(".feature")
        var oprice = document.querySelector(".price")
        var olist = document.querySelector(".list")

        //渲染页面
        oh1.innerHTML = title
        ofeature.innerHTML = feature
        oprice.innerHTML = `价格：￥${price}`
        olist.innerHTML = desc.map(item => `<li><img src="${item}"></li>`
        ).join("")

    }

}

new Detail(id)