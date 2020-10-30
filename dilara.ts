//Imports
import * as config          from "./package.json";
import {PowerPrompt}        from "powerprompt";
import * as sys             from "./lib/system";

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
    switch(cmd){
        case config.cmd.exit:
            close();
            break;
    }
}

function init():void{
    sys.createFolder("./projects")
}

function run():void{
    init();
    p_cli.send(config.cmd_cli.start);
}