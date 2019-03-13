const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const data = require('gulp-data');
const fs = require('fs');
const argv = require('yargs').argv;

var theme = (argv.theme === undefined) ? "default" : argv.theme;

gulp.task('pug', function() {
  return gulp.src('src/themes/' + theme + '/pug/index.pug')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('data.json'))
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src('src/themes/' + theme + '/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

var watch = function(done) {
  console.log('Watching files for changes');
  gulp.watch('src/themes/' + theme + '/pug/*.pug', gulp.series('pug'));
  gulp.watch('src/themes/' + theme + '/scss/*.scss', gulp.series('sass'));
  done();
};

gulp.task('build', gulp.series('pug', 'sass'));
gulp.task('watch', watch);
gulp.task('default', gulp.series('build', 'watch'));
