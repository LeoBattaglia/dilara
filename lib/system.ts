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

export function createFolder(pathString:string):void{
    let p = path.join(pathString);
    if(!fs.existsSync(p)){
        fs.mkdir(p, (err) => {
            if(err){
                pp.printError("ERROR: Could not create Directory: " + p);
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

export function getJSONProjects():string{
    let obj = {
        projects: []
    }
    return JSON.stringify(obj);
}

export function isNull(obj){
    if(obj === null || obj === undefined || obj === ""){
        return true;
    }else{
        return false;
    }
}

export function writeFile(pathString:string, data:string):void{
    let p = path.join(pathString);
    if(!fs.existsSync(p)){
        fs.writeFile(p, data, "utf-8", (err) => {
            if(err){
                pp.printError("Could not write File: " + err);
            }
        });
    }
}