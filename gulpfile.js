'use strict';

// Include Gulp & tools

var gulp         = require('gulp');
var del          = require('del');
var watch        = require('gulp-watch');
var haml         = require('gulp-haml');
var sass         = require('gulp-sass');
var minifycss    = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var runSequence  = require('run-sequence');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var reload       = browserSync.reload;


// HAML

gulp.task('haml', function() {
  return gulp.src('./app/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('./build'));
});


// SASS

gulp.task('sass', function () {
  return gulp.src('./app/styles/*.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('./build/styles'));
});


// Images Min Task

gulp.task('images', function () {
  return gulp.src('./app/images/**')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./build/images'));
});

// Watch Files & Reload

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch(['./app/index.haml'], ['haml', reload]);
  gulp.watch('./app/styles/**/*.scss', ['sass', reload]);
});


// Clean the Build Output Directory

gulp.task('clean', function() {
  del(['build/*']);
});


// Build

gulp.task('build', ['clean'], function() {
  runSequence('haml', 'sass', 'images');
});


// Gulp Default

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});