var gulp = require('gulp'),
    lint = require('gulp-jshint'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep')
    .stream,
    karma = require('karma')
    .Server,
    bowerFiles = require('main-bower-files');

var src = './static/public/';

// var htmlFiles = [ './templates/*.html',
// ];
///Users/pribeiro/dev/becc/src/github.com/reebayroo/becc/static/main.css
var jsFiles = [
    src + 'app/app.js',
    src + 'app/becc.controller.js',
    src + 'app/constants/**/*.js',
    src + 'app/config/**/*.js',
    src + 'app/modules/**/*.js',
    src + 'app/directives/**/*.js',
    src + 'app/filters/**/*.js',
    src + 'app/services/*.js'
];

gulp.task('lint', function () {
    return gulp.src(jsFiles)
        .pipe(lint())
        .pipe(lint.reporter('default'));
});

// gulp.task('html', function () {
//     return gulp.src(htmlFiles)
//         .pipe(gulp.dest(src + 'app/modules'));
// });

gulp.task('watch', ['lint'], function () {
    gulp.watch(jsFiles, ['lint']);
    //gulp.watch(htmlFiles, ['html']);
});

gulp.task('serve', ['watch']);

gulp.task('default', ['serve']);

gulp.task('test', function () {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        logLevel: "info",
        browsers: ["PhantomJS"]
    });
});
gulp.task('test-watch', ['lint'], function () {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false,
        logLevel: "info",
        browsers: ["PhantomJS"]
    });
});

var fragmentFolder = "./templates/",
    baseHeader = fragmentFolder + "header.tmpl.html";

var wiredepOptions = {
    ignorePath: /\.\./
};
var injectOptions = {
    //ignorePath: "/src/main/resources/static/",
    // transform: function (srcPath, file, i, length) {
    //     return '<script th:src="@{' + srcPath + '(v=${buildSequence})}"></script>';
    // }
};

//
gulp.task('bower', function () {
    gulp.src(baseHeader)
        .pipe(wiredep(wiredepOptions))
        .pipe(inject(
            gulp.src(jsFiles, {
                read: false
            })))
        .pipe(gulp.dest(fragmentFolder));
});