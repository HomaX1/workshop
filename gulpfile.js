'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css');


gulp.task('connect', function() {
    connect.server({
        port: 1703,
        root: './src',
        livereload: true
    });
});

gulp.task('sass', function() {
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
        // .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'sass', 'html', 'watch']);
