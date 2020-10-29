"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var pkg = require("./package.json");
var powerprompt_1 = require("powerprompt");
var sys = require("./lib/system");
//Constants
var cp = require("child_process");
var pp = new powerprompt_1.PowerPrompt();
//Processes
var p_cli = cp.fork('./lib/cli');
//Listeners
p_cli.on("message", function (msg) {
    pp.print("Answer from child: " + msg);
});
//Start
run();
//Methods
function closeProcesses() {
    p_cli.kill();
}
function run() {
    pp.printLine();
    pp.printTitle(sys.capitalize(pkg.name) + " " + pkg.version);
    pp.printLine();
    p_cli.send("Hallo");
}
//# sourceMappingURL=dilara.js.map