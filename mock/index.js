var bookcity = require("./home.json");
var bookshelf = require("./recommend1.json");
var page2 = require("./recommend2.json");
var page3 = require("./recommend3.json");
var detail = require("./352876.json");
var read1 = require("./data1.json");
var read2 = require("./data2.json");
var read3 = require("./data3.json");
var read4 = require("./data4.json");
var chapter = require('./chapter-list.json');
var searchKey = require('./searchKey.json');
var search = require('./search.json');
var data = {
    '/api/bookcity': bookcity,
    '/api/bookshelf': bookshelf,
    '/api/bookcityLoad?pagenum=1': bookshelf,
    '/api/bookcityLoad?pagenum=2': page2,
    '/api/bookcityLoad?pagenum=3': page3,
    '/api/detail?id=352876': detail,
    '/api/read?bookid=352876&char=1': read1,
    '/api/read?bookid=352876&char=2': read2,
    '/api/read?bookid=352876&char=3': read3,
    '/api/read?bookid=352876&char=4': read4,
    '/api/read?bookid=352876': chapter,
    '/api/hotkey': searchKey
        // '/api/search?key': search
}
module.exports = function(url) {
    if (url.match('search')) {
        var key = url.split('=')[1];
        var target = [];
        search.items.forEach(function(item) {
            if (item.title.match(key)) {
                target.push(item)
            }
        });
        return JSON.stringify(target);
    } else {
        return JSON.stringify(data[url])
    }

}