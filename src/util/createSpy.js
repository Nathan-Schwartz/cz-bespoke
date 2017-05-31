// Testing utility, (was on plane)
const createSpy = (options = {}) => {
  const { returning, callAndReturn } = options;
  function spy(...args) {
    spy.calledWith.push(args);
    spy.callCount += 1;
    if (returning) {
      return returning
    } else if (callAndReturn) {
      return callAndReturn(...args);
    }
  }
  spy.callCount = 0;
  spy.calledWith = [];
  return spy;
};

module.exports = createSpy;
