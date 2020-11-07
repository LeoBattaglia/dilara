import {fs, pp, projects, ss, sys, uuid} from "./interface";

function getPath(project:string, url):string{
    let path:string = "./projects/" + project + "/";
    if(url.paths.length > 1){
        for(let i=1; i<url.paths.length; i++){
            path += url.paths[i] + "/";
        }
    }
    if(url.file === undefined){
        path += projects[sys.getProjectIndex(project)].main;
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

export function route(req, res):void{
    let url = parseURL(req.url);
    if(url.paths.length < 1){
        url.paths.push("dilara");
    }
    let project:string = getProjectFromCookie(req);
    if(project === undefined){
        let sid = uuid.v4();
        res.cookie("sid", sid);
        project = url.paths[0];
        if(!sys.isProjectNameExist(project)){
            project = "Dilara";
        }
        setSession(sid, project);
    }
    let path:string = getPath(project, url);
    fs.readFile(path, (err, data) => {
        if(err){
            pp.printError("Could not read File: " + path);
            res.end("ERROR: Could not read File: " + path);
        }else{
            res.end(data);
        }
    });
}

function setSession(sid, project:string):void{
    let session = {
        sid: sid,
        project: project
    }
    ss.push(session);
}