const firstToUpper = require('./firstToUpper');

const getSkipKey = (str) => 'skip' + firstToUpper(str);

module.exports = getSkipKey;