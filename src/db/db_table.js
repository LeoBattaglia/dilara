"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_Table = void 0;
//Imports
const db_cellorkey_1 = require("./db_cellorkey");
class DB_Table {
    //Constructor
    constructor(name) {
        this.name = name;
        this.cells = new Array(0);
        this.keys = new Array(0);
        this.inserts = new Array(0);
        //Add Default-Cell: ID
        let cellOrKey = new db_cellorkey_1.DB_CellOrKey();
        cellOrKey.addPara("type", "int");
        cellOrKey.addPara("name", "id");
        cellOrKey.addPara("auto_increment", "true");
        this.cells.push(cellOrKey);
    }
    //Functions
    addCellOrKey(str, key) {
        let paras = str.split(";");
        let para_split;
        let cellOrKey = new db_cellorkey_1.DB_CellOrKey();
        for (let para of paras) {
            para = para.trim();
            para_split = para.split(":");
            if (para_split.length == 2) {
                para_split[0] = para_split[0].trim();
                para_split[1] = para_split[1].trim();
                if (para_split[0].length > 0 && para_split[1].length > 0) {
                    cellOrKey.addPara(para_split[0], para_split[1]);
                }
                else {
                    throw "Dilara - addCellOrKey: Error 2 in Parameter: " + para;
                }
            }
            else {
                throw "Dilara - addCellOrKey: Error 1 in Parameter: " + para;
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
    }
    addInsert(insert) {
        this.inserts.push(insert);
    }
    countCells() {
        return this.cells.length;
    }
}
exports.DB_Table = DB_Table;
//# sourceMappingURL=db_table.js.map