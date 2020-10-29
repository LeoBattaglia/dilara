process.on("message", function (msg) {
    //do some intense work here
    console.log("FFF: " + msg);
    if (msg === "Hello") {
        console.log("AAA");
        process.send("YES");
    }
    else {
        console.log("BBB");
        process.send("what?");
    }
});
//# sourceMappingURL=cli.js.map