### cz-bespoke

This package may be for you if you liked the power of the commitizen conventional-changelog adapter, but wanted the ability to add or modify presets; change labels; or make your own custom prompts.

1. [Setup](#set-up)
2. [Documentation](#documentation)

### Set up
Note: cz-bespoke is used internally, feel free to reference this project's config.

#### 1. Install commitizen in your repository (if not already installed).

#### 2. Create a javascript file in your repository to be used for configuration.

Basic example: 

`cz-bespoke-config.js`
```js
const intializeCommitizen = require('cz-bespoke');

module.exports = intializeCommitizen();
```

#### 3. Update package configuration to refer to your local config file.

Example package.json entry:
```json
{
  "scripts": {},
  "commitizen": {
    "path": "./cz-bespoke-config.js"
  }
}
```

#### 4. Update the configuration file to reflect your preferences.

The following configuration:
* Changes the subject prompt from "Write a short, imperative tense description of the change:" to "Keep it short, please".
* Does not prompt the user for breaking changes

```js
const intializeCommitizen = require('cz-bespoke');

module.exports = intializeCommitizen.tweak({
  labels: {
    subject: "Keep it short, please"
  }
  skipBreaking: true
});
```

### Documentation

#### initializeCommitizen()
 * Uses the default configuration


#### initializeCommitizen.tweak(tweakOptions)
 * Makes various tweaks to the default configuration
 * The default prompts are 'type', 'scope', 'subject', 'body', 'breaking', and 'issues'. Their names will be used as keys throughout the configuration object. 'commitConfirmation is another default prompt but isnt always configurable. 

```js
// Override any prompts default text
labels: {
  'subject': 'Short version',
  // The other default prompt names are valid keys as well

  // Can also override the confirmation prompt's text (if enabled)
  'commitConfirmation': 'Does this look correct?',
},

// Notify a user that their answer isn't valid, and force them to change it
validation: {
  type: (input, previousAnswers) => {
    // input: value submitted for the prompt with name type (in this case)
    // previousAnswers: object that contains all answers so far
    
    // Should return true if the value is valid, and an error message (String) otherwise.
    return true;
  }
},

// Supply preset options for a prompt. This is technically supported for all prompts, but only encouraged for a few.
// All default prompt names are valid keys. Their values must be an array of strings, or an array of type `{ type: string, description: string }`
choices: {
  type: [
    {
      title: 'feat',
      description: "A new feature",
    },
    {
      title: 'bug',
      description: 'Fixes an existing issue',
    },
    {
      title: 'chore',
      description: 'A task that is neither a bug nor feature',
    },
  ],
  scope: [
    'Build/Publish',
    'Testing',
    'Docs',
  ],
},


// Abominations.
// These are modifications that don't fit into the above and could move in future iterations.
allowCustomScope: true,
allowCustomType: true,

// Some prompts can be skipped.
skipScope: true,
skipBreaking: true,
skipIssues: true,
skipCommitConfirmation: true
```

#### initializeCommitizen.overhaul(overhaulOptions)
 * overhaulOptions: { prompts: Array<InquirerQuestion>, formatter: (answers: Object) => string }
 * Versatility at the cost of convenience. Allows custom prompts and a custom formatter to be passed in. What I refer to as an "InquirerQuestion" is documented in full [here](https://www.npmjs.com/package/inquirer#question). The formatter function will recieve an object with all of the user's answers (documentation available [here](https://www.npmjs.com/package/inquirer#answers)). The format function is expected to return a string, and this string will be used as the commit message.

**Related repos:**

https://github.com/leonardoanalista/cz-customizable

https://github.com/Jimdo/cz-conventional-changelog-custom

https://github.com/commitizen/cz-conventional-changelog

https://github.com/commitizen/cz-cli
