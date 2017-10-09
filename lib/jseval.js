const _execFifo = require('./execfifo.js');

class ParseError extends Error {
  constructor() {
    super();

    this.message = `Error parsing Function.
This is a bug!

Please report this to https://github.com/aidanharris/qutejs/issues`;
  }
}

module.exports = (args, func) => {
  if (func instanceof Function) {

    func = func.toString();

    // Remove single line comments since they don't really work to well on a single line ;)
    // use multi-line comments (/* some comment */) instead.
    func = func.replace(/\/\//g, '');

    // Trim newlines and whitespace
    func = func.trim().replace(/\r?\n/g, '');

    // Remove last '}' from function
    func = func.split("").reverse().join("").replace('}','').split("").reverse().join("");

    if (func.startsWith('function')) {
      func = func.replace(/^function.*?\{/, ''); // function () {}
    } else if (func.startsWith('()')) {
      func = func.replace(/\(\).*?\=\>.*?\{/, ''); // () => { }
    } else if (func.match(/^[a-zA-Z].*?\=\>.*?\{/)) {
      func = func.replace(/^[a-zA-Z].*?\=\>.*?\{/, ''); // x => { }
    } else {
      throw new ParseError;
    }

    // Trim string
    func = func.trim();
    // Replace double spaes with a single space
    func = func.replace(/\s+(?=\s)/g,'');

    args.push(func);

    _execFifo('jseval', args);

  } else {
    _execFifo('jseval', args);
  }
};
