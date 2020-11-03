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
var config = require("../package.json");
var powerprompt_1 = require("powerprompt");
var projects = require("./projects.json");
var sys = require("./system");
//Constants
var pp = new powerprompt_1.PowerPrompt();
//Variables
var started = false;
//Listeners
process.on("message", execute);
//Methods
function createProject() {
    return __awaiter(this, void 0, void 0, function () {
        var name, project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pp.input("Project-Name:")];
                case 1:
                    name = _a.sent();
                    if (!(sys.isNull(name) || name.length < 4)) return [3 /*break*/, 3];
                    pp.printError("Project-Name is shorter than 4 Characters");
                    return [4 /*yield*/, input()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    project = {
                        name: name
                    };
                    projects.projects.push(project);
                    sys.writeFile("./lib/projects.json", JSON.stringify(projects));
                    _a.label = 4;
                case 4: return [2 /*return*/];
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
                        case config.cmd.exit: return [3 /*break*/, 1];
                        case config.cmd.new: return [3 /*break*/, 2];
                        case config.cmd_cli.start: return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    process.send(config.cmd.exit);
                    return [3 /*break*/, 7];
                case 2: return [4 /*yield*/, createProject()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 4:
                    if (!started) {
                        run();
                        started = true;
                    }
                    return [3 /*break*/, 7];
                case 5:
                    pp.printError("Unknown Command: " + cmd);
                    return [4 /*yield*/, input()];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function input() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pp.printLine();
                    _a = execute;
                    return [4 /*yield*/, pp.input("Input >>")];
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
    str = sys.fillString(str, 16, " ");
    str += "Description:";
    pp.printInput(str);
    for (var _i = 0, _a = config.cmds; _i < _a.length; _i++) {
        var c = _a[_i];
        str = c.name;
        str = sys.fillString(str, 16, " ");
        str += c.description;
        pp.print(str);
    }
}
function run() {
    pp.printLine();
    pp.printTitle(sys.capitalize(config.name) + " " + config.version);
    pp.printLine();
    if (config.http) {
        pp.print("URL: http://" + config.host + ":" + config.port_http);
    }
    else {
        pp.print("URL: https://" + config.host + ":" + config.port_http);
    }
    pp.printLine();
    printHelp();
    input().then();
}
//# sourceMappingURL=cli.js.map