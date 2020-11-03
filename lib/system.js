"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.isNull = exports.getJSONProjects = exports.fillString = exports.createFolder = exports.capitalize = void 0;
//Requires
var fs = require("fs");
var path = require("path");
//Imports
var powerprompt_1 = require("powerprompt");
//Constants
var pp = new powerprompt_1.PowerPrompt();
//Methods
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
function createFolder(pathString) {
    var p = path.join(pathString);
    if (!fs.existsSync(p)) {
        fs.mkdir(p, function (err) {
            if (err) {
                pp.printError("ERROR: Could not create Directory: " + p);
            }
        });
    }
}
exports.createFolder = createFolder;
function fillString(str, length, chars) {
    if (chars.length > 0) {
        while (str.length < length) {
            str += chars;
        }
    }
    return str;
}
exports.fillString = fillString;
function getJSONProjects() {
    var obj = {
        projects: []
    };
    return JSON.stringify(obj);
}
exports.getJSONProjects = getJSONProjects;
function isNull(obj) {
    if (obj === null || obj === undefined || obj === "") {
        return true;
    }
    else {
        return false;
    }
}
exports.isNull = isNull;
function writeFile(pathString, data) {
    var p = path.join(pathString);
    if (!fs.existsSync(p)) {
        fs.writeFile(p, data, "utf-8", function (err) {
            if (err) {
                pp.printError("Could not write File: " + err);
            }
        });
    }
}
exports.writeFile = writeFile;
//# sourceMappingURL=system.js.map