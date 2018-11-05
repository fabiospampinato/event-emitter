
/* IMPORT */

import every = require ( 'lodash/every' );
import isArray = require ( 'lodash/isArray' );
import isString = require ( 'lodash/isString' );
import isFunction = require ( 'lodash/isFunction' );

/* TYPES */

type bindings = any;
type event = string;
type events = event[];
type handler = Function & { _ee?: string, _handler?: Function };
type handlers = handler[];

/* TYPE GUARDS */

function isEvent ( x ): x is event {
  return isString ( x );
}
function isEvents ( x ): x is events {
  return isArray ( x ) && every ( x, isString );
}
function isHandler ( x ): x is handler {
  return isFunction ( x );
}
function isHandlers ( x ): x is handlers {
  return isArray ( x ) && every ( x, isFunction );
}

/* EXPORT */

export {bindings, event, events, handler, handlers};
export {isEvent, isEvents, isHandler, isHandlers};
