// Function to handle the formatting of the commit template.
const wrap = require('word-wrap');
const applyDeepDefault = require('./applyDeepDefault');
const formatHead = require('./formatHead');
const formatBreaking = require('./formatBreaking');


const defaultCommitFormatter = (options) => (answers, commit, inquirer) => {
  const safeOptions = applyDeepDefault(options);

  const wrapOptions = {
    trim: true,
    newline: '\n',
    indent:'',
    width: safeOptions.bodyLineLength
  };

  // Prevent type errors by adding empty data for excluded prompts.
  if (safeOptions.skipScope) answers.scope = '';
  if (safeOptions.skipBreaking) answers.breaking = '';
  if (safeOptions.skipIssues) answers.issues = '';

  // Hard limit this line
  const head = formatHead(answers).slice(0, safeOptions.subjectLineLength)

  // Wrap these lines at specified width
  const body = wrap(answers.body, wrapOptions);

  // Apply breaking change prefix, removing it if already present
  const breaking = formatBreaking(answers.breaking, wrapOptions);

  const issues = wrap(answers.issues, wrapOptions);

  const footer = [ breaking, issues ].filter(x => x).join('\n\n');

  const result = head + '\n\n' + body + '\n\n' + footer;

  if (!safeOptions.skipCommitConfirmation) {
    console.log('------------\n' + result + '----------\n');
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'commitConfirmation',
        message: safeOptions.labels.commitConfirmation
      }
    ]).then(({ commitConfirmation }) => {
      if (commitConfirmation) return commit(result);
    });
  }

  commit(result);
}
module.exports = defaultCommitFormatter;
