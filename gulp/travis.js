/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const { exec } = require('child_process');
const { resolve } = require('path');
const { basePath } = require('./lib/config');
const testCov = require('./test-cov');


const lcov = resolve(basePath, 'coverage', 'lcov.info');
const coveralls = resolve(basePath, 'node_modules', 'coveralls', 'bin', 'coveralls.js');
const coverageUploadCommand = `cat ${lcov} | ${coveralls} -v; echo "Coverage Uploaded"`;

const uploadCoverage = () => {
  // Only upload coverage once
  if ((process.env.TRAVIS_JOB_NUMBER || '0.1').split('.').pop() !== '1') return;

  return new Promise((good, bad) => {
    exec(coverageUploadCommand, (err, stdout, stderr) => {
      console.log(stdout);
      console.error(stderr);
      console.error(err);
      good();
    });
  });
};

const travis = () => {
  return testCov(process.env.TEST_TYPES || 'all')
    .finally(uploadCoverage);
};

gulp.task('travis', ['lint'], travis);

module.exports = travis;
module.exports.uploadCoverage = uploadCoverage;
