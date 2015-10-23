/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const { spawn } = require('child_process');
const { resolve } = require('path');
const compile = require('./lib/compile');
const config = require('./lib/config');
const { mocha } = require('./lib/plugins');
const { logErrors, toDest, streamToPromise } = require('./lib/helpers');


const runMocha = (type) => {
  return new Promise((good, bad) => {
    config.mocha.files = config.tests[type];
    spawn(config.mocha.pathToMocha, config.mocha.opts, {
      cwd: resolve(__dirname, '..'),
      stdio: 'inherit',
      env: config.mocha.env,
    })
      .on('close', code => code === 0 ? good() : bad('Tests Failed'))
      .on('error', bad);
  });
};

const test = (type) => {
  return compile(config.srcJs, config.dest).promise
    .then((arg) => runMocha(type, arg));
};

const testTaskDeps = ['lint'];
const defineTestTask = (name, type) => gulp.task(name, testTaskDeps, () => test(type));

config.tests.types.map(type => defineTestTask(`test:${type}`, type));
defineTestTask('test', 'all');

module.exports = test;
