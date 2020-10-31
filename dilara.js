"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var config = require("./package.json");
var powerprompt_1 = require("powerprompt");
var sys = require("./lib/system");
//Constants
var cp = require("child_process");
var fs = require("fs");
var http = require("http");
var https = require("https");
var pp = new powerprompt_1.PowerPrompt();
//CLI
var p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);
//HTTP-/HTTPS-Server
var https_options = {
    key: fs.readFileSync("./lib/cert/key.pem"),
    cert: fs.readFileSync("./lib/cert/cert.pem")
};
var server = https.createServer(https_options, executeHTTPS).listen(config.port_https);
//HTTP-Server
var server_http = http.createServer(executeHTTP).listen(config.port_http);
//Start
run();
//Methods
function close() {
    pp.print("Close Application");
    closeServers();
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
function closeServers() {
    server.close(function () {
        pp.printError("Could not close HTTPS-Server!");
    });
    server_http.close(function () {
        pp.printError("Could not close HTTP-Server!");
    });
}
function executeCLI(cmd) {
    switch (cmd) {
        case config.cmd.exit:
            close();
            break;
    }
}
function executeHTTP(req, res) {
    if (config.http) {
        executeHTTPS(req, res);
    }
    else {
        res.writeHead(200, { "content-type": "text/html; charset=UTF-8" });
        res.write("<script>");
        res.write("window.location = 'https://" + config.host + ":" + config.port_https + "';");
        res.write("</script>");
        res.end();
    }
}
function executeHTTPS(req, res) {
    res.writeHead(200, { "content-type": "text/html; charset=UTF-8" });
    res.end("<h1>hello world</h1>\n");
    //TODO: All
}
function init() {
    sys.createFolder("./projects");
}
function run() {
    init();
    p_cli.send(config.cmd_cli.start);
}
//# sourceMappingURL=dilara.js.map