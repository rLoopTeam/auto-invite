/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const _ = require('lodash');
const { spawn } = require('child_process');
const { resolve } = require('path');
const config = require('./lib/config');
const test = require('./test');

const node_modules = resolve(config.basePath, 'node_modules', '.bin');
const istanbul = resolve(node_modules, 'istanbul');
const _mocha = resolve(node_modules, '_mocha');

const changeMochaOptions = () => {
  let originalMochaConfig = _.cloneDeep(config.mocha);
  config.mocha.pathToMocha = istanbul;
  config.mocha.args.unshift('cover', _mocha, '--');

  return () => config.mocha = originalMochaConfig;
};

const checkCoverage = () => {
  return new Promise((good, bad) => {
    const istanbulArgs = _.flatten(Object.keys(config.codeCoverage.thresholds).map((key) => {
      return [`--${key}`, config.codeCoverage.thresholds[key]]
    }));

    spawn(istanbul, ['check-coverage', ...istanbulArgs], { cwd: config.basePath, stdio: 'inherit' })
      .on('close', code => code === 0 ? good() : bad('Code Coverage Failed'))
      .on('error', bad);
  });
};


const testCov = (type) => {
  const revertMochaOptions = changeMochaOptions();
  return test(type)
    .finally(revertMochaOptions)
    .then(checkCoverage);
};

const defineTestCovTask = (name, type) => gulp.task(name, () => testCov(type));

config.tests.types.map(type => defineTestCovTask(`test:${type}:cov`, type));
defineTestCovTask('test:cov', 'all');

module.exports = testCov;
