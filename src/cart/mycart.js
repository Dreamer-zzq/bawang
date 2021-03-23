import './mycart.css';
$(function () {
    // 将本地存储中的商品加入购物车
    var totalPrice = 0;
    var price;
    var Nums
    $.get('data/productlist.json', function (data) {
        $(data).each(function (index, item) {
            var result = localStorage.getItem(this.name);
            if (result) {
                var count = JSON.parse(result).s;
                $("#goodsCar").append('<tr><td><input type="checkbox" class="checkSingle"/></td><td><img src="' + this.img + '" alt=""><span>' + this.name + '</span></td><td><i>￥</i><i class="total">' + this.price + '.00</i></td><td><button class="reduce">-</button><span class="num">' + count + '</span><button class="increase">+</button></td><td><i>￥</i><i>' + this.price * count + '.00</i></td><td><button class="delbtn"">删除</button></td></tr>');
            }
        })

    })
    // 删除本行 只对已经添加的商品有效，后面添加的购物车无效 解决办法 绑定事件 on('事件名称'，处理函数)
    $('#goodsCar').on('click', '.delbtn', function () {
        // $(this).parent().parent().remove(); // 删除按钮所在的tr
        $(this).parents('tr').remove();
        localStorage.removeItem($(this).parent().parent().children().first().next().children().last().html());
        // 删除本行时判断全选框，则全选按钮取消选中
        $(':checkbox:gt(0)').each(function (i, item) {
            var unchecked = $(this).not(':checked');
            if (unchecked.length > 0) {
                $(':checkbox:first').prop('checked', false)
            } else {
                $(':checkbox:first').prop('checked', true)
            }
        })
        if($(':checkbox:eq(0):checked')){
            $(':checkbox:eq(0)').prop('checked',false);
            $("#prices").text('0.00');
        }
        signleTotal();
    })

    // 删除选中行
    $('#delseleted').click(function () {
        $(':checkbox:gt(0):checked').each(function (index, element) {
            localStorage.removeItem($(element).parent().parent().children().first().next().children().last().html());
        })
        $(':checkbox:gt(0):checked').parent().parent().remove();
        $(':checkbox:eq(0)').prop('checked', false);
        $("#prices").text('0.00');
    })

    // 全选
    $('th:eq(0)').on('change', '#checkAll', function () {
        $(':checkbox:gt(0)').prop('checked', $(this).prop('checked'));

        // 全选价格
        if ($(this).prop('checked')) {
            totalPrice = 0.00;
            $(".total").each(function (i, obj) {
                price = Number($(this).text());
                Nums = Number($(".num").eq(i).text());
                totalPrice += price * Nums;
            })
            $("#prices").text(totalPrice + '.00');
        } else {
            totalPrice = 0.00;
            $("#prices").text(totalPrice + '.00');
        }
    });

    // 单选
    $('table').on('change', 'input:gt(0)', function () {
        // 获得未选中的复选框，只要存在一个不选中，则全选按钮取消选中
        var unchecked = $(':checkbox:gt(0)').not(':checked');
        if (unchecked.length > 0) {
            $(':checkbox:first').prop('checked', false)
        } else {
            $(':checkbox:first').prop('checked', true)
        }
        signleTotal();
    })


    // 数量增
    $('table').on('click', '.increase', function () {
        var count = $(this).prev().text();
        count++;
        $(this).prev().text(count);
        $(this).parent().next().children().last().text(count * $(this).parent().prev().children().last().text() + '.00');

        signleTotal();

    })

    // 数量减
    $('table').on('click', '.reduce', function () {
        var count = $(this).next().text();
        count--;
        $(this).next().text(count);
        if (count <= 1) {
            count = 1;
            $(this).next().text(count);
        }
        $(this).parent().next().children().last().text(count * $(this).parent().prev().children().last().text() + '.00');
        signleTotal();
    })

    // 结算
    $('#account').on('click','#balance',function(){
        $(':checkbox:gt(0)').each(function(i,item){
            if($(this).prop('checked')){
                $(this).parents('tr').remove();
                localStorage.removeItem($(this).parent().parent().children().first().next().children().last().html());
                if($(':checkbox:eq(0):checked')){
                    $(':checkbox:eq(0)').prop('checked',false);
                    $("#prices").text('0.00');
                }
            }
        })
    })

})

// 自动计算价格
function signleTotal() {
    var totalPrice = 0.00;
    $(':checkbox:gt(0)').each(function (i, item) {
        if ($(this).prop('checked')) {
            var price = Number($(this).parent().parent().children().last().prev().prev().prev().children().last().text());
            var Nums = Number($(".num").eq(i).text());
            totalPrice += price * Nums;
        }
        $("#prices").text(totalPrice + '.00');
    })
}
