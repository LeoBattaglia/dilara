//Imports
import * as config          from "../package.json";
import {PowerPrompt}        from "powerprompt";
import * as projects        from "./projects.json";
import * as sys             from "./system";

//Constants
const pp                    = new PowerPrompt();

//Variables
let started:Boolean         = false;

//Listeners
process.on("message", execute);

//Methods
async function createProject(){
    let name:string = await pp.input("Project-Name:")
    if(sys.isNull(name) || name.length < 4){
        pp.printError("Project-Name is shorter than 4 Characters")
        await input();
    }else{
        let project = {
            name: name
        }
        projects.projects.push(project);
        sys.writeFile("./lib/projects.json", JSON.stringify(projects));
        sys.createFolder("./projects/" + name.toLowerCase());
        pp.print("Project '" + name + "' is created");
        await input();
    }
}

async function deleteProject(){
    let options = [];
    for(let project of projects.projects){
        options.push(project.name);
    }
    let select = await pp.select("Select Project:", options);
    pp.printLine();
    let choose = await pp.choose("Do you really want to delete '" + select.toString() + "'?", "y", "n", "YES", "NO", false);
    if(choose){
        let index:number = sys.getProjectIndex(select.toString(), projects.projects);
        if(index > -1){
            projects.projects.splice(index, 1);
            sys.writeFile("./lib/projects.json", JSON.stringify(projects));
        }
        sys.deleteFolder("./projects/" + select.toString().toLowerCase());
        pp.print("Project '" + select.toString() + "' is deleted");
        await input();
    }else{
        await input();
    }

    //TODO: All

}

async function execute(cmd:string){
    switch(cmd){
        case config.cmd.delete:
            await deleteProject();
            break;
        case config.cmd.exit:
            process.send(config.cmd.exit);
            break;
        case config.cmd.new:
            await createProject();
            break;
        case config.cmd_cli.start:
            if(!started){
                run();
                started = true;
            }
            break;
        default:
            pp.printError("Unknown Command: " + cmd);
            await input();
    }
}

async function input(){
    pp.printLine();
    await execute(await pp.input("Input >>"));
}

function printHelp():void{
    let str:string = "Command:";
    str = sys.fillString(str, 16, " ");
    str += "Description:"
    pp.printInput(str);
    for(let c of config.cmds){
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
    if(config.http){
        pp.print("URL: http://" + config.host + ":" + config.port_http)
    }else{
        pp.print("URL: https://" + config.host + ":" + config.port_http)
    }
    pp.printLine();
    printHelp();
    input().then();
}