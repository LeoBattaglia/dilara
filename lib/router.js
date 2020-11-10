"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.printSessions = void 0;
//Imports
var interface_1 = require("./interface");
//Constants
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var uuid = require('uuid');
//Variables
var ss = [];
//Functions
function getPath(project, url) {
    var path = "./projects/" + project.toLowerCase() + "/modules/";
    if (url.paths.length < 1) {
        path += "index/";
    }
    else {
        if (interface_1.sys.isProjectPageExist(url.paths[0])) {
            path += url.paths[0] + "/";
            for (var i = 1; i < url.paths.length; i++) {
                path += url.paths[i] + "/";
            }
        }
        else {
            path += "index/";
            for (var i = 0; i < url.paths.length; i++) {
                path += url.paths[i] + "/";
            }
        }
    }
    if (url.file === undefined) {
        path += "index.html";
    }
    else {
        path += url.file;
    }
    return path;
}
function getProjectFromCookie(req) {
    var project = undefined;
    if (req.cookies["sid"] !== undefined) {
        for (var _i = 0, ss_1 = ss; _i < ss_1.length; _i++) {
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
function printSessions() {
    interface_1.pp.printLine();
    if (ss.length < 1) {
        interface_1.pp.print("No Session exists");
    }
    else {
        interface_1.pp.printInput("Sessions:");
        for (var _i = 0, ss_2 = ss; _i < ss_2.length; _i++) {
            var session = ss_2[_i];
            interface_1.pp.print("- " + session.sid + " (Project: " + session.project + ")");
        }
    }
}
exports.printSessions = printSessions;
function readFile(path, res) {
    path = replaceGlobal(path);
    interface_1.fs.readFile(path, function (err, data) {
        if (err) {
            interface_1.pp.printError("Could not read File: " + path);
            res.end("ERROR: Could not read File: " + path);
        }
        else {
            if (path.indexOf(".html") > 0) {
                res.setHeader("content-type", "text/html");
                readStyle(path, res, data.toString());
            }
            else {
                res = interface_1.sys.setContentType(path, res);
                res.end(data);
            }
        }
    });
}
function readScript(path, res, file, style) {
    var pathCSS = path.replace(".html", ".js");
    interface_1.fs.readFile(pathCSS, function (err, data) {
        response(res, file, style, data.toString());
    });
}
function readStyle(path, res, file) {
    var pathCSS = path.replace(".html", ".css");
    interface_1.fs.readFile(pathCSS, function (err, data) {
        readScript(path, res, file, data.toString());
    });
}
function replaceGlobal(path) {
    if (path.indexOf("/global.css") > 0) {
        path = path.replace("/global.css", "");
        path = path.substring(0, path.lastIndexOf("/"));
        path += "/global.css";
    }
    return path;
}
function response(res, file, style, script) {
    var sc = file;
    //pp.print("DDD: " + sc);
    var html = new JSDOM(sc);
    /*let global:string = "<link href=\"global.css\" rel=\"stylesheet\" type=\"text/css\"/>";
    global += "</head>";
    sc = sc.replace("</head>", global);
    if(!sys.isNull(style)){




    }*/
    //TODO: All
    res.end("<!DOCTYPE html>\n" + html.window.document.documentElement.innerHTML);
}
function route(req, res) {
    var url = parseURL(req.url);
    var project = getProjectFromCookie(req);
    if (project === undefined) {
        var sid = uuid.v4();
        res.cookie("sid", sid);
        if (url.paths.length > 0) {
            if (interface_1.sys.isProjectNameExist(url.paths[0])) {
                project = url.paths[0];
                url.paths.shift();
            }
            else {
                project = "Dilara";
            }
        }
        else {
            project = "Dilara";
        }
        setSession(sid, project);
    }
    var path = getPath(project, url);
    readFile(path, res);
}
exports.route = route;
function setSession(sid, project) {
    var session = {
        sid: sid,
        project: project
    };
    ss.push(session);
}
//# sourceMappingURL=router.js.map