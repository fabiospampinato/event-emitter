
/* IMPORT */

import * as _ from 'lodash';

/* TYPES */

type bindings = any;
type event = string;
type events = event[];
type handler = Function & { _ee?: string, _handler?: Function };
type handlers = handler[];

/* TYPE GUARDS */

function isEvent ( x ): x is event {
  return _.isString ( x );
}
function isEvents ( x ): x is events {
  return _.isArray ( x ) && _.every ( x, _.isString );
}
function isHandler ( x ): x is handler {
  return _.isFunction ( x );
}
function isHandlers ( x ): x is handlers {
  return _.isArray ( x ) && _.every ( x, _.isFunction );
}

/* EXPORT */

export {bindings, event, events, handler, handlers};
export {isEvent, isEvents, isHandler, isHandlers};
