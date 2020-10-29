//Imports
import * as config                  from "./package.json";
import {PowerPrompt}                from "powerprompt";

//Constants
const cp                            = require("child_process");
const pp                            = new PowerPrompt();

//CLI
const p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);

//Start
run();

//Methods
function close():void{
    closeAllProcesses();
    process.exit(0);
}

function closeAllProcesses():void{
    closeCLI();
}

function closeCLI():void{
    p_cli.kill();
}

function executeCLI(cmd:string):void{
    pp.print("Execute CLI-Command: " + cmd);
}

function run():void{
    p_cli.send(config.cli_cmd.start);
}