//Imports
import {fs, path, pp, projects} from "./interface";

//Methods
export function capitalize(str:string):string{
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function copyFile(src:string, dst:string):void{
    let p_src = path.join(src);
    if(fs.existsSync(p_src)){
        let p_dst = path.join(dst);
        fs.copyFile(p_src, p_dst, (err) => {
            if(err){
                pp.printError("Could not copy File: " + p_src);
            }
        });
    }
}

export function createFolder(pathString:string):void{
    let p = path.join(pathString);
    if(!fs.existsSync(p)){
        fs.mkdir(p, (err) => {
            if(err){
                pp.printError("Could not create Directory: " + p);
            }
        });
    }
}

export function deleteFolder(pathString:string):void{
    let p = path.join(pathString);
    if(fs.existsSync(p)){
        fs.rmdir(p, { recursive: true }, (err) => {
            if(err){
                pp.printError("Could not delete Directory: " + p);
            }
        });
    }
}

export function fillString(str:string, length:number, chars:string):string{
    if(chars.length > 0){
        while(str.length < length){
            str += chars;
        }
    }
    return str;
}

export function getProjectIndex(name:string):number{
    for(let i:number=0; i<projects.length; i++){
        if(projects[i].name.toLowerCase() === name.toLowerCase()){
            return i;
        }
    }
    return -1;
}

export function isNull(obj):Boolean{
    if(obj === null || obj === undefined || obj === ""){
        return true;
    }else{
        return false;
    }
}

export function isProjectNameExist(name:string):Boolean{
    for(let project of projects){
        if(project.name.toLowerCase() === name.toLowerCase()){
            return true;
        }
    }
    return false;
}

export function isProjectPageExist(name:string):Boolean{
    for(let project of projects){
        for(let page of project.pages){
            if(page.name.toLowerCase() === name.toLowerCase()){
                return true;
            }
        }
    }
    return false;
}

export function setContentType(pathString:string, res){
    if(pathString.indexOf(".css") > 0){
        res.setHeader("content-type", "text/css");
    }else if(pathString.indexOf(".csv") > 0){
        res.setHeader("content-type", "text/csv");
    }else if(pathString.indexOf(".gif") > 0){
        res.setHeader("content-type", "image/gif");
    }else if(pathString.indexOf(".html") > 0){
        res.setHeader("content-type", "text/html");
    }else if(pathString.indexOf(".jpg") > 0){
        res.setHeader("content-type", "image/jpeg");
    }else if(pathString.indexOf(".jpeg") > 0){
        res.setHeader("content-type", "image/jpeg");
    }else if(pathString.indexOf(".js") > 0){
        res.setHeader("content-type", "text/javascript");
    }else if(pathString.indexOf(".json") > 0){
        res.setHeader("content-type", "application/json");
    }else if(pathString.indexOf(".mp3") > 0){
        res.setHeader("content-type", "audio/mpeg");
    }else if(pathString.indexOf(".mpeg") > 0){
        res.setHeader("content-type", "video/mpeg");
    }else if(pathString.indexOf(".png") > 0){
        res.setHeader("content-type", "image/png");
    }else if(pathString.indexOf(".pdf") > 0){
        res.setHeader("content-type", "application/pdf");
    }else if(pathString.indexOf(".svg") > 0){
        res.setHeader("content-type", "image/svg+xml");
    }else if(pathString.indexOf(".ttf") > 0){
        res.setHeader("content-type", "font/ttf");
    }else if(pathString.indexOf(".txt") > 0){
        res.setHeader("content-type", "text/plain");
    }else if(pathString.indexOf(".zip") > 0){
        res.setHeader("content-type", "application/zip");
    }
    return res;
}

export function writeFile(pathString:string, data:string):void{
    let p = path.join(pathString);
    fs.writeFile(p, data, "utf-8", (err) => {
        if(err){
            pp.printError("Could not write File: " + err);
        }
    });
}