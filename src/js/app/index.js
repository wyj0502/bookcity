define(["jquery", 'get'], function($, get) {
    var cache = {};

    function get(url, callback) {
        if (cache[url]) {
            callback(cache[url]);
            return;
        }
        $.ajax({
            url: url,
            dataType: "text",
            success: function(data) {
                cache[url] = data;
                callback(data);
            }
        })
    }
    var init = {};
    init.start = function(ctx, next) {
        ctx.data = {};
        next();
    }
    init.bookcity = function(ctx, next) {
        get("/views/bookcity.html", function(html) {
            ctx.data.index = 0;
            ctx.data.url = '/api/bookcity'; //获取数据接口
            ctx.data.script = 'bookcity'; //js文件名
            ctx.data.context = html;
            next();
        })

    }
    init.bookshelf = function(ctx, next) {
        get("/views/bookshelf.html", function(html) {
            ctx.data.index = 1;
            ctx.data.script = 'bookshelf'; //js文件名
            ctx.data.url = '/api/bookshelf';
            ctx.data.context = html;
            next()
        })

    }
    init.detail = function(ctx, next) {
        get('/views/detail.html', function(html) {
            ctx.data.script = "detail";
            ctx.data.url = "/api/detail?id=" + ctx.params.pageid;
            ctx.data.context = html;
            next();
        })

    }
    init.search = function(ctx, next) {
        get('/views/search.html', function(html) {
            ctx.data.url = "/api/hotkey";
            ctx.data.script = 'search';
            ctx.data.context = html;
            next();
        })

    }
    init.cont = function(ctx, next) {
        require([ctx.data.script], function(cb) {
            cb(ctx.data)
        })
    }
    return init;
});