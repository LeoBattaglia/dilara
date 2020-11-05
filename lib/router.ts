//Imports
import {PowerPrompt} from "powerprompt";
import * as config from "../package.json";

//Requires
const fs = require("fs");

//Constants
const pp = new PowerPrompt();

//Functions
function readFileAndResponse(pathString:string, res):void{
    fs.readFile(pathString, "utf8", (err, data) => {
        if(!err){
            res.end(data);
        }
    });

}

export function route(req, res):void{
    pp.print("");
    //req._id = 10304;
    let ip = req.connection.remoteAddress;
    pp.print("TEST: " + ip);
    let url:URL;
    if(req.url === "/"){
        url = new URL("https://" + config.host + ":" + config.port_https + "/");
    }else{
        url = new URL("https://" + config.host + ":" + config.port_https + "/" + req.url);
    }
    let rut:string = url.pathname;
    let file:string = undefined;
    if(rut === "/"){
        /*if(){

        }*/
    }
    pp.print("Route: " + rut + " / " + file);

    /*switch(url.pathname){
        case "//":
            res.writeHead(200, {"content-type": "text/html; charset=UTF-8"});
            readFileAndResponse("./lib/default/dilara.html", res);
            break;
        case "//dilara.svg":
            res.writeHead(200, {"content-type": "image/svg+xml; charset=UTF-8"});
            readFileAndResponse("./lib/default/dilara.svg", res);
            break;
        default:
            res.writeHead(404, {"content-type": "text/plain; charset=UTF-8"});
            res.end("Error: Could not find: " + url.pathname);
    }*/


    //res.end("TEST");
}