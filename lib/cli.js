"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Listeners
process.on("message", check);
//Methods
function check(cmd) {
    if (cmd === "check") {
        process.send("CLI:" + 200);
    }
    else {
        process.send("CLI:" + 404);
    }
}
//# sourceMappingURL=cli.js.map