define(['handlebars', 'jquery'], function(Handlebars, $) {
    return function(text, data, parent) {
        Handlebars.registerHelper("num", function(item) {
            return item === 0 ? 1 : "0" + (item + 1);
        })
        Handlebars.registerHelper("wordCount", function(item) {
            console.log(item)
            return (item / 1000).toFixed(2) + "万";
        })
        $(parent).html(Handlebars.compile(text)(data));
    }
});