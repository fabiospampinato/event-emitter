/* IMPORT */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var types_1 = require("./types");
/* EVENT EMITTER */
var EventEmitter = (function () {
    /* CONSTRUCTOR */
    function EventEmitter(bindings) {
        if (bindings === void 0) { bindings = {}; }
        this.set(bindings);
    }
    /* UTILITIES */
    EventEmitter.prototype.hasHandler = function (event, handler) {
        if (!this._bindings[event])
            return false;
        return !!this._bindings[event].find(function (h) { return h === handler || (h.hasOwnProperty('_handler') && h._handler === handler); });
    };
    /* GET */
    EventEmitter.prototype.get = function () {
        return this._bindings;
    };
    /* SET */
    EventEmitter.prototype.set = function (bindings) {
        if (bindings === void 0) { bindings = {}; }
        this._bindings = bindings;
        return this;
    };
    /* RESET */
    EventEmitter.prototype.reset = function () {
        return this.set();
    };
    EventEmitter.prototype.on = function (event, handler) {
        var _this = this;
        if (types_1.isEvents(event))
            return event.map(function (event) { return _this.on(event, handler); })[0];
        if (types_1.isHandlers(handler))
            return handler.map(function (handler) { return _this.on(event, handler); })[0];
        if (_.isUndefined(this._bindings[event]))
            this._bindings[event] = [];
        if (this.hasHandler(event, handler))
            throw new Error('[event-emitter] The handler is already bound to the event');
        this._bindings[event].push(handler);
        return this;
    };
    EventEmitter.prototype.one = function (event, handler) {
        var _this = this;
        if (types_1.isEvents(event))
            return event.map(function (event) { return _this.one(event, handler); })[0];
        if (types_1.isHandlers(handler))
            return handler.map(function (handler) { return _this.one(event, handler); })[0];
        if (this.hasHandler(event, handler))
            throw new Error('[event-emitter] The handler is already bound to the event');
        var EE = this;
        var handlerOne = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            EE.off(event, handlerOne);
            handler.apply(this, args);
        };
        handlerOne._handler = handler;
        handlerOne._ee = handler._ee = handler._ee || _.uniqueId();
        return this.on(event, handlerOne);
    };
    EventEmitter.prototype.off = function (event, handler) {
        var _this = this;
        if (types_1.isEvents(event))
            return event.map(function (event) { return _this.off(event, handler); })[0];
        if (types_1.isHandlers(handler))
            return handler.map(function (handler) { return _this.off(event, handler); })[0];
        if (_.isUndefined(handler)) {
            delete this._bindings[event];
        }
        else if (this._bindings[event]) {
            this._bindings[event] = this._bindings[event].filter(function (h) { return h !== handler && (!h.hasOwnProperty('_ee') || h._ee !== handler._ee); });
        }
        return this;
    };
    EventEmitter.prototype.emit = function (event) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (types_1.isEvents(event))
            return event.map(function (event) { return _this.emit.apply(_this, [event].concat(args)); })[0];
        if (!types_1.isHandlers(this._bindings[event]))
            return this;
        for (var _a = 0, _b = this._bindings[event]; _a < _b.length; _a++) {
            var handler = _b[_a];
            handler.apply(void 0, args);
        }
        return this;
    };
    return EventEmitter;
}());
/* EXPORT */
exports.default = EventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7O0FBRVosMEJBQTRCO0FBRTVCLGlDQUE2QztBQUU3QyxtQkFBbUI7QUFFbkI7SUFNRSxpQkFBaUI7SUFFakIsc0JBQWMsUUFBdUI7UUFBdkIseUJBQUEsRUFBQSxhQUF1QjtRQUVuQyxJQUFJLENBQUMsR0FBRyxDQUFHLFFBQVEsQ0FBRSxDQUFDO0lBRXhCLENBQUM7SUFFRCxlQUFlO0lBRWYsaUNBQVUsR0FBVixVQUFhLEtBQVksRUFBRSxPQUFnQjtRQUV6QyxFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFFLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUcsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssT0FBTyxJQUFJLENBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBRyxVQUFVLENBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBRSxFQUE5RSxDQUE4RSxDQUFFLENBQUM7SUFFOUgsQ0FBQztJQUVELFNBQVM7SUFFVCwwQkFBRyxHQUFIO1FBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFFeEIsQ0FBQztJQUVELFNBQVM7SUFFVCwwQkFBRyxHQUFILFVBQU0sUUFBdUI7UUFBdkIseUJBQUEsRUFBQSxhQUF1QjtRQUUzQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWQsQ0FBQztJQUVELFdBQVc7SUFFWCw0QkFBSyxHQUFMO1FBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUcsQ0FBQztJQUVyQixDQUFDO0lBU0QseUJBQUUs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