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
    var split = req.url.split("/");
    var file = undefined;
    var paths = [];
    for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
        var str = split_1[_i];
        if (!interface_1.sys.isNull(str)) {
            if (str.indexOf(".") > 0) {
                file = str;
            }
            else {
                paths.push(str);
            }
        }
    }
    var path;
    var project = undefined;
    if (paths.length < 1) {
        path = "./lib/default/";
        project = "main";
    }
    else {
        path = "./projects/";
        for (var _a = 0, paths_1 = paths; _a < paths_1.length; _a++) {
            var p = paths_1[_a];
            if (project === undefined) {
                project = p;
            }
            path += p + "/";
        }
    }
    if (req.cookies["sid"] === undefined) {
        res.cookie("sid", interface_1.uuid.v4());
        res.cookie("project", project);
        res.cookie("project_path", path);
    }
    var pathString;
    if (file === undefined) {
        if (project === "main") {
            pathString = path + "dilara.html";
        }
        else {
            pathString = path + interface_1.projects[interface_1.sys.getProjectIndex(project)].main;
        }
    }
    else {
        pathString = path + file;
    }
    interface_1.pp.print("BBB: " + pathString);
    interface_1.pp.printLine();
    interface_1.fs.readFile(pathString, function (err, data) {
        //res.set('Content-Type', 'text/html');
        if (err) {
            interface_1.pp.printError("Could not read File: " + pathString);
            res.end("ERROR: Could not read File: " + pathString);
        }
        else {
            //pp.print("FFF: " + data.toString());
            res.end(data);
        }
    });
});
app.listen(interface_1.config.port_http, function () { });
//Start
run();
//Methods
function close() {
    //app.close();
    interface_1.pp.print("Close Application");
    //closeServers();
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
    interface_1.sys.createFolder("./projects");
}
function responseFile(data, res) {
    res.end(data);
}
function run() {
    init();
    p_cli.send(interface_1.config.cmd_cli.start);
}
//# sourceMappingURL=dilara.js.map