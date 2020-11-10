"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sys = exports.prs = exports.projects = exports.pp = exports.path = exports.fs = exports.config = void 0;
//Imports
var Config = require("../package.json");
var powerprompt_1 = require("powerprompt");
var Projects = require("./data/projects.json");
//import * as Router          from "./router";
var System = require("./system");
//Constants
//export const cookieParser   = require('cookie-parser');
exports.config = Config;
//export const cp             = require("child_process");
//export const express        = require("express");
exports.fs = require("fs");
//export const jsdom          = require("jsdom");
//export const {JSDOM}        = jsdom;
exports.path = require("path");
exports.pp = new powerprompt_1.PowerPrompt();
exports.projects = Projects.projects;
exports.prs = Projects;
//export const router         = Router;
exports.sys = System;
//export const uuid           = require('uuid');
//# sourceMappingURL=interface.js.map