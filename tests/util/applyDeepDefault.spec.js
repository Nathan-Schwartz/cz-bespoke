const test = require('ava');
const applyDeepDefault = require('../../src/util/applyDeepDefault');
const { defaultTypes, defaultPromptLabels } = require('../../src/constants');

test('[util] applyDeepDefault(): Should supplement options when needed. Should add default values when data is missing.', (t) => {

  // This is the expected default if no customizations were present;
  const base = { validation: {}, labels: defaultPromptLabels, choices: { type: defaultTypes }, firstLineLength: 100 }

  // This is a fully customized config
  const totalCustom = {
    firstLineLength: 50,
    labels: {
      type: 'not default type',
      scope: 'not default scope',
      subject: 'not default subject',
      body: 'not default body',
      breaking: 'not default breaking',
      issues: 'not default issues',
      commitConfirmation: 'not default commitConfirmation',
    },
    choices: {
      type: [
        { title: 'hi', description: 'there' },
      ],
    },
    validation: {},
  };
  const testCases = [
    // Incorrect (should be object)
    {
      initial: { labels: [] },
      expected: { labels: defaultPromptLabels, choices: { type: defaultTypes }, firstLineLength: 100, validation: {} }
    },

    // Incomplete
    {
      initial: undefined,
      expected: base
    },
    {
      initial: {},
      expected: base
    },
    {
      initial: { choices: { type: [{ title: 'hi', description: 'there' }] } },
      expected: { ...base, choices: { type: [{ title: 'hi', description: 'there' }] } }
    },
    {
      initial: { labels: { subject: 'custom' } },
      expected: { ...base, labels: { ...base.labels, subject: 'custom' } },
    },
    {
      initial: { choices: {} },
      expected: base,
    },

    // Complete
    { 
      initial: totalCustom,
      expected: totalCustom,
    },
  ];

  testCases
    .map(tCase => {
      tCase.actual = applyDeepDefault(tCase.initial);
      return tCase;
    })
    .forEach(tCase => {
      t.deepEqual(tCase.actual, tCase.expected);
    });
});