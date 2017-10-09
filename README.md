# qutejs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A library for building qutebrowser userscripts with nodejs

## Usage

```js
const qutejs = require('qutejs');

qutejs.jseval([], function () {
  alert('Hello World');
});
```

See the [examples](https://github.com/aidanharris/qutejs/tree/master/examples) for some basic examples.

NOTE: Commands are camel-cased e.g the command `adblock-update` becomes `adblockUpdate` as shown in [examples/adblockupdate.js](https://github.com/aidanharris/qutejs/blob/master/examples/adblockupdate.js).

Commands take either multiple function arguments or an array of options. There is one special case being jseval (as shown above).

The jseval function allows you to pass a function as the second argument which is parsed by qutejs. If the function is undefined we will assume the javascript to be executed is contained within the options array.

### Running extra commands

If for some reason a command isn't directly exposed by qutejs you can directly execute commands to the `$QUTE_FIFO` using the _execFifo method as follows:

```js
const qutejs = require('qutejs');

qutejs._execFifo(null, ['open','-t','https://duckduckgo.com']);
```

This command is prefixed with an underscore due to the unlikely event that qutebrowser introduces an execFifo command.

[npm-image]: https://badge.fury.io/js/qutejs.svg
[npm-url]: https://npmjs.org/package/qutejs
[travis-image]: https://travis-ci.org/aidanharris/qutejs.svg?branch=master
[travis-url]: https://travis-ci.org/aidanharris/qutejs
[daviddm-image]: https://david-dm.org/aidanharris/qutejs.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/aidanharris/qutejs
