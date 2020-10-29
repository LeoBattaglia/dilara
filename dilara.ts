//Imports
import * as pkg             from "./package.json";
import {PowerPrompt}        from "powerprompt";
import * as sys             from "./lib/system";

//Constants
const cp        = require("child_process");
const pp        = new PowerPrompt();

//Start
run();

//Methods
function run():void{
    pp.printLine();
    pp.printTitle(sys.capitalize(pkg.name) + " " + pkg.version);
    pp.printLine();
    startProcesses();
}

function startProcesses():void{
    let child = cp.fork('./src/child');
    child.on("message", (msg) => {
        pp.print("Answer from child: " + msg);
    });
}