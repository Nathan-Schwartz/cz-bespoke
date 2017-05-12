### cz-bespoke

This package may be for you if you liked the power of the commitizen conventional-changelog adapter, but wanted the ability to add or modify presets; change labels; or make your own custom prompts.

### Set up:
Note: cz-bespoke is used internally, feel free to reference this projects config.

1. Install commitizen in your repository (if not already installed).

2. Create a javascript file in your repository to be used for configuration.

Basic example: 

`cz-bespoke-config.js`
```js
const intializeCommitizen = require('cz-bespoke');

module.exports = intializeCommitizen();
```

3. Update package configuration to refer to your local config file.

Example package.json entry:
```json
{
  "scripts": {},
  "commitizen": {
    "path": "./cz-bespoke-config.js"
  }
}
```

4. Update the configuration file to reflect your preferences.

The following configuration:
* Changes the subject prompt from "Write a short, imperative tense description of the change:" to "Keep it short, please".
* Does not prompt the user for breaking changes

```js
const intializeCommitizen = require('cz-bespoke');

module.exports = intializeCommitizen.tweak({
  labels: {
    subject: "Keep it short, please"
  }
  excludeBreaking: true
});
```

TODO: List type with option to change to input?
TODO: Document the rest of the API
