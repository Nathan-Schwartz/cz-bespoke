function promptAndCommit({ prompts, formatter}) {
  // When a user runs `git-cz`, prompter will be executed. 
  // `inquirer` is an instance of inquirer.js.
  // The `commit` callback will send a commit template back to git.

  return {
    prompter: function(inquirer, commit) {
      console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n');
      
      return inquirer.prompt(prompts)
        .then(function(answers) {
          return formatter(answers, commit, inquirer);
        })
        .catch((...args) => {
          console.log("Unexpected Error:", ...args)
        });
    }
  }
}

module.exports = promptAndCommit;