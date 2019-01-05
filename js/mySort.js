var list = document.getElementById("list");
var oLi = list.getElementsByTagName("li");
var oHeader = document.getElementsByClassName("header")[0];
var oLinks = oHeader.getElementsByTagName("a");

//获取json数据
var goodsList = null;
var xhr = new XMLHttpRequest();
xhr.open("get", "./json/product.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        goodsList = xhr.responseText;
    }
};
xhr.send(null);
goodsList = JSON.parse(goodsList);

//绑定数据
var str = "";
for (var i = 0; i < goodsList.length; i++) {
    var goods = goodsList[i];
    str += `<li data-price="${goods.price}" data-hot="${goods.hot}" data-time="${goods.time}">
                <img src="${goods.img}" alt="">
                <span>${goods.title}</span>
                <span>上架时间：${goods.time}</span>
                <span>热度：${goods.hot}</span>
                <span>价格：￥${goods.price}</span>
                </li>`
}
list.innerHTML = str;

//绑定点击事件
for (var i = 0; i < oLinks.length; i++) {
    oLinks[i].index = i;
    oLinks[i].flag = -1;
    oLinks[i].onclick = function () {
        for (var k = 0; k < oLinks.length; k++) {
            if (oLinks[k]!==this){
                oLinks[k].flag=-1;
            }
        }
        var oIs1 = oHeader.getElementsByTagName("i");
        for (var j = 0; j < oIs1.length; j++) {
            oIs1[j].classList.remove("bg")
        }
        var oIs = this.getElementsByTagName("i");
        if (this.flag == -1) {
            oIs[0].classList.add("bg");
            oIs[1].classList.remove("bg");
        } else {
            oIs[1].classList.add("bg");
            oIs[0].classList.remove("bg");
        }

        this.flag *= -1;
        mySort.call(this);
    }
}

//排序
function mySort() {
    var newLi = [].slice.call(oLi);
    var flag = this.flag;
    var index = this.index;
    newLi.sort(function (a, b) {
        var aTtr, bTtr;
        if (index == 0) {
            aTtr = a.getAttribute("data-time").replace(/-/g, "");
            bTtr = b.getAttribute("data-time").replace(/-/g, "");
        } else if (index == 1) {
            aTtr = a.getAttribute("data-hot");
            bTtr = b.getAttribute("data-hot");
        } else {
            aTtr = a.getAttribute("data-price");
            bTtr = b.getAttribute("data-price");
        }
        return (aTtr - bTtr) * flag;
    });
    for (var i = 0; i < newLi.length; i++) {
        list.appendChild(newLi[i]);
    }
}