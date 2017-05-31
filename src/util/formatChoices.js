const longest = require('longest');
const rightPad = require('right-pad');

const getLength = (item = {}) => (longest(Object.keys(item)) || '').length + 1;
const format = (maxLength, list) => (item, key) => {
  if (typeof item === 'string') {
    return { name: item, value: item };
  }
  return {
    name: rightPad(item.title + ':', maxLength) + ' ' + item.description,
    value: item.title,
  };
};
const printList = (collection) => collection.map(format(getLength(collection), collection));
const formatChoices = choices => Object.keys(choices).reduce((acc, cur) => {
    acc[cur] = printList(choices[cur]);
    return acc;
  }, {});

module.exports = formatChoices;