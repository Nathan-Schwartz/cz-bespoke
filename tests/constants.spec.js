const test = require('ava');
const constants = require('../src/constants');

// Flowtype / Typescript would make this obsolete.

test(`[constants.js]: exports an object with toplevel keys: defaultPromptLabels and defaultTypes`, (t) => {
  t.true(typeof constants === 'object')
  t.deepEqual(Object.keys(constants), ['defaultPromptLabels', 'defaultTypes'])
});

test(`constants.js: defaultPromptLabels should be an object where each value is a string`, (t) => {
  const keys = Object.keys(constants.defaultPromptLabels)
  t.true(Object.keys(constants.defaultPromptLabels)
    .map(k => constants.defaultPromptLabels[k])
    .every(k => typeof k === 'string')
  );
});

test(`constants.js: defaultTypes should be an array of objects of shape: { title: '', description: '' }`, (t) => {
  t.true(constants.defaultTypes
    .every(v => typeof v === 'object' && typeof v.title === 'string' && typeof v.description === 'string')
  );
})