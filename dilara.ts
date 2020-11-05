//Imports
import * as config from "./package.json";
import {PowerPrompt} from "powerprompt";
import * as router from "./lib/router";
import * as sys from "./lib/system";

//Constants
const cookieParser = require('cookie-parser');
const cp = require("child_process");
const express = require("express");
const fs = require("fs");
const pp = new PowerPrompt();
const uuid = require('uuid');

//App
const app = express();
app.use(cookieParser());

//CLI
const p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);

//Server
app.get("/*", function(req, res){
    if(req.cookies["sid"] === undefined){
        res.cookie("sid", uuid.v4());

        //TODO: Set Project to Cookie

    }
    //pp.print("");
    //pp.print("COOKIE: " + req.cookies["sid"]);



    let pathString:string = "./lib/default/dilara.html";
    fs.readFile(pathString, "utf8", (err, data) => {
        if(err){
            pp.printError("Could not read File: " + pathString);
            res.send("ERROR: Could not read File: " + pathString);
        }else{
            res.send(data);
        }
    });
});

app.listen(config.port_http, () =>{});

//Start
run();

//Methods
function close():void{
    //app.close();
    pp.print("Close Application");
    //closeServers();
    closeAllProcesses();
    pp.printLine();
    process.exit(0);
}

function closeAllProcesses():void{
    closeCLI();
}

function closeCLI():void{
    p_cli.kill();
}

function executeCLI(cmd:string):void{
    switch(cmd){
        case config.cmd.exit:
            close();
            break;
    }
}

function init():void{
    sys.createFolder("./projects");
}

/*function route(url:URL, res):void{
    //if(url.pathname === "//favicon.ico"){
        //responseFavIcon(res);
    //}else{
        const projects = require("./lib/projects.json");
        if(projects.projects.length < 1){
            pp.printError("No Project exist");
            res.end("ERROR: No Project exist");
        }else{
            let pathString:string;
            let error:boolean = false;
            if(url.pathname === "//"){
                pathString = "./projects/" + projects.projects[0].name.toLowerCase() + "/" + projects.projects[0].main;
            }else{
                pathString = url.pathname;
                while(pathString.indexOf("/") == 0){
                    pathString = pathString.substring(1, pathString.length);
                }
                let name:string;
                if(pathString.indexOf("/") < 0){
                    name = pathString;
                }else{
                    name = pathString.substring(0, pathString.indexOf("/"));
                }
                let index:number = sys.getProjectIndex(name, projects.projects);
                if(index < 0){
                    error = true;
                    pp.printError("Found no Project with Name '" + name + "'");
                    res.end("ERROR: Found no Project with Name '" + name + "'");
                }else{
                    pathString = "./projects/" + name.toLowerCase() + "/" + projects.projects[index].main;
                }
            }
            if(!error){
                fs.readFile(pathString, "utf8", (err, data) => {
                    if(err){
                        pp.printError("Could not read File: " + pathString);
                        res.end("ERROR: Could not read File: " + pathString);
                    }else{
                        responseFile(data, res);
                    }
                });
            }
        }
    //}


    //TODO: All

    //res.end("<h1>hello world</h1>\n");
}*/

function responseFile(data, res):void{
    res.end(data);
}

function run():void{
    init();
    p_cli.send(config.cmd_cli.start);
}