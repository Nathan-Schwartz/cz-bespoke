const test = require('ava');
const engine = require('../../');
const util = require('../../src/util');

test.todo(`[engine.js] engine.overhaul(): Invoking engine.overhaul with neither prompt or formatter should behave the same as engine().`);

test(`[engine.js] engine.overhaul(): Invoking engine.overhaul with custom prompts but no formatter should throw an error.`, (t) => {
  t.throws(() => engine.overhaul({ prompts: 'truthy' }));
});

test.todo(`[engine.js] engine.overhaul(): Invoking engine.overhaul with custom formatter but no prompts should use default prompts.`)
