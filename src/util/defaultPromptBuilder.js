const applyDeepDefault = require('./applyDeepDefault');
const formatChoices = require('./formatChoices');
const formatHead = require('./formatHead');
const getSkipKey = require('./getSkipKey');
const firstToUpper = require('./firstToUpper');
const inquirer = require('inquirer');


function defaultPromptBuilder(options) {
  const safeOptions = applyDeepDefault(options);

  // Convert choices into an Inquirer friendly format
  safeOptions.choices = formatChoices(safeOptions.choices);

  // Tweak default prompts as needed. Using reduce so we can add additional items to the array.
  return ['type', 'scope', 'subject', 'body', 'breaking', 'issues']
    .reduce((acc, key) => {

      let realAnswers;

      // Ensure that choices is an array, both for type consistency and ease of use. 
      const choices = safeOptions.choices[key] || [];

      // If the value of this key is true and input type is a list, 
      // we will want to add an additional prompt that allows text input
      const customKey = "allowCustom" + firstToUpper(key);
      const allowCustom = choices.length > 0 && safeOptions[customKey];

      // Adds in a non-selectable divider and the option to allow typing.
      if (allowCustom) {
        choices.push(
          new inquirer.Separator(),
          { name: 'custom', value: 'custom' }
        );
      }

      const sharedConfig = {
        // If presets have been provided for this prompt, change to `list` input type
        type: (choices.length > 0) ? 'list' : 'input',
        message: safeOptions.labels[key],
        name: key,
        validate: (input) => {
          // We track the value of answers in a variable because validate doesn't pass in the current answers.
          realAnswers[key] = input;

          // If a custom validator is specified, use it.
          if (safeOptions.validation[key]) {
            return safeOptions.validation[key](input, realAnswers);
          }

          // If no custom validator for subject, check the line length.
          if (key === 'subject') {
            realAnswers.scope = realAnswers.scope || '';
            if(formatHead(realAnswers).length > safeOptions.firstLineLength) {
              return `The subject you enterred is ${formatHead(realAnswers).length - safeOptions.firstLineLength} characters too long.`;
            }
          }
          return true;
        }
      }

      acc.push({
        ...sharedConfig,
        ...(choices.length > 0) ? {choices} : {},
        when: (answers) => {
          // We do this because validate doesn't pass in the answers, 
          // and we need to validate based on multiple fields.
          realAnswers = answers;
          return ! safeOptions[getSkipKey(key)]
        },
      })

      if (allowCustom) {
        acc.push({
          ...sharedConfig,
          type: 'input',
          when: (answers) => answers[key] === "custom",
        });
      }

      return acc;
    }, []);
}
module.exports = defaultPromptBuilder;