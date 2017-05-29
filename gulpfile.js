var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var env = require('gulp-env');
var args = require('yargs').argv;
var series = require('stream-series');
var inject = require('gulp-inject');

var envMode = args.env ? args.env : 'local';

gulp.task('styles', function () {
  return sass('public/css/scss/*.scss', {
      style: 'expanded'
    })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});

gulp.task('scripts', function () {
  return gulp.src('public/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});

gulp.task('ejs', function () {
  return gulp.src('views/**/*.ejs')
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('public/css/**/*.scss', ['styles']);
  gulp.watch('public/js/*.js', ['scripts']);
  gulp.watch('views/**/*.ejs', ['ejs']);
});

gulp.task('inject-files', function () {

  var moduleStream = gulp.src(['./public/js/app.module.js'], {read: false});
  var routeStream = gulp.src(['./public/js/route-config.js'], {read: false});
  var contrlStream = gulp.src(['./public/js/controllers/*.js'], {read: false});
  var factoriesStream = gulp.src(['./public/js/factories/*.js'], {read: false});
  var componentStream = gulp.src(['./public/js/components/**/*.js'], {read: false});

  gulp.src('./views/index.ejs')
    .pipe(inject(
      series(moduleStream, routeStream, factoriesStream, contrlStream, componentStream)
      , {
          transform: function (filepath) {
            if (filepath.slice(0,8) === '/public/') {
              filepath = filepath.slice(8);
            }
            // Use the default transform as fallback: 
            return inject.transform.apply(inject.transform, arguments);
          }
        }
      ))
    .pipe(gulp.dest('./views'));
});

gulp.task('server',['inject-files'], function () {
  nodemon({
    'script': 'app.js',
    'tasks':['inject-files']
    //'ignore': 'public/js/*.js'
  });
});

gulp.task('set-env', function () {
  if (envMode == 'local') {
    env({
      vars: {
        MONGO_URI: "mongodb://localhost:27017/product",
        PORT: 3000
      }
    });
  } else if (envMode == 'dev') {
    env({
      vars: {
        //MONGO_URI: "mongodb://chetan:download1@ds133279.mlab.com:33279/vod",
        MONGO_URI: "mongodb://chetan:chetan@2109@ds155811.mlab.com:55811/product-newput",
        PORT: 3000
      }
    });
  }
});

gulp.task('heroku-build',['inject-files'], function(){
  env({
      vars: {
        MONGO_URI: "mongodb://chetan:@ds155811.mlab.com:55811/product-newput",
        PORT: 3000
      }
    });
})

gulp.task('default', ['set-env','server', 'watch']);