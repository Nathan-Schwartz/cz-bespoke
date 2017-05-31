const defaultPromptBuilder = require('./defaultPromptBuilder');
const defaultCommitFormatter = require('./defaultCommitFormatter');
const promptAndCommit = require('./promptAndCommit');
const createSpy = require('./createSpy');

// Conditionally export spies for testing purposes
if (process.env.NODE_ENV === 'test') {
  module.exports = {
    defaultCommitFormatter: createSpy({ callAndReturn: defaultCommitFormatter }),
    defaultPromptBuilder: createSpy({ callAndReturn: defaultPromptBuilder }),
    promptAndCommit: createSpy({ callAndReturn: promptAndCommit }),
    createSpy,
  };
} else {
  module.exports = {
    defaultCommitFormatter,
    defaultPromptBuilder,
    promptAndCommit,
  }; 
}