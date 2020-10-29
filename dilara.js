"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var pkg = require("./package.json");
var powerprompt_1 = require("powerprompt");
var sys = require("./lib/system");
//Constants
var cp = require("child_process");
var pp = new powerprompt_1.PowerPrompt();
//Start
run();
//Methods
function run() {
    pp.printLine();
    pp.printTitle(sys.capitalize(pkg.name) + " " + pkg.version);
    pp.printLine();
    startProcesses();
}
function startProcesses() {
    var child = cp.fork('./src/child');
    child.on("message", function (msg) {
        pp.print("Answer from child: " + msg);
    });
}
//# sourceMappingURL=dilara.js.map