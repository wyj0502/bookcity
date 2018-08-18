define(['jquery'], function($) {
    function get(url, callback) {
        var cache = {};
        if (cache[url]) {
            callback(cache[url]);
            return;
        }
        $.ajax({
            url: url,
            async: false,
            dataType: "text",
            success: function(data) {
                cache[url] = data;
                callback(data);
            }
        })
    }
    return get;
});