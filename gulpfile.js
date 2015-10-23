/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* eslint no-var:0, prefer-const: 0, vars-on-top: 0 */
require('babel/register')({
  only: /\/gulp\//,
});

global.Bluebird = global.Promise = require('bluebird');

require('require-dir')('./gulp');
