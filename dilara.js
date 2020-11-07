"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var interface_1 = require("./lib/interface");
//App
var app = interface_1.express();
app.use(interface_1.cookieParser());
//CLI
var p_cli = interface_1.cp.fork('./lib/cli');
p_cli.on("message", executeCLI);
//Server
app.get("/*", function (req, res) {
    //pp.print("GO");
    interface_1.router.route(req, res);
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