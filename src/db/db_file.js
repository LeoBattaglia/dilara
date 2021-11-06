"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_File = void 0;
//Imports
const fs_1 = require("fs");
const db_table_1 = require("./db_table");
//Declarations
class DB_File {
    //Constructor
    constructor(path) {
        this.tables = new Array(0);
        this.file_path = path;
        this.file_string = (0, fs_1.readFileSync)(path, "utf-8");
        this.parse();
    }
    //Methods
    getTableNames() {
        let names = new Array(0);
        for (let table of this.tables) {
            names.push(table.name);
        }
        return names;
    }
    parse() {
        let separator = "#table";
        if (this.file_string.indexOf(separator) > -1) {
            let split_tables = this.file_string.split(separator);
            for (let table_split of split_tables) {
                let table = undefined;
                let split_rows = table_split.split("\n");
                for (let i in split_rows) {
                    let row = split_rows[i];
                    row = row.trim();
                    while (row.indexOf("\t") > -1) {
                        row = row.replace("\t", "");
                    }
                    while (row.indexOf("  ") > -1) {
                        row = row.replace("  ", " ");
                    }
                    if (row.length > 0) {
                        if (row.indexOf("#") == 0) {
                            let cmd;
                            if (row === "#create") {
                                cmd = "create";
                            }
                            else {
                                if (row.indexOf(":") > 1) {
                                    cmd = row.substring(1, row.indexOf(":"));
                                    cmd = cmd.trim().toLowerCase();
                                }
                                else {
                                    cmd = null;
                                }
                            }
                            if (cmd != null) {
                                row = row.substring(row.indexOf(":") + 1, row.length);
                                row = row.trim();
                                if (cmd === "name") {
                                    table = new db_table_1.DB_Table(row);
                                }
                                else if (cmd === "cell" && table !== undefined) {
                                    table.addCellOrKey(row, false);
                                }
                                else if (cmd === "key" && table !== undefined) {
                                    table.addCellOrKey(row, true);
                                }
                                else if (cmd === "ins" && table !== undefined) {
                                    table.addInsert(row);
                                }
                                else if (cmd === "create" && table !== undefined) {
                                    this.tables.push(table);
                                    table = undefined;
                                }
                                else {
                                    throw "Dilara - parse: Unknown Command (" + cmd + "): " + row;
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            throw "Dilara - parse: File (" + this.file_path + ") does not contain any Tables";
        }
    }
}
exports.DB_File = DB_File;
//# sourceMappingURL=db_file.js.map