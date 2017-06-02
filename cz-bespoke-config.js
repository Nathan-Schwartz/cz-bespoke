// Consume the package internally

const intializeCommitizen = require('./dist/engine');

module.exports = intializeCommitizen.tweak({
  labels: {
    'type': 'Type of change',
    'subject': 'Brief summary of changes',
    'body': 'Please add the full description',
    'commitConfirmation': 'Does this look correct?',
  },
  useEditor: {
    body: true
  },
  allowCustomScope: true,
  // allowCustomType: true,

  // skipScope: true,
  // skipBreaking: true,
  // skipIssues: true,
  // skipCommitConfirmation: true
  subjectLineLength: 50,
  bodyLineLength: 70
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
