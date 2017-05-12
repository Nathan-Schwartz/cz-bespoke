const {
  defaultCommitFormatter,
  defaultPromptBuilder
} = require('./util');


// Main export.
function engine() {
  return engine.tweak();
}
engine.overhaul = function overhaul({ prompts, formatter}) {
 if (prompts && !formatter) {
    throw new Error("If using the overhaul's `options.prompts` option, `option.formatter` must also be supplied.");
  }

  return promptsAndCommit({ 
    prompts: prompts || defaultPromptBuilder(),
    formatter: formatter || defaultCommitFormatter(),
  });
}
engine.tweak = function tweak(options) {
  return promptsAndCommit({ 
    prompts: defaultPromptBuilder(options),
    formatter: defaultCommitFormatter(options),
  });
}


function promptsAndCommit({ prompts, formatter}) {
  // When a user runs `git-cz`, prompter will be executed. 
  // `cz` is an instance of inquirer.js.
  // The `commit` callback will send a commit template back to git.

  return {
    prompter: function(cz, commit) {
      console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n');

      cz.prompt(prompts)
        .then(function(answers) {
          return formatter(answers, commit, cz);
        })
        .catch((...args) => {
          console.log("Unexpected Error:", ...args)
        });
    }
  }
}

module.exports = engine;