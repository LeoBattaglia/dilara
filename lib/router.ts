import {fs, pp, projects, sys, uuid} from "./interface";

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

export function route(req, res){
    let url = parseURL(req.url);
    let project:string;
    if(url.paths.length < 1){
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