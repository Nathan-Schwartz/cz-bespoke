// Consume the package internally

const intializeCommitizen = require('./dist/engine');

module.exports = intializeCommitizen.tweak({
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
  // excludeScope: true,
  // excludeBreaking: true,
  // excludeIssues: true,
});

// module.exports = intializeCommitizen();

// module.exports = intializeCommitizen.overhaul({
//   prompts: [
//     {
//       message: 'Oh ahi', // description
//       type: 'input', // any inquirer type (https://github.com/sboudrias/Inquirer.js#question)
//       name: 'q',
//       // choices: [], // if applicable
//     },
//   ],
//   formatter: (answers, commit, cz) => {
//     // return commit(Object.keys(answers).map(k => JSON.stringify(answers[k])).join(' '));
//     console.log(Object.keys(answers).map(k => JSON.stringify(answers[k])).join(' '))
//   },
// });
