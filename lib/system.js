"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.isNull = exports.getProjectIndex = exports.fillString = exports.deleteFolder = exports.createFolder = exports.capitalize = void 0;
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
                pp.printError("Could not create Directory: " + p);
            }
        });
    }
}
exports.createFolder = createFolder;
function deleteFolder(pathString) {
    var p = path.join(pathString);
    if (fs.existsSync(p)) {
        fs.rmdir(p, { recursive: true }, function (err) {
            if (err) {
                pp.printError("Could not delete Directory: " + p);
            }
        });
    }
}
exports.deleteFolder = deleteFolder;
function fillString(str, length, chars) {
    if (chars.length > 0) {
        while (str.length < length) {
            str += chars;
        }
    }
    return str;
}
exports.fillString = fillString;
function getProjectIndex(name, projects) {
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].name.toLowerCase() === name.toLowerCase()) {
            return i;
        }
    }
    return -1;
}
exports.getProjectIndex = getProjectIndex;
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
    fs.writeFile(p, data, "utf-8", function (err) {
        if (err) {
            pp.printError("Could not write File: " + err);
        }
    });
}
exports.writeFile = writeFile;
//# sourceMappingURL=system.js.map