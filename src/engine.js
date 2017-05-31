const {
  defaultCommitFormatter,
  defaultPromptBuilder,
  promptAndCommit,
} = require('./util');

// `engine` will use all of the default settings if invoked.
function engine() {
  return engine.tweak();
}

// `engine.overhaul` uses a configuration object with only 2 properties: formatter and prompts.
// These two properties can be used to change the entire experience.
engine.overhaul = function overhaul({ prompts, formatter}) {
  if (prompts && !formatter) {
    throw new Error("If using the overhaul's `options.prompts` option, `option.formatter` must also be supplied.");
  }

  return promptAndCommit({ 
    prompts: prompts || defaultPromptBuilder(),
    formatter: formatter || defaultCommitFormatter(),
  });
}

// `engine.tweak` takes a more complex configuration object and aims to provide a high level of customization, 
// while still adhering to the conventional-commit standard.
engine.tweak = function tweak(options) {
  return promptAndCommit({ 
    prompts: defaultPromptBuilder(options),
    formatter: defaultCommitFormatter(options),
  });
}

module.exports = engine;