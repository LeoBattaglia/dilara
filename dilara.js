"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Default-Imports
var interface_1 = require("./lib/interface");
//Imports
var router = require("./lib/router");
//App
var app = require("express")();
app.use(require('cookie-parser')());
//CLI
var cp = require("child_process");
var p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);
//Server-Listener
app.get("/*", function (req, res) {
    router.route(req, res);
});
app.listen(interface_1.config.port_http, function () { });
//Start
run();
//Methods
function close() {
    //app.close();
    interface_1.pp.print("Close Application");
    closeAllProcesses();
    interface_1.pp.printLine();
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
        case interface_1.config.cmd.exit:
            close();
            break;
        case interface_1.config.cmd.sessions:
            router.printSessions();
            p_cli.send(interface_1.config.cmd_cli.input);
            break;
    }
}
function init() {
    interface_1.sys.copyFile("./lib/default/sessions.json", "./lib/data/sessions.json");
}
function run() {
    init();
    p_cli.send(interface_1.config.cmd_cli.start);
}
//# sourceMappingURL=dilara.js.map