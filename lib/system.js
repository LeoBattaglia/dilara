"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillString = exports.capitalize = void 0;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
function fillString(str, length, chars) {
    if (chars.length > 0) {
        while (str.length < length) {
            str += chars;
        }
    }
    return str;
}
exports.fillString = fillString;
//# sourceMappingURL=system.js.map