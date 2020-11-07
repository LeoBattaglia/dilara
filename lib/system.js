"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.isProjectNameExist = exports.isNull = exports.getProjectIndex = exports.fillString = exports.deleteFolder = exports.createFolder = exports.copyFile = exports.capitalize = void 0;
//Imports
var interface_1 = require("./interface");
//Methods
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
function copyFile(src, dst) {
    var p_src = interface_1.path.join(src);
    if (interface_1.fs.existsSync(p_src)) {
        var p_dst = interface_1.path.join(dst);
        interface_1.fs.copyFile(src, dst, function (err) {
            if (err) {
                interface_1.pp.printError("Could not copy File: " + p_src);
            }
        });
    }
}
exports.copyFile = copyFile;
function createFolder(pathString) {
    var p = interface_1.path.join(pathString);
    if (!interface_1.fs.existsSync(p)) {
        interface_1.fs.mkdir(p, function (err) {
            if (err) {
                interface_1.pp.printError("Could not create Directory: " + p);
            }
        });
    }
}
exports.createFolder = createFolder;
function deleteFolder(pathString) {
    var p = interface_1.path.join(pathString);
    if (interface_1.fs.existsSync(p)) {
        interface_1.fs.rmdir(p, { recursive: true }, function (err) {
            if (err) {
                interface_1.pp.printError("Could not delete Directory: " + p);
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
function getProjectIndex(name) {
    for (var i = 0; i < interface_1.projects.length; i++) {
        if (interface_1.projects[i].name.toLowerCase() === name.toLowerCase()) {
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
function isProjectNameExist(name) {
    for (var _i = 0, projects_1 = interface_1.projects; _i < projects_1.length; _i++) {
        var project = projects_1[_i];
        if (project.name.toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }
    return false;
}
exports.isProjectNameExist = isProjectNameExist;
function writeFile(pathString, data) {
    var p = interface_1.path.join(pathString);
    interface_1.fs.writeFile(p, data, "utf-8", function (err) {
        if (err) {
            interface_1.pp.printError("Could not write File: " + err);
        }
    });
}
exports.writeFile = writeFile;
//# sourceMappingURL=system.js.map