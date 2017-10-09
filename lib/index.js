const generatedCommands = require('./commands');

const {commands,jsCommands} = generatedCommands;

const _execFifo = require('./execfifo');

const jseval = require('./jseval');

module.exports = (() => {
  let cmds = {
    _execFifo,
    jseval
  };

  if (!process.env.QUTE_FIFO) {
    throw new Error('ENOENT: QUTE_FIFO is not defined');
  }

  jsCommands.forEach((e,i) => {
    if (cmds[e] instanceof Function) { return; }

    cmds[e] = (...args) => {
      return _execFifo(commands[i], args);
    };
  });

  return cmds;
})();
