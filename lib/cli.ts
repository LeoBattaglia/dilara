//Imports
import {PowerPrompt}        from "powerprompt";

//Listeners
process.on("message", check)

//Methods
function check(cmd){
    if(cmd === "check") {
        process.send(cmd + ":" + 200);
    }else{
        process.send(cmd + ":" + 404);
    }
}