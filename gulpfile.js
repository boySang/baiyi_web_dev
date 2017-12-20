var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-minify-css'),
	notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('default',['serve'], function() {
  // 将你的默认的任务代码放在这
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['home','admin'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/home/sass/*.scss", ['home']);
    gulp.watch("src/admin/sass/*.scss", ['admin']);
    gulp.watch("template/**/*.html").on('change', reload);
    gulp.watch("web/**/*.php").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('home', function() {
    return gulp.src('src/home/sass/*.scss')
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(sass())
		.pipe(cssmin())  //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('dist/home/css'))
        .pipe(reload({stream: true}));
});

gulp.task('admin', function() {
    return gulp.src('src/admin/sass/*.scss')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sass())
        .pipe(cssmin())  //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('dist/admin/css'))
        .pipe(reload({stream: true}));
});