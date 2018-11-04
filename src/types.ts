
/* IMPORT */

import every from 'lodash/every';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

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
