/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const del = require('del');
const config = require('./lib/config');

const clean = () => {
  return del([config.dest].concat(config.clean.other));
};

gulp.task('clean', clean);

module.exports = clean;
