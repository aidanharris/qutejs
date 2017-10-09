const {readFileSync} = require('fs');
const {test} = require('ava');
const qutejs = require('./');

function readFifo() {
  let contents = readFileSync(process.env.QUTE_FIFO).toString();

  contents = contents.split('\n');
  contents = contents.filter(e => {
    return e.length > 0;
  });

  return contents.pop();
}

test('open command', t => {
  qutejs.open(['-t', 'https://duckduckgo.com']);

  const contents = readFifo();

  t.is(contents, 'open -t https://duckduckgo.com');
});

test('jseval', t => {
  const func1 = () => {
    alert('Hello, World 1');
  };

  qutejs.jseval([], func1);

  t.is(readFifo(), "jseval alert('Hello, World 1');");

  function func2() {
    alert('Hello, World 2');
  }

  qutejs.jseval([], func2);

  t.is(readFifo(), "jseval alert('Hello, World 2');");

  let func3 = function() {
    alert('Hello, World');

    return 5;
  };

  qutejs.jseval([], func3);

  t.is(readFifo(), "jseval alert('Hello, World'); return 5;");

  qutejs.jseval([], x => {
    alert('yep');
  });

  t.is(readFifo(), "jseval alert('yep');");

  qutejs.jseval([], function jeff(x) {
    alert('test');

    /* a comment */

    for (let i = 0; i < 5; i++) {
      console.log(i);
    }
  });

  t.is(readFifo(), "jseval alert('test'); /* a comment */ for (let i = 0; i < 5; i++) { console.log(i); }");

  qutejs.jseval([], b => (x,y,z) => {
    console.log('works');
  });

  t.is(readFifo(), "jseval console.log('works');");

  qutejs.jseval(['console.log("TEST");']);

  t.is(readFifo(), 'jseval console.log("TEST");');

  qutejs.jseval(['-q'], func1);

  t.is(readFifo(), "jseval -q alert('Hello, World 1');");

  qutejs.jseval(['-q', "alert('Hello, World 1');"]);

  t.is(readFifo(), "jseval -q alert('Hello, World 1');");
});
