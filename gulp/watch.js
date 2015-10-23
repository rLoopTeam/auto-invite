/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const config = require('./lib/config');
const test = require('./test');

const watch = () => {
  config.mocha.opts.reporter = 'min';
  return gulp.watch(config.srcJs, () => {
    test(); // For future reference, this is a Promise
  });
};

gulp.task('watch', ['build'], watch);

module.exports = watch;
