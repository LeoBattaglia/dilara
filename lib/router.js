"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
var interface_1 = require("./interface");
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
    var project;
    if (url.paths.length < 1) {
        url.paths.push("dilara");
    }
    project = url.paths[0];
    /*let path:string;
    let project:string = undefined;
    if(url.paths.length < 1){
        path = "./projects/main/";
        project = "main";
    }else{
        path = "./projects/";
        for(let p of url.paths){
            if(project === undefined){
                project = p;
            }
            path += p + "/";
        }
    }
    if(req.cookies["sid"] === undefined){
        res.cookie("sid", uuid.v4());
        res.cookie("project", project);
        res.cookie("project_path", path);
    }
    let pathString:string;
    if(url.file === undefined){
        if(project === "main"){
            pathString = path + projects[0].main;
        }else{
            pathString = path + projects[sys.getProjectIndex(project)].main;
        }
    }else{
        pathString = path + url.file;
    }
    fs.readFile(pathString, (err, data) => {
        if(err){
            pp.printError("Could not read File: " + pathString);
            res.end("ERROR: Could not read File: " + pathString);
        }else{
            res.end(data);
        }
    });*/
}
exports.route = route;
//# sourceMappingURL=router.js.map