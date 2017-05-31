const test = require('ava');
const promptAndCommit = require('../../src/util/promptAndCommit');
const createSpy = require('../../src/util/createSpy');

test('[util] promptAndCommit(): Should run inquirer with the passed in prompts and include the resulting answers in a call to formatter.', (t) => {

  const mockInput = {
    prompts: { fake: true },
    formatter: createSpy({ 
      callAndReturn: (answers, commit, inquirer) => {
        const formatted = JSON.stringify(answers, null, 2);
        commit(formatted);
        return formatted;
      }
    }),
  };

  const mockAnswers = {
    answers: 'answers'
  }
  const mockInquirer = {
    prompt: createSpy({ returning: Promise.resolve(mockAnswers) }),
  }

  const mockCommit = createSpy();

  const promptAndCommitResult = promptAndCommit(mockInput);

  t.is(typeof promptAndCommitResult, 'object')
  t.is(typeof promptAndCommitResult.prompter, 'function')
  t.is(mockInput.formatter.callCount, 0);
  t.is(mockInquirer.prompt.callCount, 0);
  t.is(mockCommit.callCount, 0);

  promptAndCommitResult.prompter(mockInquirer, mockCommit)
    .then(function(promptResult) {

      t.is(mockInput.formatter.callCount, 1);
      t.is(mockInquirer.prompt.callCount, 1);
      t.is(mockCommit.callCount, 1);

      t.deepEqual(mockInput.formatter.calledWith[0], [mockAnswers, mockCommit, mockInquirer])
      t.deepEqual(mockCommit.calledWith[0], [JSON.stringify(mockAnswers, null, 2)])
      t.deepEqual(mockInquirer.prompt.calledWith[0], [mockInput.prompts])
      
      t.is(promptResult, JSON.stringify(mockAnswers, null, 2))
    });

});
