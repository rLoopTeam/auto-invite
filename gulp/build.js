/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const config = require('./lib/config');
const { negate } = require('./lib/helpers');
const compile = require('./lib/compile');

gulp.task('default', ['build']);
gulp.task('build', ['build:js', 'copy:other']);
gulp.task('build:js', () => {
  return compile(config.srcJs.concat(negate(config.tests)), config.dest).stream;
});

gulp.task('copy:other', function copy() {
  return gulp.src(config.srcOther)
    .pipe(gulp.dest(config.dest));
});

