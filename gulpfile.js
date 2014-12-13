var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var notify = require("gulp-notify");
var watch = require('gulp-watch');
var cssGlobbing = require('gulp-css-globbing');

var config = {
  port: 3000
}

/**
 *  Browserify Task
 *
 *  Browserify the app.js file
 */
gulp.task('browserify', function() {

  gulp.src('./client/app/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: true,
      transform: ['reactify']
    }))
    .on('error', function (err) {
      notify('Gulp: Browserify Error')
      console.log(err.message);
    })

    .pipe(rename('app.bundle.js'))

    // Output it to our dist folder
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

/**
 * Sass Task
 *
 * Compile sass -> css
 */
gulp.task('sass', function () {
  return gulp.src('./client/**/*.scss')
    .pipe(sass({
      sourcemap: true,
      sourcemapPath: '../scss',
      bundleExec: false,
      require: 'sass-globbing'
    }))
    .on('error', function (err) {
      notify('Gulp: Sass Error')
    })
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

/**
 * HTML Task
 *
 * Move index.html –> ./build
 */
gulp.task('html', function() {
  return gulp.src('./client/index.html')
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

/**
 *  Watch Task
 */
gulp.task('watch', ['browserify', 'sass', 'html'], function() {

  watch('./client/app/**/*.js', function() {
    gulp.start('browserify');
  });

  watch('./client/index.html', function() {
    gulp.start('html');
  });

  watch(['./client/app/components/**/*.scss', './client/styles/**/*.scss'], function() {
    gulp.start('sass');
  });
});

/**
 *  Serve Task
 *
 *  Setup livereload, watch tasks
 */
gulp.task('serve', ['watch'], function() {

  connect.server({
    root: ['build'],
    port: config.port,
    livereload: true
  });

  process.stdout.write('Server listening on port ' + config.port + ' \n');
});