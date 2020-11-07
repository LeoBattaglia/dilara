"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
var interface_1 = require("./interface");
function route(req, res) {
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
    //pp.print("BBB: " + pathString);
    //pp.printLine();
    interface_1.fs.readFile(pathString, function (err, data) {
        //res.set('Content-Type', 'text/html');
        if (err) {
            interface_1.pp.printError("Could not read File: " + pathString);
            res.end("ERROR: Could not read File: " + pathString);
        }
        else {
            res.end(data);
        }
    });
}
exports.route = route;
//# sourceMappingURL=router.js.map