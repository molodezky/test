var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync');

gulp.task('sass', function () {
    return gulp.src('app/sass/style.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

gulp.task('css-min', ['sass'], function() {
    return gulp.src('app/css/style.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: { 
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/style.sass', ['sass']);
    gulp.watch('app/fonts/*', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('build', ['sass'], function() {

    var buildCss = gulp.src([
        'app/css/style.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'))
    
    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});