'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var tslint = require('gulp-tslint');
var typescript = require('gulp-typescript');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var size = require('gulp-size');
var autoprefixer = require('gulp-autoprefixer');
var merge = require('merge2');
var livereload = require('gulp-livereload');

gulp.task('bower-wiredep-html', function () {
  return gulp.src('app/index.html')
    .pipe(wiredep({ignorePath: '..'}))
    .pipe(gulp.dest('app'));
});

gulp.task('bower-wiredep-js', function () {
  return gulp.src('app/index.html')
    .pipe(wiredep({ignorePath: '..'}))
    .pipe(gulp.dest('app'));
});

gulp.task('bower-wiredep', ['bower-wiredep-js']);

gulp.task('inject', function (cb) {
  var target = gulp.src('app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['scripts/**/*.js', 'styles/*.css'], {read: false, cwd: 'app/'});

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('app'));

  cb();
});

gulp.task('connect', ['inject'], function (cb) {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({port: 35729}))
    .use(connect.static('app'))
    .use(connect.directory('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });

  cb();
});

gulp.task('tslint', function (cb) {
  var stream = gulp.src('app/ts/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
  cb();
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    //.pipe(jshint())
    //.pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(size());
});

gulp.task('styles', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}))
//        .pipe($.notify("Compilation complete."))
    ;
});

gulp.task('server', ['tslint', 'ts', 'connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});


gulp.task('ts', function (cb) {
  var stream = gulp.src('app/ts/**/*.ts')
    .pipe(typescript({}, {
      target: 'ES5',
      sortOutput: true,
      noExternalResolve: true
    }, typescript.reporter.defaultReporter()))
    .pipe(gulp.dest('./app/scripts'));
  cb();
});


gulp.task('watch', function () {
  var server = livereload();

  gulp.watch('app/sass/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/ts/**/*.ts', ['ts']);
  gulp.watch([
    'app/*.html',
    'app/styles/**/*.css',
    'app/sass/**/*.scss',
    'app/scripts/**/*.js',
    'app/ts/**/*.ts'
  ]).on('change', function (file) {
    server.changed(file.path);
  });

});


