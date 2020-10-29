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
    pp.print("Close Application");
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
    //pp.print("Execute CLI-Command: " + cmd);
    switch(cmd){
        case config.cmd[0].name: //Exit
            close();
            break;
    }
}

function run():void{
    p_cli.send(config.cmd_cli.start);
}