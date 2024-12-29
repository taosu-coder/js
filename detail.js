//拿列表传来得，
//1-截取字符串
// console.log(location.href.split("=")[1])

//2-URL

var obj = new URL(location.href)
var id = obj.searchParams.get("id")


class Detail{
    constructor(id){
        this.id = id
        this.init()
    }

    async init(){
        //获取数据
        var info = await this.getList()
        // console.log(info)
        //渲染页面
        this.renderHTML(info)
    }

    async getList(){
        var res = await fetch(`http://localhost:3000/goods/${this.id}`)
        var info = await res.json()
        return info
    }

    renderHTML(info){
        console.log(info)
        var {title,price,feature,desc} = info
        var oh1 = document.querySelector("h1")
        var ofeature = document.querySelector(".feature")
        var oprice = document.querySelector(".price")
        var olist = document.querySelector(".list")

        oh1.innerHTML = title
        ofeature.innerHTML = feature
        oprice.innerHTML = `<span style="color:red">价格：￥${price}</span>`

        olist.innerHTML = desc.map(item=>`
            <li>
              <img src="${item}"/>
            </li>
        `).join("")
    }
}

new Detail(id)