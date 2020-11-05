"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
//Imports
var powerprompt_1 = require("powerprompt");
var config = require("../package.json");
//Requires
var fs = require("fs");
//Constants
var pp = new powerprompt_1.PowerPrompt();
//Functions
function readFileAndResponse(pathString, res) {
    fs.readFile(pathString, "utf8", function (err, data) {
        if (!err) {
            res.end(data);
        }
    });
}
function route(req, res) {
    pp.print("");
    //req._id = 10304;
    var ip = req.connection.remoteAddress;
    pp.print("TEST: " + ip);
    var url;
    if (req.url === "/") {
        url = new URL("https://" + config.host + ":" + config.port_https + "/");
    }
    else {
        url = new URL("https://" + config.host + ":" + config.port_https + "/" + req.url);
    }
    var rut = url.pathname;
    var file = undefined;
    if (rut === "/") {
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
exports.route = route;
//# sourceMappingURL=router.js.map