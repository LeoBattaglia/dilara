//Imports
import * as pkg             from "./package.json";
import {PowerPrompt}        from "powerprompt";
import * as sys             from "./lib/system";

//Constants
const cp                    = require("child_process");
const pp                    = new PowerPrompt();
const timeout:number        = 1000;

//Variables
let isRunning:Boolean       = true;

//Process-Variables
let p_cli                   = cp.fork('./lib/cli');

//Listeners
p_cli.on("message", (msg) => {
    pp.print("Answer from CLI: " + msg);
});

//Process-Array
let processes = [];
processes.push(p_cli);

//Start
run();

//Methods
function checkProcesses():void{
    for(let proc of processes){
        proc.send("check");
    }
}

function close():void{
    closeProcesses();
    process.exit(0);
}

function closeProcesses():void{
    p_cli.kill();
}

function run():void{
    pp.printLine();
    pp.printTitle(sys.capitalize(pkg.name) + " " + pkg.version);
    pp.printLine();
    checkProcesses();
}
function runLoop():void{
    if(isRunning){
        setTimeout(() => {
            checkProcesses();
            runLoop();
        }, timeout);
    }else{
        close();
    }
}