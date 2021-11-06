"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CellOrKey = void 0;
const db_para_1 = require("./db_para");
class DB_CellOrKey {
    //Constructor
    constructor() {
        this.paras = new Array(0);
    }
    //Functions
    addPara(name, value) {
        this.paras.push(new db_para_1.DB_Para(name, value));
    }
    getIndexes() {
        let indexes = new Array(0);
        for (let para of this.paras) {
            if (para.name === "index") {
                indexes.push(para.value);
            }
        }
        return indexes;
    }
    getPara(name) {
        for (let para of this.paras) {
            if (para.name === name) {
                return para.value;
            }
        }
        return undefined;
    }
    hasName() {
        for (let para of this.paras) {
            if (para.name === "name") {
                return true;
            }
        }
        return false;
    }
    hasType() {
        for (let para of this.paras) {
            if (para.name === "type") {
                return true;
            }
        }
        return false;
    }
}
exports.DB_CellOrKey = DB_CellOrKey;
//# sourceMappingURL=db_cellorkey.js.map