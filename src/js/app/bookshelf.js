define(['jquery', 'table', 'get'], function($, table, get) {
    return function(info) {
        $(".index").show();
        $(".detail").hide();
        table({
            parent: ".header>div",
            tag: "a",
            index: info.index
        });
        get(info.url, function(data) {
            // console.log(data)
        })
        $(".main").html(info.context);
    }
});