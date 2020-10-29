//Imports
import {PowerPrompt}        from "powerprompt";

//Listeners
process.on("message", (msg) => {

    //do some intense work here
    console.log("FFF: " + msg);

    if(msg === "Hallo") {
        console.log("AAA")
        process.send("YES");
    }else{
        console.log("BBB")
        process.send("what?");
    }

})