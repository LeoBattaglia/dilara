"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var interface_1 = require("./interface");
//Variables
var started = false;
//Listeners
process.on("message", execute);
//Methods
function configProject() {
    return __awaiter(this, void 0, void 0, function () {
        var project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interface_1.projects.length < 1)) return [3 /*break*/, 1];
                    interface_1.pp.printError("No Project exists");
                    input().then();
                    return [3 /*break*/, 5];
                case 1:
                    project = void 0;
                    if (!(interface_1.projects.length == 1)) return [3 /*break*/, 2];
                    project = interface_1.projects[0].name;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, interface_1.pp.select("Select Project:", getProjectNames(false))];
                case 3:
                    project = _a.sent();
                    _a.label = 4;
                case 4:
                    interface_1.pp.printLine();
                    interface_1.pp.print("Configure Project '" + project.toString() + "'");
                    interface_1.pp.printError("Function 'configProject' is not finished");
                    //TODO: All
                    input().then();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function createProject() {
    return __awaiter(this, void 0, void 0, function () {
        var name, project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, interface_1.pp.input("Project-Name:")];
                case 1:
                    name = _a.sent();
                    if (interface_1.sys.isNull(name) || name.length < 4) {
                        interface_1.pp.printError("Project-Name is shorter than 4 Characters");
                        input().then();
                    }
                    else {
                        if (interface_1.sys.isProjectNameExist(name)) {
                            interface_1.pp.printError("Project '" + name + "' already exists");
                            input().then();
                        }
                        else {
                            project = {
                                name: name,
                                main: "index.html"
                            };
                            interface_1.projects.push(project);
                            interface_1.sys.writeFile("./lib/data/projects.json", JSON.stringify(interface_1.prs));
                            interface_1.sys.createFolder("./projects/" + name.toLowerCase());
                            interface_1.sys.copyFile("./lib/default/index.html", "./projects/" + name.toLowerCase() + "/index.html");
                            interface_1.pp.print("Project '" + name + "' is created");
                            input().then();
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function deleteProject() {
    return __awaiter(this, void 0, void 0, function () {
        var project, choose, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interface_1.projects.length < 2)) return [3 /*break*/, 1];
                    interface_1.pp.printError("There is no Project to delete");
                    input().then();
                    return [3 /*break*/, 6];
                case 1:
                    project = void 0;
                    if (!(interface_1.projects.length == 2)) return [3 /*break*/, 2];
                    project = interface_1.projects[1].name;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, interface_1.pp.select("Select Project:", getProjectNames(true))];
                case 3:
                    project = _a.sent();
                    _a.label = 4;
                case 4:
                    interface_1.pp.printLine();
                    return [4 /*yield*/, interface_1.pp.choose("Do you really want to delete '" + project.toString() + "'?", "y", "n", "YES", "NO", false)];
                case 5:
                    choose = _a.sent();
                    if (choose) {
                        index = interface_1.sys.getProjectIndex(project.toString());
                        if (index > -1) {
                            interface_1.projects.splice(index, 1);
                            interface_1.sys.writeFile("./lib/data/projects.json", JSON.stringify(interface_1.prs));
                        }
                        interface_1.sys.deleteFolder("./projects/" + project.toString().toLowerCase());
                        interface_1.pp.print("Project '" + project.toString() + "' is deleted");
                        input().then();
                    }
                    else {
                        input().then();
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function execute(cmd) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = cmd;
                    switch (_a) {
                        case interface_1.config.cmd.config: return [3 /*break*/, 1];
                        case interface_1.config.cmd.delete: return [3 /*break*/, 3];
                        case interface_1.config.cmd.exit: return [3 /*break*/, 5];
                        case interface_1.config.cmd.help: return [3 /*break*/, 6];
                        case interface_1.config.cmd.new: return [3 /*break*/, 7];
                        case interface_1.config.cmd.sessions: return [3 /*break*/, 9];
                        case interface_1.config.cmd.show: return [3 /*break*/, 10];
                        case interface_1.config.cmd_cli.start: return [3 /*break*/, 11];
                    }
                    return [3 /*break*/, 12];
                case 1: return [4 /*yield*/, configProject()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 3: return [4 /*yield*/, deleteProject()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 5:
                    process.send(interface_1.config.cmd.exit);
                    return [3 /*break*/, 13];
                case 6:
                    printHelp();
                    input().then();
                    return [3 /*break*/, 13];
                case 7: return [4 /*yield*/, createProject()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 9:
                    printSessions();
                    input().then();
                    return [3 /*break*/, 13];
                case 10:
                    printProjects();
                    input().then();
                    return [3 /*break*/, 13];
                case 11:
                    if (!started) {
                        run();
                        started = true;
                    }
                    return [3 /*break*/, 13];
                case 12:
                    interface_1.pp.printError("Unknown Command: " + cmd);
                    input().then();
                    _b.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    });
}
function getProjectNames(skipFirst) {
    var names = [];
    for (var _i = 0, projects_1 = interface_1.projects; _i < projects_1.length; _i++) {
        var project = projects_1[_i];
        names.push(project.name);
    }
    if (names.length > 0 && skipFirst) {
        names.shift();
    }
    return names;
}
function input() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    interface_1.pp.printLine();
                    _a = execute;
                    return [4 /*yield*/, interface_1.pp.input("Input >>")];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function printHelp() {
    var str = "Command:";
    str = interface_1.sys.fillString(str, 16, " ");
    str += "Description:";
    interface_1.pp.printLine();
    interface_1.pp.printInput(str);
    for (var _i = 0, _a = interface_1.config.cmds; _i < _a.length; _i++) {
        var c = _a[_i];
        str = c.name;
        str = interface_1.sys.fillString(str, 16, " ");
        str += c.description;
        interface_1.pp.print(str);
    }
}
function printProjects() {
    interface_1.pp.printLine();
    if (interface_1.projects.length < 1) {
        interface_1.pp.print("No Project exists");
    }
    else {
        interface_1.pp.printInput("Projects:");
        for (var _i = 0, projects_2 = interface_1.projects; _i < projects_2.length; _i++) {
            var project = projects_2[_i];
            interface_1.pp.print("- " + project.name);
        }
    }
}
function printSessions() {
    interface_1.pp.printLine();
    if (interface_1.ss.length < 1) {
        interface_1.pp.print("No Session exists");
    }
    else {
        interface_1.pp.printInput("Sessions:");
        for (var _i = 0, ss_1 = interface_1.ss; _i < ss_1.length; _i++) {
            var session = ss_1[_i];
            interface_1.pp.print("- " + session.sid + " (Project: " + session.project + ")");
        }
    }
}
function run() {
    interface_1.pp.printLine();
    interface_1.pp.printTitle(interface_1.sys.capitalize(interface_1.config.name) + " " + interface_1.config.version);
    interface_1.pp.printLine();
    if (interface_1.config.http) {
        interface_1.pp.print("URL: http://" + interface_1.config.host + ":" + interface_1.config.port_http);
    }
    else {
        interface_1.pp.print("URL: https://" + interface_1.config.host + ":" + interface_1.config.port_http);
    }
    printHelp();
    input().then();
}
//# sourceMappingURL=cli.js.map