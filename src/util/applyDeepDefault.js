// Normalize options passed into tweak.

const deepDefaults = require('deep-defaults');
const { defaultTypes, defaultPromptLabels } = require('../constants');

const applyDeepDefault = (options) => {
  // Add in missing structure
  const safeOptions = deepDefaults({
    labels: {},
    choices: {},
    validation: {},
    useEditor: {},
  }, options);

  // Fill in any missing values. (package does not handle this as expected)
  safeOptions.choices.type = safeOptions.choices.type || defaultTypes;
  safeOptions.labels = { ...defaultPromptLabels, ...safeOptions.labels };
  safeOptions.subjectLineLength = safeOptions.subjectLineLength || 100;
  safeOptions.bodyLineLength = safeOptions.bodyLineLength || 100;

  return safeOptions;
};

module.exports = applyDeepDefault;