//Imports
import * as is                      from "./lib/intersection";
import * as pkg                     from "./package.json";
import {PowerPrompt}                from "powerprompt";
import * as sys                     from "./lib/system";

//Constants
const cp                            = require("child_process");
const pp                            = new PowerPrompt();

//CLI
let p_cli = cp.fork('./lib/cli');
p_cli.on("message", (msg) => {
    pp.print("Message from CLI: " + msg);
});

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

function run():void{
    pp.printLine();
    pp.printTitle(sys.capitalize(pkg.name) + " " + pkg.version);
    pp.printLine();
}