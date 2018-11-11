
/* IMPORT */

import isUndefined = require ( 'lodash/isUndefined' );
import uniqueId = require ( 'lodash/uniqueId' );
import {bindings, event, events, handler, handlers} from './types';
import {isEvents, isHandlers} from './types';

/* EVENT EMITTER */

class EventEmitter {

  /* PROPERTIES */

  _bindings: bindings;

  /* CONSTRUCTOR */

  constructor ( bindings: bindings = {} ) {

    this.set ( bindings );

  }

  /* UTILITIES */

  hasHandler ( event: event, handler: handler ): Boolean {

    if ( !this._bindings[event] ) return false;

    return !!this._bindings[event].find ( h => h === handler || ( h.hasOwnProperty ( '_handler' ) && h._handler === handler ) );

  }

  /* GET */

  get (): bindings {

    return this._bindings;

  }

  /* SET */

  set ( bindings: bindings = {} ): this {

    this._bindings = bindings;

    return this;

  }

  /* RESET */

  reset (): this {

    return this.set ();

  }

  /* ON */

  on ( event: event, handler: handler ): this;
  on ( event: event, handler: handlers ): this;
  on ( event: events, handler: handler ): this;
  on ( event: events, handler: handlers ): this;
  on ( event: events | event, handler: handlers | handler ): this;
  on ( event: events | event, handler: handlers | handler ): this {

    if ( isEvents ( event ) ) return event.map ( event => this.on ( event, handler ) )[0];

    if ( isHandlers ( handler ) ) return handler.map ( handler => this.on ( event, handler ) )[0];

    if ( isUndefined ( this._bindings[event] ) ) this._bindings[event] = [];

    if ( this.hasHandler ( event, handler ) ) throw new Error ( '[event-emitter] The handler is already bound to the event' );

    this._bindings[event].push ( handler );

    return this;

  }

  /* ONE */

  one ( event: event, handler: handler ): this;
  one ( event: event, handler: handlers ): this;
  one ( event: events, handler: handler ): this;
  one ( event: events, handler: handlers ): this;
  one ( event: events | event, handler: handlers | handler ): this;
  one ( event: events | event, handler: handlers | handler ): this {

    if ( isEvents ( event ) ) return event.map ( event => this.one ( event, handler ) )[0];

    if ( isHandlers ( handler ) ) return handler.map ( handler => this.one ( event, handler ) )[0];

    if ( this.hasHandler ( event, handler ) ) throw new Error ( '[event-emitter] The handler is already bound to the event' );

    const EE = this;

    const handlerOne: handler = function ( ...args ) {
      EE.off ( event, handlerOne );
      handler.apply ( this, args );
    };

    handlerOne._handler = handler;
    handlerOne._ee = handler._ee = handler._ee || uniqueId ();

    return this.on ( event, handlerOne );

  }

  /* OFF */

  off ( event: event ): this;
  off ( event: events ): this;
  off ( event: event, handler: handler ): this;
  off ( event: event, handler: handlers ): this;
  off ( event: events, handler: handler ): this;
  off ( event: events, handler: handlers ): this;
  off ( event: events | event, handler?: handlers | handler ): this;
  off ( event: events | event, handler?: handlers | handler ): this {

    if ( isEvents ( event ) ) return event.map ( event => this.off ( event, handler ) )[0];

    if ( isHandlers ( handler ) ) return handler.map ( handler => this.off ( event, handler ) )[0];

    if ( isUndefined ( handler ) ) {

      delete this._bindings[event];

    } else if ( this._bindings[event] ) {

      this._bindings[event] = this._bindings[event].filter ( h => h !== handler && ( !h.hasOwnProperty ( '_ee' ) || h._ee !== handler._ee ) );

    }

    return this;

  }

  /* EMIT */

  emit ( event: event, ...args ): this;
  emit ( event: events, ...args ): this;
  emit ( event: events | event, ...args ): this;
  emit ( event: events | event, ...args ): this {

    if ( isEvents ( event ) ) return event.map ( event => this.emit ( event, ...args ) )[0];

    if ( !isHandlers ( this._bindings[event] ) ) return this;

    for ( let handler of this._bindings[event] ) {

      handler ( ...args );

    }

    return this;

  }

}

/* EXPORT */

export default EventEmitter;
