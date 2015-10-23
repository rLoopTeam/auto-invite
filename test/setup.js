/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint-env mocha */
var chai = require('chai');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

chai.should();
global.expect = chai.expect;
global.assert = chai.assert;

require('sinomocha')();

