const test = require('ava');
const getSkipKey = require('../../src/util/getSkipKey');

test(`[util] getSkipKey(): Should prepend extend to the passed in string. Result should be camelcase`, (t) => {
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
    'skipType',
    'skipScope',
    'skipSubject',
    'skipBody',
    'skipBreaking',
    'skipIssues',
    'skipCommitConfirmation',
  ];
  const actual = testValues.map(getSkipKey);
  t.deepEqual(actual, expected);
});
