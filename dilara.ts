//Imports
import {cookieParser, config, cp, express, fs, pp, projects, sys, uuid} from "./lib/interface";

//App
const app = express();
app.use(cookieParser());

//CLI
const p_cli = cp.fork('./lib/cli');
p_cli.on("message", executeCLI);

//Server
app.get("/*", (req, res) => {
    let split:string[] = req.url.split("/");
    let file:string = undefined;
    let paths:string[] = [];
    for(let str of split){
        if(!sys.isNull(str)){
            if(str.indexOf(".") > 0){
                file = str;
            }else{
                paths.push(str);
            }
        }
    }
    let path:string;
    let project:string = undefined;
    if(paths.length < 1){
        path = "./lib/default/";
        project = "main";
    }else{
        path = "./projects/";
        for(let p of paths){
            if(project === undefined){
                project = p;
            }
            path += p + "/";
        }
    }
    if(req.cookies["sid"] === undefined){
        res.cookie("sid", uuid.v4());
        res.cookie("project", project);
        res.cookie("project_path", path);
    }
    let pathString:string;
    if(file === undefined){
        if(project === "main"){
            pathString = path + "dilara.html";
        }else{
            pathString = path + projects[sys.getProjectIndex(project)].main;
        }
    }else{
        pathString = path + file;
    }
    pp.print("BBB: " + pathString);
    pp.printLine();
    fs.readFile(pathString, (err, data) => {
        //res.set('Content-Type', 'text/html');
        if(err){
            pp.printError("Could not read File: " + pathString);
            res.end("ERROR: Could not read File: " + pathString);
        }else{
            //pp.print("FFF: " + data.toString());
            res.end(data);
        }
    });
});

app.listen(config.port_http, () =>{});

//Start
run();

//Methods
function close():void{
    //app.close();
    pp.print("Close Application");
    //closeServers();
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
    sys.createFolder("./projects");
}

function responseFile(data, res):void{
    res.end(data);
}

function run():void{
    init();
    p_cli.send(config.cmd_cli.start);
}