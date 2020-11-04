//Imports
import * as config from "./package.json";
import {PowerPrompt} from "powerprompt";
import * as sys from "./lib/system";

//Constants
const cp = require("child_process");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const pp = new PowerPrompt();

//CLI
const p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);

//HTTPS-Server
const https_options = {
    key: fs.readFileSync("./lib/cert/key.pem"),
    cert: fs.readFileSync("./lib/cert/cert.pem")
};
const server = https.createServer(https_options, executeHTTPS).listen(config.port_https);

//HTTP-Server
const server_http = http.createServer(executeHTTP).listen(config.port_http);

//Start
run();

//Methods
function close():void{
    pp.print("Close Application");
    closeServers();
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

function closeServers(){
    server.close(() => {
        pp.printError("Could not close HTTPS-Server!");
    });
    server_http.close(() => {
        pp.printError("Could not close HTTP-Server!");
    });
}

function executeCLI(cmd:string):void{
    switch(cmd){
        case config.cmd.exit:
            close();
            break;
    }
}

function executeHTTP(req, res){
    if(config.http){
        executeHTTPS(req, res);
    }else{
        res.writeHead(200, {"content-type": "text/html; charset=UTF-8"});
        res.write("<script>");
        res.write("window.location = 'https://" + config.host + ":" + config.port_https + "';");
        res.write("</script>");
        res.end();
    }
}

function executeHTTPS(req, res){
    res.writeHead(200, {"content-type": "text/html; charset=UTF-8"});
    const url = new URL("https://" + config.host + "/" + req.url);
    route(url, res);
}

function init():void{
    sys.createFolder("./projects");
}

function route(url:URL, res):void{
    pp.print("\n");
    pp.print("CCC: " + url.pathname);
    const projects = require("./lib/projects.json");
    if(projects.projects.length < 1){
        res.end("ERROR: No Project to display");
        pp.printError("No Project to display");
    }else{
        let pathString:string;
        if(url.pathname === "//"){
            pathString = "./projects/" + projects.projects[0].name.toLowerCase() + "/index.html";
        }else{


        }
        fs.readFile(pathString, "utf8" , (err, data) => {
            if(err){
                pp.printError("Could not read File: " + pathString);
            }else{
                responseFile(data, res);
            }
        });
    }



    //TODO: All

    //res.end("<h1>hello world</h1>\n");
}

function responseFile(data, res){
    res.end(data);
}

function run():void{
    init();
    p_cli.send(config.cmd_cli.start);
}