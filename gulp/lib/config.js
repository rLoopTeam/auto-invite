/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const { resolve, join } = require('path');

const config = {};

config.basePath = resolve(__dirname, '..', '..');
const basePath = (...paths) => resolve(config.basePath, ...paths);

config.src = basePath('src');
config.dest = basePath('build');
config.spikes = basePath('spikes');

config.srcJs = [join(config.src, '**', '*.js')];
config.srcOther = [join(config.src, '**'), '!**/*.js'];

config.lint = {
  other: [resolve(__dirname, '..'), join(config.spikes, '**', '*.js')],
};

config.clean = {
  other: [basePath('coverage')],
};

config.tests = {
  // The rest is auto generated later, for maximum DRYness, using the path `$src/**/*.test.$type.js`
  types: ['unit', 'int', 'all'],
};
config.tests.types.forEach(type => config.tests[type] = join(config.src, '**', `*.test.${type}.js`));
// We have to override this here, because we don't want the path to be `$src/**/*.test.all.js`
config.tests.all = join(config.src, '**', '*.test.*.js');


config.codeCoverage = {
  thresholds: {
    statements: 90,
    functions: 90,
    branches: 90,
    lines: 90
  },
};

config.mocha = {
  // Because of child_process.spawn nonsense, we have to specify the option name and value as seperate strings.
  args: [
    '--require', basePath('test', 'setup.js'),
  ],

  files: config.tests.all,

  get opts() {
    return config.mocha.args.concat([config.mocha.files.replace(config.src, config.dest)]);
  },

  pathToMocha: resolve(__dirname, '..', '..', 'node_modules', '.bin', 'mocha'),

  env: Object.assign({}, process.env, {
    NODE_ENV: 'test',
  }),
};

config.babel = {
  opts: {
    babelrc: basePath('.babelrc'),
  }
};

module.exports = config;
