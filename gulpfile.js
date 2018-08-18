var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var autoprefixer = require("gulp-autoprefixer");
var url = require('url');
var path = require('path');
var fs = require('fs');
var mock = require("./mock/index");
console.log(mock)
gulp.task("css", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(concat("index.css"))
        .pipe(gulp.dest("./src/css/"))
})

function watch() {
    return gulp.watch("./src/scss/*.scss", gulp.series("css"))
}

gulp.task('serve', function() {
    return gulp.src('./src/')
        .pipe(server({
            port: 8282,
            open: true,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    res.end('');
                    return;
                };
                var url1 = decodeURI(req.url)
                if (/^\/api/.test(url1)) {
                    res.end(mock(url1))
                } else {
                    var pathname = url.parse(req.url).pathname;
                    pathname = /(\.css|\.js|\.html|\.png|\.jpg)$/.test(pathname) ? pathname : "index.html";
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }))
})
gulp.task("default", gulp.series("serve", watch))