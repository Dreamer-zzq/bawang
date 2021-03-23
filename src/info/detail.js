import './detail.css';
$(function () {
    var count = 0;
    // 获取本地sessionStorage的数据
    var result = sessionStorage.getItem('goodsMessage');
    var imgSrc = JSON.parse(result).goodsImg;
    var names = JSON.parse(result).goodsName;
    var sales = JSON.parse(result).goodsSale;
    var eva = JSON.parse(result).goodsEva;
    $('#goods').attr('src', imgSrc);
    $('#con h3').html(names);
    $('.sales span:eq(0) i').html(sales);
    $('.sales span:eq(1) i').html(eva);

    // 给按钮添加点击事件
    $('#con').on('click', '#addCar', function () {
        count++;
        var s = count;
        var price = JSON.parse(result).goodsPrice;
        localStorage.setItem(names, JSON.stringify({ names, price, imgSrc, s }));
        alert('加入购物车成功');
    })
})


