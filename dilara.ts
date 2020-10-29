//Imports
import * as pkg             from "./package.json";
import {PowerPrompt}        from "powerprompt";
import * as sys             from "./lib/system";

//Constants
const cp        = require("child_process");
const pp        = new PowerPrompt();

//Processes
let p_cli = cp.fork('./lib/cli');

//Listeners
p_cli.on("message", (msg) => {
    pp.print("Answer from child: " + msg);
});

//Start
run();

//Methods
function closeProcesses(){
    p_cli.kill();
}

function run():void{
    pp.printLine();
    pp.printTitle(sys.capitalize(pkg.name) + " " + pkg.version);
    pp.printLine();
    p_cli.send("Hallo");
}