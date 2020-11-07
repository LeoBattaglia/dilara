//Imports
import {config, pp, projects, sys} from "./interface";

//Variables
let started:Boolean         = false;

//Listeners
process.on("message", execute);

//Methods
async function configProject(){
    if(projects.length < 1){
        pp.printError("No Project exists")
        input().then();
    }else{
        let project;
        if(projects.length == 1){
            project = projects[0].name;
        }else{
            project = await pp.select("Select Project:", getProjectNames());
        }
        pp.printLine();
        pp.print("Configure Project '" + project.toString() + "'");

        pp.printError("Function 'configProject' is not finished");
        //TODO: All

        input().then();
    }
}
async function createProject(){
    let name:string = await pp.input("Project-Name:")
    if(sys.isNull(name) || name.length < 4){
        pp.printError("Project-Name is shorter than 4 Characters")
        input().then();
    }else{
        if(sys.isProjectNameExist(name)){
            pp.printError("Project '" + name + "' already exists")
            input().then();
        }else{
            let project = {
                name: name,
                main: "index.html"
            }
            projects.push(project);
            sys.writeFile("./lib/projects.json", JSON.stringify(projects));
            sys.createFolder("./projects/" + name.toLowerCase());
            sys.copyFile("./lib/default/index.html", "./projects/" + name.toLowerCase() + "/index.html");
            pp.print("Project '" + name + "' is created");
            input().then();
        }
    }
}

async function deleteProject(){
    if(projects.length < 1){
        pp.printError("No Project exists")
        input().then();
    }else{
        let project;
        if(projects.length == 1){
            project = projects[0].name;
        }else{
            project = await pp.select("Select Project:", getProjectNames());
        }
        pp.printLine();
        let choose = await pp.choose("Do you really want to delete '" + project.toString() + "'?", "y", "n", "YES", "NO", false);
        if(choose){
            let index:number = sys.getProjectIndex(project.toString());
            if(index > -1){
                projects.splice(index, 1);
                sys.writeFile("./lib/projects.json", JSON.stringify(projects));
            }
            sys.deleteFolder("./projects/" + project.toString().toLowerCase());
            pp.print("Project '" + project.toString() + "' is deleted");
            input().then();
        }else{
            input().then();
        }
    }
}

async function execute(cmd:string){
    switch(cmd){
        case config.cmd.config:
            await configProject();
            break;
        case config.cmd.delete:
            await deleteProject();
            break;
        case config.cmd.exit:
            process.send(config.cmd.exit);
            break;
        case config.cmd.help:
            printHelp();
            input().then();
            break;
        case config.cmd.new:
            await createProject();
            break;
        case config.cmd.show:
            printProjects();
            input().then();
            break;
        case config.cmd_cli.start:
            if(!started){
                run();
                started = true;
            }
            break;
        default:
            pp.printError("Unknown Command: " + cmd);
            input().then();
    }
}

function getProjectNames():string[]{
    let names = [];
    for(let project of projects){
        names.push(project.name);
    }
    return names;
}

async function input(){
    pp.printLine();
    await execute(await pp.input("Input >>"));
}

function printHelp():void{
    let str:string = "Command:";
    str = sys.fillString(str, 16, " ");
    str += "Description:"
    pp.printLine();
    pp.printInput(str);
    for(let c of config.cmds){
        str = c.name;
        str = sys.fillString(str, 16, " ");
        str += c.description;
        pp.print(str);
    }
}

function printProjects(){
    pp.printLine();
    if(projects.length < 1){
        pp.print("No Project exists")
    }else{
        pp.printInput("Projects:");
        for(let project of projects){
            pp.print("- " + project.name);
        }
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
    printHelp();
    input().then();
}