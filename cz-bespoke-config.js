// Consume the package internally

const intializeCommitizen = require('./dist/engine');

module.exports = intializeCommitizen.tweak({
  labels: {
    'type': 'Commit prefix (should match branch)',
    'subject': 'Short version',
    'body': 'Please type full description',
    'commitConfirmation': 'Does this look correct?',
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

  allowCustomScope: true,
  // allowCustomType: true,

  // skipScope: true,
  // skipBreaking: true,
  // skipIssues: true,
  // skipCommitConfirmation: true
});


// // Basic usage
// module.exports = intializeCommitizen();

// // Overhaul usage
// module.exports = intializeCommitizen.overhaul({
//   prompts: [
//     {
//       message: 'Oh hai', // description
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
