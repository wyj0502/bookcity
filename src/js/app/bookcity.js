define(['jquery', 'table', 'get', 'template', 'Swiper'], function($, table, get, template, Swiper) {
    function gethtml(url) {
        var str = '';
        get(url, function(html) {
            str = html;
        });
        return str;
    }

    function chengViews(html, data, parent) {
        $(".change-btn").on("click", function() {
            var n = +$(this).data('page');
            n++;
            var len = data.length;
            var pagesize = Math.ceil(len / 5);
            n = n % pagesize;
            $(this).attr('data-page', n);
            template(html, data.slice(n * 5, n * 5 + 5), parent);

        });
    }
    return function(info) {
        $(".index").show();
        $(".detail").hide();
        $(".search").hide();

        table({
            parent: ".header>div",
            tag: "a",
            index: info.index
        });
        get(info.url, function(data) {
            var data = JSON.parse(data);
            template(info.context, data.items[0], ".main");
            new Swiper(".banner", {
                loop: true,
                autoplay: true
            });
            //本周最火
            var dlhtml = gethtml('/views/dl.html');
            template(dlhtml, data.items[1], '.week-hot>div');
            //重磅推荐
            var zbData = data.items[2].data.data;
            var zbhtml = gethtml('/views/tuijian.html');
            template(zbhtml, zbData.slice(0, 5), '.zb-cont');
            chengViews(zbhtml, zbData, '.zb-cont');
            //女生最爱
            var nshtml = gethtml("/views/imgInfo.html");
            var nsData = data.items[3].data.data;
            template(nshtml, nsData.slice(0, 5), '.ns-cont');
            //男生最爱
            var nnhtml = gethtml("/views/imgInfo.html");
            var nnData = data.items[4].data.data;
            template(nnhtml, nnData.slice(0, 5), '.nn-cont');
        });
    }
});