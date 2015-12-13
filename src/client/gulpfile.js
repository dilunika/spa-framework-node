/**
 * Created by dilunika on 28/11/15.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFileSort = require('gulp-angular-filesort');
var strip = require('gulp-strip-line');
var templateCache = require('gulp-angular-templatecache');


gulp.task('buildMenuTemplateCache', function(){

    return gulp
        .src([
            './modules/menu/**/*.html'
        ])
        .pipe(templateCache({
            root: 'modules/menu/',
            module: 'spaMenu'
        }))
        .pipe(gulp.dest('./modules/menu/'));
});

gulp.task('buildDashboardTemplateCache', function(){

    return gulp
        .src([
            './modules/dashboard/**/*.html'
        ])
        .pipe(templateCache({
            root: 'modules/dashboard/',
            module: 'spaDashboard'
        }))
        .pipe(gulp.dest('./modules/dashboard/'));
});

gulp.task('buildFrameworkTemplateCache', function(){

    return gulp
        .src([
            './modules/framework/**/*.html'
        ])
        .pipe(templateCache({
            root: 'modules/framework/',
            module: 'spaFramework'
        }))
        .pipe(gulp.dest('./modules/framework/'));
});

gulp.task('buildJavascript',function(){

    return gulp
        .src([
            './modules/**/*.js'
        ])
        .pipe(angularFileSort())
        .pipe(strip('use strict'))
        .pipe(concat('spaframework.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('buildCSS',function(){

    return gulp
        .src([
            './modules/**/*.css'
        ])
        .pipe(concat('spaframework.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('buildTemplates',['buildMenuTemplateCache','buildDashboardTemplateCache','buildFrameworkTemplateCache']);

gulp.task('default', ['buildTemplates','buildJavascript','buildCSS']);