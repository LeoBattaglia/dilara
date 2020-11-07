"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = exports.sys = exports.router = exports.projects = exports.pp = exports.path = exports.fs = exports.express = exports.cp = exports.config = exports.cookieParser = void 0;
//Imports
var Config = require("../package.json");
var powerprompt_1 = require("powerprompt");
var Projects = require("./projects.json");
var Router = require("./router");
var System = require("./system");
//Constants
exports.cookieParser = require('cookie-parser');
exports.config = Config;
exports.cp = require("child_process");
exports.express = require("express");
exports.fs = require("fs");
exports.path = require("path");
exports.pp = new powerprompt_1.PowerPrompt();
exports.projects = Projects.projects;
exports.router = Router;
exports.sys = System;
exports.uuid = require('uuid');
//# sourceMappingURL=interface.js.map