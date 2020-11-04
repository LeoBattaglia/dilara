//Requires
const fs                    = require("fs");
const path                  = require("path");

//Imports
import {PowerPrompt}        from "powerprompt";

//Constants
const pp                    = new PowerPrompt();

//Methods
export function capitalize(str:string):string{
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function copyFile(src:string, dst:string):void{
    let p_src = path.join(src);
    if(fs.existsSync(p_src)){
        let p_dst = path.join(dst);
        fs.copyFile(src, dst, (err) => {
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

export function getProjectIndex(name:string, projects):number{
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

export function isProjectNameExist(name:string, projects):Boolean{
    for(let project of projects){
        if(project.name.toLowerCase() === name.toLowerCase()){
            return true;
        }
    }
    return false;
}

export function writeFile(pathString:string, data:string):void{
    let p = path.join(pathString);
    fs.writeFile(p, data, "utf-8", (err) => {
        if(err){
            pp.printError("Could not write File: " + err);
        }
    });
}