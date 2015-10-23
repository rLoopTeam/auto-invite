/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const config = require('./lib/config');
const { eslint } = require('./lib/plugins');

const lint = () => {
  return gulp.src(config.srcJs.concat(config.lint.other))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

gulp.task('lint', lint);

module.exports = lint;
