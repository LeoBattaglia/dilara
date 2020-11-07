"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
var interface_1 = require("./interface");
function getPath(project, url) {
    var path = "./projects/" + project + "/";
    if (url.paths.length > 1) {
        for (var i = 1; i < url.paths.length; i++) {
            path += url.paths[i] + "/";
        }
    }
    if (url.file === undefined) {
        path += interface_1.projects[interface_1.sys.getProjectIndex(project)].main;
    }
    else {
        path += url.file;
    }
    return path;
}
function getProjectFromCookie(req) {
    var project = undefined;
    if (req.cookies["sid"] !== undefined) {
        for (var _i = 0, ss_1 = interface_1.ss; _i < ss_1.length; _i++) {
            var session = ss_1[_i];
            if (session.sid === req.cookies["sid"]) {
                project = session.project;
                break;
            }
        }
    }
    return project;
}
function parseURL(url) {
    var split = url.split("/");
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
    return {
        file: file,
        paths: paths
    };
}
function route(req, res) {
    var url = parseURL(req.url);
    if (url.paths.length < 1) {
        url.paths.push("dilara");
    }
    var project = getProjectFromCookie(req);
    if (project === undefined) {
        var sid = interface_1.uuid.v4();
        res.cookie("sid", sid);
        project = url.paths[0];
        if (!interface_1.sys.isProjectNameExist(project)) {
            project = "Dilara";
        }
        setSession(sid, project);
    }
    var path = getPath(project, url);
    interface_1.fs.readFile(path, function (err, data) {
        if (err) {
            interface_1.pp.printError("Could not read File: " + path);
            res.end("ERROR: Could not read File: " + path);
        }
        else {
            res.end(data);
        }
    });
}
exports.route = route;
function setSession(sid, project) {
    var session = {
        sid: sid,
        project: project
    };
    interface_1.ss.push(session);
}
//# sourceMappingURL=router.js.map