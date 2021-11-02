"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_File = void 0;
//Imports
var sys_1 = require("../sys");
var fs_1 = require("fs");
var db_table_1 = require("./db_table");
//Declarations
var DB_File = /** @class */ (function () {
    //Constructor
    function DB_File(path) {
        this.tables = new Array(0);
        this.file_path = path;
        this.file_string = fs_1.readFileSync(path, "utf-8");
    }
    //Methods
    DB_File.prototype.getTableNames = function () {
        var names = new Array(0);
        for (var _i = 0, _a = this.tables; _i < _a.length; _i++) {
            var table = _a[_i];
            names.push(table.name);
        }
        return names;
    };
    DB_File.prototype.parse = function () {
        var separator = "#table";
        if (this.file_string.indexOf(separator) > -1) {
            var split_tables = this.file_string.split(separator);
            for (var _i = 0, split_tables_1 = split_tables; _i < split_tables_1.length; _i++) {
                var table_split = split_tables_1[_i];
                var table = undefined;
                var split_rows = table_split.split("\n");
                for (var i in split_rows) {
                    var row = split_rows[i];
                    row = row.trim();
                    while (row.indexOf("\t") > -1) {
                        row = row.replace("\t", "");
                    }
                    while (row.indexOf("  ") > -1) {
                        row = row.replace("  ", " ");
                    }
                    if (row.length > 0) {
                        if (row.indexOf("#") == 0) {
                            var cmd = void 0;
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
                                    //print("TABLE-NAME: " + row);
                                    table = new db_table_1.DB_Table(row);
                                }
                                else if (cmd === "cell" && table !== undefined) {
                                    //print("CELL: " + row);
                                    table.addCellOrKey(row, false);
                                }
                                else if (cmd === "key" && table !== undefined) {
                                    //print("KEY: " + row);
                                    table.addCellOrKey(row, true);
                                }
                                else if (cmd === "ins" && table !== undefined) {
                                    //print("INSERT: " + row);
                                    table.addInsert(row);
                                }
                                else if (cmd === "create" && table !== undefined) {
                                    //print("CREATE");
                                    this.tables.push(table);
                                    table = undefined;
                                }
                                else {
                                    sys_1.print("--> UNKNOWN COMMAND (" + cmd + "): " + row);
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            sys_1.print("--> File (" + this.file_path + ") does NOT contain any Tables!");
        }
    };
    return DB_File;
}());
exports.DB_File = DB_File;
//# sourceMappingURL=db_file.js.map