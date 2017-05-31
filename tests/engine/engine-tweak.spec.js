const test = require('ava');
const engine = require('../../src/engine');
const {
  promptAndCommit,
  defaultCommitFormatter,
  defaultPromptBuilder,
  createSpy,
} = require('../../src/util');

const dumbDeepEqual = (t, a, b) => t.is(JSON.stringify(a), JSON.stringify(b));

test(`[engine.js] engine.tweak(): should correctly utilize helper functions to configure prompts and format. Should return a cz configobject.`, (t) => {
  const config = {
    labels: {
      'type': 'Commit prefix (should match branch)',
      'subject': 'Short version',
      'body': 'Please type full description',
    },
    choices: {
      type: [
        {
          title: 'feat',
          description: "A new feature",
        },
        {
          title: 'bug',
          description: 'Fixes an existing issue',
        },
        {
          title: 'chore',
          description: 'A task that is neither a bug nor feature',
        },
      ],
      scope: [
        'Build/Publish',
        'Testing',
        'Docs',
      ],
    },
  };

  // Spies should not be called
  t.is(promptAndCommit.callCount, 0);
  t.is(defaultPromptBuilder.callCount, 0);
  t.is(defaultCommitFormatter.callCount, 0);

  // Store actual value.
  const actual = engine.tweak(config);

  // defaultPrompBuilder and defaultCommitFormatter should both be passed config.
  t.is(defaultPromptBuilder.callCount, 1);
  t.deepEqual(defaultPromptBuilder.calledWith[0], [config]);
  t.is(defaultCommitFormatter.callCount, 1);
  t.deepEqual(defaultCommitFormatter.calledWith[0], [config]);

  t.is(promptAndCommit.callCount, 1);

  // The results of defaulPromptBuilder and defaultCommitFormatter should have been used
  // to build a config object. Later would be passed into promptAndCommit
  const expectedPromptAndCommitArgs = {
    prompts: defaultPromptBuilder(config),
    formatter: defaultCommitFormatter(config),
  };

  // An identical config object should have been passed into promptAndCommit.
  dumbDeepEqual(t, promptAndCommit.calledWith[0], [expectedPromptAndCommitArgs])

  // The result of promptAndCommit should be returned by engine.tweak.
  const expected = promptAndCommit(expectedPromptAndCommitArgs);

  dumbDeepEqual(t, expected, actual);
});
