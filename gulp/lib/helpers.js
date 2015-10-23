/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const { src, dest } = require('./config');

const logErrorsHandler = (err) => {
  if (err.message) console.error(err.message);
  if (err.stack) console.error(err.stack);
};

module.exports.logErrors = stream => stream.on('error', logErrorsHandler);

module.exports.negate = (paths) => {
  if (!(paths instanceof Array)) paths = [paths];
  return paths.map(path => `!${path}`);
};
module.exports.toDest = (paths) => {
  if (!(paths instanceof Array)) paths = [paths];
  return paths.map(path => path.replace(src, dest));
};

module.exports.noop = () => {};

module.exports.streamToPromise = (stream) => {
  let isDone = false;
  return new Promise((good, bad) => {
    stream.once('error', (err) => {
      if (isDone) return;
      isDone = true;
      bad(err);
    });

    stream.once('end', () => {
      if (isDone) return;
      isDone = true;
      good(stream);
    });
  })
};
