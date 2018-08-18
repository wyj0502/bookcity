define(['template', 'get', 'jquery', 'table'], function(template, get, $, table) {
    return function(info) {
        $(".index").hide();
        $(".detail").hide();
        $(".search").show();
        $('.search').html(info.context);
        get(info.url, function(data) {
            var data = JSON.parse(data);
            get('/views/tag-tpl.html', function(html) {
                template(html, data.ads, '.hot');
            })
            var _tagWrap = $('.tag-wrap'),
                _searchList = $(".search-list"),
                _ipt = $('.ipt');
            $('.search-btn').on("click", function() {
                var val = $('.ipt').val();
                if (!val) {
                    alert("输入内容")
                } else {
                    searchFn(val);
                }
            });
            var storage = window.localStorage,
                historyArr = JSON.parse(storage.getItem('history')) || [];
            if (historyArr.length > 0) {
                renderHistory(historyArr);
            }

            function renderHistory(val) {
                get('/views/tag-tpl.html', function(html) {
                    template(html, val, '.history');
                })
            }
            //搜索数据列表
            function searchFn(val) {
                get('/api/search?key=' + val, function(data) {
                    _tagWrap.hide();
                    var data = JSON.parse(data);
                    _searchList.show();
                    var ishas = historyArr.some(function(item) {
                        return item.ad_name === val;
                    })
                    if (!ishas) {
                        historyArr.push({ ad_name: val });
                    }
                    storage.setItem('history', JSON.stringify(historyArr));
                    renderHistory(historyArr);
                    if (data.length === 0) {
                        _searchList.html("<p>没有匹配内容</p>")
                    } else {
                        get('/views/imgInfo.html', function(html) {
                            template(html, data, '.search-list')
                        })
                    }
                })
            };
            //input
            _ipt.on("input", function() {
                var val = $(this).val();
                if (!val) {
                    _tagWrap.show();
                    _searchList.hide();
                }
            });
            //点击热门关键词
            $('.type-tag').on('click', 'li', function() {
                    var text = $(this).text();
                    _ipt.val(text);
                    searchFn(text)
                })
                //点击返回
            $('.icon-back').on('click', function() {
                history.go(-1);
            })
        });
    }
});