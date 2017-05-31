// Normalize options passed into tweak.

const deepDefaults = require('deep-defaults');
const { defaultTypes, defaultPromptLabels } = require('../constants');

const applyDeepDefault = (options) => {
  // Add in missing structure
  const safeOptions = deepDefaults({ labels: {}, choices: {}, validation: {} }, options);

  // Fill in any missing values. (package does not handle this as expected)
  safeOptions.choices.type = safeOptions.choices.type || defaultTypes;
  safeOptions.labels = { ...defaultPromptLabels, ...safeOptions.labels };
  safeOptions.firstLineLength = safeOptions.firstLineLength || 100;
  return safeOptions;
};

module.exports = applyDeepDefault;