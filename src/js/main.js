require.config({
    baseUrl: "/js/",
    paths: {
        //插件
        require: "libs/jquery",
        page: "libs/page",
        jquery: "libs/jquery",
        handlebars: "libs/handlebars-v4.0.11",
        Swiper: "libs/swiper-4.3.3.min",
        //页面
        index: "app/index",
        bookcity: "app/bookcity",
        bookshelf: "app/bookshelf",
        detail: "app/detail",
        search: "app/search",
        //路由接口
        route: "route/index",
        //公用方法
        table: "common/tab",
        get: "common/get",
        template: "common/template"
    }
})
require(["route"]);