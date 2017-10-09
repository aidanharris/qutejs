const {appendFileSync} = require('fs');

module.exports = (name = null, args = []) => {
  let cmd = '';

  if (name !== null) {
    cmd = name.replace(/_/g, '-') + ' ';
  }

  if (args[0] instanceof Array) {
    args = args[0];
  }

  cmd+=args.join(' ');

  if (!cmd.endsWith('\n')) {
    cmd+='\n';
  }

  if (cmd.length > 0) {
    appendFileSync(process.env.QUTE_FIFO, cmd);
  }
};

