/* (c) 2015 EMIW, LLC. emiw.xyz/license */

module.exports = require('load-deps')('gulp-*', {
  renameKey: name => name.replace(/^gulp-/, ''),
});
