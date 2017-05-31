// defaultTypes courtesy of https://github.com/adjohnson916/conventional-commit-types

module.exports = {
  defaultPromptLabels: {
    type: 'Select the type of change that you\'re committing:',
    scope: 'Denote the scope of this change:\n',
    subject: 'Write a short, imperative tense description of the change:\n',
    body: 'Provide a longer description of the change:\n',
    breaking: 'List any breaking changes:\n',
    issues: 'List any issues closed by this change:\n',
    commitConfirmation: 'Are you sure you want to make this commit?',
  },
  defaultTypes: [
    {
      title: 'feat',
      description: 'A new feature',
    },
    {
      title: 'fix',
      description: 'A bug fix',
    },
    {
      title: 'docs',
      description: 'Documentation only changes',
    },
    {
      title: 'style',
      description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    },
    {
      title: 'refactor',
      description: 'A code change that neither fixes a bug nor adds a feature',
    },
    {
      title: 'perf',
      description: 'A code change that improves performance',
    },
    {
      title: 'test',
      description: 'Adding missing tests or correcting existing tests',
    },
    {
      title: 'build',
      description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    },
    {
      title: 'ci',
      description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
    },
    {
      title: 'chore',
      description: 'Other changes that don\'t modify src or test files',
    },
    {
      title: 'revert',
      description: 'Reverts a previous commit',
    },
  ],
};