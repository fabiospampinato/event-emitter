/* IMPORT */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/* TYPE GUARDS */
function isEvent(x) {
    return _.isString(x);
}
exports.isEvent = isEvent;
function isEvents(x) {
    return _.isArray(x) && _.every(x, _.isString);
}
exports.isEvents = isEvents;
function isHandler(x) {
    return _.isFunction(x);
}
exports.isHandler = isHandler;
function isHandlers(x) {
    return _.isArray(x) && _.every(x, _.isFunction);
}
exports.isHandlers = isHandlers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7O0FBRVosMEJBQTRCO0FBVTVCLGlCQUFpQjtBQUVqQixpQkFBbUIsQ0FBQztJQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBRyxDQUFDLENBQUUsQ0FBQztBQUMxQixDQUFDO0FBY08sMEJBQU87QUFiZixrQkFBb0IsQ0FBQztJQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFFLENBQUM7QUFDdEQsQ0FBQztBQVdnQiw0QkFBUTtBQVZ6QixtQkFBcUIsQ0FBQztJQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBRyxDQUFDLENBQUUsQ0FBQztBQUM1QixDQUFDO0FBUTBCLDhCQUFTO0FBUHBDLG9CQUFzQixDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFHLENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUUsQ0FBQztBQUN4RCxDQUFDO0FBS3FDLGdDQUFVIn0=