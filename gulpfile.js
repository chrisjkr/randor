const gulp = require('gulp')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')

const paths = {
  js: ['./src/**/*.js'],
  html: ['./src/**/*.html'],
  css: ['./src/**/*.css']
}

gulp.task('default', ['js', 'html', 'css'], function () {
  return true
})

gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', ['js', 'html', 'css'], function () {
  gulp.watch(paths.js, ['js'])
  gulp.watch(paths.html, ['html'])
  gulp.watch(paths.css, ['css'])
})