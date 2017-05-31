const test = require('ava');
const firstToUpper = require('../../src/util/firstToUpper');

test(`[util] firstToUpper(): Should make a strings first letter uppercase`, (t) => {
  const testValues = [
    'type',
    'scope',
    'subject',
    'body',
    'breaking',
    'issues',
    'commitConfirmation',
  ];
  const expected = [
    'Type',
    'Scope',
    'Subject',
    'Body',
    'Breaking',
    'Issues',
    'CommitConfirmation',
  ];
  const actual = testValues.map(firstToUpper);
  t.deepEqual(actual, expected);
});
