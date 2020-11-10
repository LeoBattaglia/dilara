//Default-Imports
import {config, pp, sys} from "./lib/interface";

//Imports
import * as router   from "./lib/router";

//App
const app = require("express")();
app.use(require('cookie-parser')());

//CLI
const cp = require("child_process");
const p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);

//Server-Listener
app.get("/*", (req, res) => {
    router.route(req, res);
});
app.listen(config.port_http, () =>{});

//Start
run();

//Methods
function close():void{
    //app.close();
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
        case config.cmd.sessions:
            router.printSessions();
            p_cli.send(config.cmd_cli.input);
            break;
    }
}

function init():void{
    sys.copyFile("./lib/default/sessions.json", "./lib/data/sessions.json");
}

function run():void{
    init();
    p_cli.send(config.cmd_cli.start);
}