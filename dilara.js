"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var config = require("./package.json");
var powerprompt_1 = require("powerprompt");
var sys = require("./lib/system");
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
    pp.print("Close Application");
    closeAllProcesses();
    pp.printLine();
    process.exit(0);
}
function closeAllProcesses() {
    closeCLI();
}
function closeCLI() {
    p_cli.kill();
}
function executeCLI(cmd) {
    switch (cmd) {
        case config.cmd.exit:
            close();
            break;
    }
}
function init() {
    sys.createFolder("./projects");
}
function run() {
    init();
    p_cli.send(config.cmd_cli.start);
}
//# sourceMappingURL=dilara.js.map