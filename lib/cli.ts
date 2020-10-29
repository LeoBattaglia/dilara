//Imports
import * as config          from "../package.json";
import {PowerPrompt}        from "powerprompt";
import * as sys             from "./system";

//Constants
const pp                    = new PowerPrompt();

//Variables
let started:Boolean         = false;

//Listeners
process.on("message", execute);

//Methods
function execute(cmd):Boolean{
    let close:Boolean = false;
    switch(cmd){
        case config.cmd[0].name: //Exit
            process.send(config.cmd[0].name);
            close = true;
        case config.cmd_cli.start:
            if(!started){
                run();
                started = true;
            }
            break;
        default:
            pp.printError("Unknown Command: " + cmd);
    }
    return close;
}

async function input(){
    pp.printLine();
    let close: Boolean = execute(await pp.input("Input >>"));
    if(!close){
        input().then();
    }
}

function printHelp(){
    let str:string = "Command:";
    str = sys.fillString(str, 16, " ");
    str += "Description:"
    pp.printInput(str);
    for(let c of config.cmd){
        str = c.name;
        str = sys.fillString(str, 16, " ");
        str += c.description;
        pp.print(str);
    }
}

function run():void{
    pp.printLine();
    pp.printTitle(sys.capitalize(config.name) + " " + config.version);
    pp.printLine();
    printHelp();
    input().then();
}