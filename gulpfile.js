'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    clean = require('gulp-clean');


gulp.task('connect', function () {
    connect.server({
        port: 1703,
        root: './src',
        livereload: true
    });
});

gulp.task('clean', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean'], function () {
    gulp.src('./src/css/main.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('build/css'));

    gulp.src('./src/index.html')
        .pipe(gulp.dest('build'));
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));
    gulp.src('./src/img/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('sass', function () {
    gulp.src('./src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/css/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'sass', 'html', 'watch']);
