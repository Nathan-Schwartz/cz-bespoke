function promptAndCommit({ prompts, formatter}) {
  // When a user runs `git-cz`, prompter will be executed. 
  // `inquirer` is an instance of inquirer.js.
  // The `commit` callback will send a commit template back to git.

  return {
    prompter: (inquirer, commit) =>
      inquirer
        .prompt(prompts)
        .then(answers => formatter(answers, commit, inquirer))
  }
}

module.exports = promptAndCommit;