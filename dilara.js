"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var pkg = require("./package.json");
var powerprompt_1 = require("powerprompt");
var sys = require("./lib/system");
//Constants
var cp = require("child_process");
var pp = new powerprompt_1.PowerPrompt();
var timeout = 1000;
//Variables
var isRunning = true;
//Process-Variables
var p_cli = cp.fork('./lib/cli');
//Listeners
p_cli.on("message", function (msg) {
    pp.print("Answer from CLI: " + msg);
});
//Process-Array
var processes = [];
processes.push(p_cli);
//Start
run();
//Methods
function checkProcesses() {
    for (var _i = 0, processes_1 = processes; _i < processes_1.length; _i++) {
        var proc = processes_1[_i];
        proc.send("check");
    }
}
function close() {
    closeProcesses();
    process.exit(0);
}
function closeProcesses() {
    p_cli.kill();
}
function run() {
    pp.printLine();
    pp.printTitle(sys.capitalize(pkg.name) + " " + pkg.version);
    pp.printLine();
    checkProcesses();
}
function runLoop() {
    if (isRunning) {
        setTimeout(function () {
            checkProcesses();
            runLoop();
        }, timeout);
    }
    else {
        close();
    }
}
//# sourceMappingURL=dilara.js.map