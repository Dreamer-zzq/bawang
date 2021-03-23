import './index.css';
$(function () {
    // 获取商品信息
    $.get('data/productlist.json', function (data) {
        $(data).each(function (index, data) {
            $('#products').append('<li><a><img src=' + data.img + ' alt=""></a><img src=' + data.imgSmall + ' alt=""><p>￥' + data.price + '.00</p><p>' + data.name + '</p><p> 总销量: <i>' + data.sale + '</i><span>评价:<b>' + data.eva + '</b></span></p></li> ')
        })
    })

    // 点击图片跳转到详情页，将商品信息添加到本地存储
    $('#products').on('click', 'a', function () {
        sessionStorage.clear();
        var goodsName = $(this).next().next().next().html();
        var goodsPrice = $(this).next().next().html();
        var goodsSale = $(this).next().next().next().next().children().first().html();
        var goodsEva = $(this).next().next().next().next().children().first().next().children().last().html();
        var goodsImg = $(this).children().attr('src');
        sessionStorage.setItem('goodsMessage', JSON.stringify({ goodsName, goodsPrice, goodsSale, goodsEva, goodsImg }));
        window.location.href = 'detail.html';
    })
})




