const wrap = require('word-wrap');

function formatBreaking(rawBreaking, wrapOptions) {
  const trimmedBreaking = rawBreaking.trim();
  const cleanBreaking = trimmedBreaking ? 'BREAKING CHANGE: ' + trimmedBreaking.replace(/^BREAKING CHANGE: /, '') : '';
  return wrap(cleanBreaking, wrapOptions);
}
module.exports = formatBreaking;