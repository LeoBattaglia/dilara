"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pkg = require("./package.json");
var powerprompt_1 = require("powerprompt");
var sys = require("./lib/system");
//Constants
var cp = require("child_process");
var pp = new powerprompt_1.PowerPrompt();
//CLI
var p_cli = cp.fork('./lib/cli');
p_cli.on("message", function (msg) {
    pp.print("Message from CLI: " + msg);
});
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
function run() {
    pp.printLine();
    pp.printTitle(sys.capitalize(pkg.name) + " " + pkg.version);
    pp.printLine();
}
//# sourceMappingURL=dilara.js.map