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
function execute(cmd):void{
    pp.print("CLI-Execute: " + cmd);
    pp.printLine();
    switch(cmd){
        case config.cli_cmd.start:
            if(!started){
                run();
                started = true;
            }
            break;
    }
}

async function input(){
    //let input = await pp.input("Input >>");
    execute(await pp.input("Input >>"));
    input().then();
}

function printHelp(){



    pp.printLine();
}

function run():void{
    pp.printLine();
    pp.printTitle(sys.capitalize(config.name) + " " + config.version);
    pp.printLine();
    printHelp();
    input().then();
}