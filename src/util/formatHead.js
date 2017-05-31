function formatHead(answers) {
  const scope = answers.scope.trim() ? '(' + answers.scope.trim() + ')' : '';
  return answers.type + scope + ': ' + answers.subject.trim();
}
module.exports = formatHead;