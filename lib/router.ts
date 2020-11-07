import {fs, pp, projects, sys, uuid} from "./interface";

export function route(req, res){
    let split:string[] = req.url.split("/");
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
    let path:string;
    let project:string = undefined;
    if(paths.length < 1){
        path = "./lib/default/";
        project = "main";
    }else{
        path = "./projects/";
        for(let p of paths){
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
    if(file === undefined){
        if(project === "main"){
            pathString = path + "dilara.html";
        }else{
            pathString = path + projects[sys.getProjectIndex(project)].main;
        }
    }else{
        pathString = path + file;
    }
    //pp.print("BBB: " + pathString);
    //pp.printLine();
    fs.readFile(pathString, (err, data) => {
        //res.set('Content-Type', 'text/html');
        if(err){
            pp.printError("Could not read File: " + pathString);
            res.end("ERROR: Could not read File: " + pathString);
        }else{
            res.end(data);
        }
    });
}