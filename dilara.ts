//Imports
import {cookieParser, config, cp, express, pp, router, sys} from "./lib/interface";

//App
const app = express();
app.use(cookieParser());

//CLI
const p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);

//Server
app.get("/*", (req, res) => {
    //pp.print("GO");
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
    }
}

function init():void{
    sys.copyFile("./lib/default/sessions.json", "./lib/data/sessions.json");
}

function run():void{
    init();
    p_cli.send(config.cmd_cli.start);
}