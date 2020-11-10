//Imports
import {fs, pp, sys} from "./interface";

//Constants
const jsdom         = require("jsdom");
const {JSDOM}       = jsdom;
const uuid          = require('uuid');

//Variables
let ss              = [];

//Functions
function getPath(project:string, url):string{
    let path:string = "./projects/" + project.toLowerCase() + "/modules/";
    if(url.paths.length < 1){
        path += "index/";
    }else{
        if(sys.isProjectPageExist(url.paths[0])){
            path += url.paths[0] + "/";
            for(let i=1; i<url.paths.length; i++){
                path += url.paths[i] + "/";
            }
        }else{
            path += "index/";
            for(let i=0; i<url.paths.length; i++){
                path += url.paths[i] + "/";
            }
        }
    }
    if(url.file === undefined){
        path += "index.html";
    }else{
        path += url.file;
    }
    return path;
}

function getProjectFromCookie(req):string{
    let project = undefined;
    if(req.cookies["sid"] !== undefined){
        for(let session of ss){
            if(session.sid === req.cookies["sid"]){
                project = session.project;
                break;
            }
        }
    }
    return project;
}

function parseURL(url:string){
    let split:string[] = url.split("/");
    let file:string = undefined;
    let paths:string[] = [];
    for(let str of split){
        if(!sys.isNull(str)){
            if(str.indexOf(".") > 0){
                file = str;
            }else{
                paths.push(str);
            }
        }
    }
    return {
        file: file,
        paths: paths
    }
}

export function printSessions(){
    pp.printLine();
    if(ss.length < 1){
        pp.print("No Session exists")
    }else{
        pp.printInput("Sessions:");
        for(let session of ss){
            pp.print("- " + session.sid + " (Project: " + session.project + ")");
        }
    }
}

function readFile(path:string, res):void{
    path = replaceGlobal(path);
    fs.readFile(path, (err, data) => {
        if(err){
            pp.printError("Could not read File: " + path);
            res.end("ERROR: Could not read File: " + path);
        }else{
            if(path.indexOf(".html") > 0){
                res.setHeader("content-type", "text/html");
                readStyle(path, res, data.toString());
            }else{
                res = sys.setContentType(path, res);
                res.end(data);
            }
        }
    });
}

function readScript(path:string, res, file:string, style:string):void{
    let pathCSS = path.replace(".html", ".js");
    fs.readFile(pathCSS, (err, data) => {
        response(res, file, style, data.toString());
    });
}

function readStyle(path:string, res, file:string):void{
    let pathCSS = path.replace(".html", ".css");
    fs.readFile(pathCSS, (err, data) => {
        readScript(path, res, file, data.toString());
    });
}

function replaceGlobal(path:string):string{
    if(path.indexOf("/global.css") > 0){
        path = path.replace("/global.css", "");
        path = path.substring(0, path.lastIndexOf("/"));
        path += "/global.css";
    }
    return path;
}

function response(res, file:string, style:string, script:string){
    let sc:string = file;
    //pp.print("DDD: " + sc);
    let html = new JSDOM(sc);

    /*let global:string = "<link href=\"global.css\" rel=\"stylesheet\" type=\"text/css\"/>";
    global += "</head>";
    sc = sc.replace("</head>", global);
    if(!sys.isNull(style)){




    }*/

    //TODO: All

    res.end("<!DOCTYPE html>\n" + html.window.document.documentElement.innerHTML);
}

export function route(req, res):void{
    let url = parseURL(req.url);
    let project:string = getProjectFromCookie(req);
    if(project === undefined){
        let sid = uuid.v4();
        res.cookie("sid", sid);
        if(url.paths.length > 0){
            if(sys.isProjectNameExist(url.paths[0])){
                project = url.paths[0];
                url.paths.shift();
            }else{
                project = "Dilara";
            }
        }else{
            project = "Dilara";
        }
        setSession(sid, project);
    }
    let path:string = getPath(project, url);
    readFile(path, res);
}

function setSession(sid, project:string):void{
    let session = {
        sid: sid,
        project: project
    }
    ss.push(session);
}