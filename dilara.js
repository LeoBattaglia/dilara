"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var config = require("./package.json");
var powerprompt_1 = require("powerprompt");
//Constants
var cp = require("child_process");
var pp = new powerprompt_1.PowerPrompt();
//CLI
var p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);
//Start
run();
//Methods
function close() {
    closeAllProcesses();
    process.exit(0);
}
function closeAllProcesses() {
    closeCLI();
}
function closeCLI() {
    p_cli.kill();
}
function executeCLI(cmd) {
    pp.print("Execute CLI-Command: " + cmd);
}
function run() {
    p_cli.send(config.cli_cmd.start);
}
//# sourceMappingURL=dilara.js.map