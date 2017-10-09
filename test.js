const {readFileSync} = require('fs');
const {test} = require('ava');
const qutejs = require('./');

test('foo', t => {
  qutejs.open(['-t', 'https://duckduckgo.com']);

  const contents = readFileSync(process.env.QUTE_FIFO).toString();

  t.is(contents, 'open -t https://duckduckgo.com');
});
