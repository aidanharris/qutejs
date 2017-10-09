const {appendFileSync} = require('fs');
const generatedCommands = require('./commands');

const {commands,jsCommands} = generatedCommands;

const _execFifo = (name = null, args = []) => {
  let cmd = '';

  if (name !== null) {
    cmd = name.replace(/_/g, '-') + ' ';
  }

  if (args[0] instanceof Array) {
    args = args[0];
  }

  cmd+=args.join(' ');

  if (cmd.length > 0) {
    appendFileSync(process.env.QUTE_FIFO, cmd);
  }
};

module.exports = (() => {
  let cmds = {_execFifo};

  if (!process.env.QUTE_FIFO) {
    throw new Error('ENOENT: QUTE_FIFO is not defined');
  }

  jsCommands.forEach((e,i) => {
    cmds[e] = (...args) => {
      return _execFifo(commands[i], args);
    };
  });

  return cmds;
})();
