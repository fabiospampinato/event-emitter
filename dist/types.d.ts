declare type bindings = any;
declare type event = string;
declare type events = event[];
declare type handler = Function & {
    _ee?: string;
    _handler?: Function;
};
declare type handlers = handler[];
declare function isEvent(x: any): x is event;
declare function isEvents(x: any): x is events;
declare function isHandler(x: any): x is handler;
declare function isHandlers(x: any): x is handlers;
export { bindings, event, events, handler, handlers };
export { isEvent, isEvents, isHandler, isHandlers };
