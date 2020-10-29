"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Listeners
process.on("message", function (msg) {
    //do some intense work here
    console.log("FFF: " + msg);
    if (msg === "Hallo") {
        console.log("AAA");
        process.send("YES");
    }
    else {
        console.log("BBB");
        process.send("what?");
    }
});
//# sourceMappingURL=cli.js.map