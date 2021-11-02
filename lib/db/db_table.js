"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_Table = void 0;
//Imports
var db_cellorkey_1 = require("./db_cellorkey");
var sys_1 = require("../sys");
var DB_Table = /** @class */ (function () {
    //Constructor
    function DB_Table(name) {
        this.name = name;
        this.cells = new Array(0);
        this.keys = new Array(0);
        this.inserts = new Array(0);
        //Add Default-Cell: ID
        var cellOrKey = new db_cellorkey_1.DB_CellOrKey();
        cellOrKey.addPara("type", "int");
        cellOrKey.addPara("name", "id");
        cellOrKey.addPara("auto_increment", "true");
        this.cells.push(cellOrKey);
    }
    //Functions
    DB_Table.prototype.addCellOrKey = function (str, key) {
        var paras = str.split(";");
        var para_split;
        var cellOrKey = new db_cellorkey_1.DB_CellOrKey();
        for (var _i = 0, paras_1 = paras; _i < paras_1.length; _i++) {
            var para = paras_1[_i];
            para = para.trim();
            para_split = para.split(":");
            if (para_split.length == 2) {
                para_split[0] = para_split[0].trim();
                para_split[1] = para_split[1].trim();
                if (para_split[0].length > 0 && para_split[1].length > 0) {
                    cellOrKey.addPara(para_split[0], para_split[1]);
                }
                else {
                    sys_1.print("--> Error 2 in Parameter: " + para);
                }
            }
            else {
                sys_1.print("--> Error 1 in Parameter: " + para);
            }
        }
        if (cellOrKey.hasName() && cellOrKey.hasType()) {
            if (key) {
                this.keys.push(cellOrKey);
            }
            else {
                this.cells.push(cellOrKey);
            }
        }
    };
    DB_Table.prototype.addInsert = function (insert) {
        this.inserts.push(insert);
    };
    DB_Table.prototype.countCells = function () {
        return this.cells.length;
    };
    return DB_Table;
}());
exports.DB_Table = DB_Table;
//# sourceMappingURL=db_table.js.map