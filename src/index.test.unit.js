/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint-env mocha */
const rewire = require('rewire');

describe('index', () => {
  let index;
  beforeEach(() => {
    index = rewire('./index');
  });

  it('should do something', () => {
    expect(index).to.not.throw();
  });
});
