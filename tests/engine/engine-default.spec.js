const test = require('ava');
const engine = require('../../');
const util = require('../../src/util');

const dumbDeepEqual = (t, a, b) => t.is(JSON.stringify(a), JSON.stringify(b));

test(`[engine.js] engine(): Invoking the main export should defer to engine.tweak with no config.`, (t) => {
  // Capture result of engine.tweak when run with no config.
  const expected = engine.tweak();

  // Override tweak method with spy
  engine.tweak = util.createSpy({ callAndReturn: engine.tweak });

  t.is(engine.tweak.callCount, 0);
  const actual = engine({ configShouldBeIgnored: true });

  t.is(engine.tweak.callCount, 1);
  dumbDeepEqual(t, expected, actual);
  t.is(expected.prompter.toString(), actual.prompter.toString());

  dumbDeepEqual(t, engine.tweak.calledWith[0], []);
});
