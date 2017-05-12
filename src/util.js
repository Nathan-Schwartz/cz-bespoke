const longest = require('longest');
const rightPad = require('right-pad');
const wrap = require('word-wrap');
const constants = require('./constants');
const deepDefaults = require('deep-defaults');


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
const firstToUpper = (str) => str[0].toLocaleUpperCase() + str.slice(1);
const getExcludeKey = (str) => 'exclude' + firstToUpper(str);
const printList = (collection) => collection.map(format(getLength(collection), collection));

const formatChoices = choices => Object.keys(choices).reduce((acc, cur) => {
    acc[cur] = printList(choices[cur]);
    return acc;
  }, {});
function formatHead(answers) {
  const scope = answers.scope.trim() ? '(' + answers.scope.trim() + ')' : '';
  return answers.type + scope + ': ' + answers.subject.trim();
}
function formatBreaking(rawBreaking, wrapOptions) {
  const trimmedBreaking = rawBreaking.trim();
  const cleanBreaking = trimmedBreaking ? 'BREAKING CHANGE: ' + trimmedBreaking.replace(/^BREAKING CHANGE: /, '') : '';
  return wrap(cleanBreaking, wrapOptions);
}

const applyDeepDefault = (target) => {
  const safe = deepDefaults({ labels: {}, choices: {} }, target);
  safe.choices.type = safe.choices.type || constants.defaultTypes;
  safe.firstLineLength = safe.firstLineLength || 100;
  return safe;
}


function defaultPromptBuilder(options) {
  const safeOptions = applyDeepDefault(options);

  // Merge in any missing labels
  safeOptions.labels = { ...constants.defaultPromptLabels, ...safeOptions.labels };

  // Convert choices into an Inquirer friendly format
  safeOptions.choices = formatChoices(safeOptions.choices);

  // Tweak default prompts as needed
  return ['type', 'scope', 'subject', 'body', 'breaking', 'issues']
    .map(key => {
      // If presets have been provided for this prompt,
      // change to `list` input type, and add the choices key.
      let realAnswers;
      const choices = safeOptions.choices[key] || [];
      return {
        type: (choices.length > 0) ? 'list' : 'input',
        message: safeOptions.labels[key],
        name: key,
        ...(choices.length > 0) ? {choices} : {},
        when: (answers) => {
          realAnswers = answers
          return ! safeOptions[getExcludeKey(key)]
        },
        validate: (input) => {
          if (key === 'subject') {
            realAnswers.scope = realAnswers.scope || '';
            realAnswers.subject = input;
            if(formatHead(realAnswers).length > safeOptions.firstLineLength) {
              return `The subject you enterred is ${formatHead(realAnswers).length - safeOptions.firstLineLength} characters too long.`;
            }
          }
          return true;
        }
        // Change to reduce so we can use when, filter, validate well
        // new cz.Separator(),
        // { name: 'empty', value: '' },
        // { name: 'custom', value: 'custom' }
      };
    });
}

const defaultCommitFormatter = (options) => (answers, commit, cz) => {
    const safeOptions = applyDeepDefault(options);
    const wrapOptions = {
      trim: true,
      newline: '\n',
      indent:'',
      width: safeOptions.firstLineLength
    };


    // Prevent type errors by adding empty data for excluded prompts.
    if (safeOptions.excludeScope) answers.scope = '';
    if (safeOptions.excludeBreaking) answers.breaking = '';
    if (safeOptions.excludeIssues) answers.issues = '';

    // Hard limit this line
    const head = formatHead(answers).slice(0, safeOptions.firstLineLength)

    // Wrap these lines at 100 characters
    const body = wrap(answers.body, wrapOptions);

    // Apply breaking change prefix, removing it if already present
    const breaking = formatBreaking(answers.breaking, wrapOptions);

    const issues = wrap(answers.issues, wrapOptions);

    const footer = [ breaking, issues ].filter(x => x).join('\n\n');

    const result = head + '\n\n' + body + '\n\n' + footer;

    commit(result);
  }

module.exports = {
  formatChoices,
  formatBreaking,
  formatHead,
  getExcludeKey,
  defaultCommitFormatter,
  defaultPromptBuilder
};