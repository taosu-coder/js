$.fn.extend({
    tabs: function (index) {
        var oli = this.find(".header li")
        var obox = this.find(".box li")
        // oli.eq(0).addClass("active")
        // obox.eq(0).addClass("active")
        //支持传参数index
        oli.eq(index).addClass("active")
        obox.eq(index).addClass("active")
        oli.click(function () {
            $(this).addClass("active").siblings().removeClass("active")

            var index = $(this).index()
            obox.removeClass("active").eq(index).addClass("active")
        })
    }
})