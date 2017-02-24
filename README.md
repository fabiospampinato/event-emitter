# Event Emitter

![Issues](https://img.shields.io/github/issues/fabiospampinato/event-emitter.svg)
[![NPM version](https://img.shields.io/npm/v/@fabiospampinato/event-emitter.svg)](https://www.npmjs.com/package/@fabiospampinato/event-emitter)

Simple EventEmitter implementation.

## Install

```shell
$ npm install --save @fabiospampinato/event-emitter
```

## Usage

```js
import EventEmitter from '@fabiospampinato/event-emitter';

const EE = new EventEmitter ();

let called = false;

function handler () {
  called = true;
}

EE.on ( 'my-event', handler );

EE.emit ( 'my-event' );

called; // true

EE.hasHandler ( 'my-event', handler ); // true

EE.off ( 'my-event', handler );

EE.hasHandler ( 'my-event', handler ); // false
```

## API

`bindings` is an object mapping each event to an array of handlers.

### `new EventEmitter ( bindings: bindings = {} )`

Returns an instance of EventEmitter. If the optional `bindings` object is passed, it will be used.

### `.hasHandler ( event: string, handler: Function ): Boolean`

Checks if an handler is bound to an event.

### `.get (): bindings`

Returns the current bindings object.

### `.set ( bindings: bindings = {} ): this`

Replaces the current bindings object with the provided one.

### `.reset (): this`

Removes all the event handlers.

### `.on ( event: string | string[], handler: Function | Function[] ): this`

Binds an handler, or an array of handlers, to an event, or an array of events.

### `.one ( event: string | string[], handler: Function | Function[] ): this`

Same as `.on`, but just before the handler gets called it will `.off` itself.

### `.off ( event: string | string[], handler?: Function | Function[] ): this`

Removes an handler, or an array of handlers, from an event, or an array of events.

If no handler is passed, all the handlers bound to the event, or array of events, will be removed.

### `.emit ( event: string | string[], ...args ): this`

Emits an event, or an array of events. All the handlers bound to it/them will be called with `...args`.

## License

MIT © Fabio Spampinato
