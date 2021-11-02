"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CellOrKey = void 0;
var db_para_1 = require("./db_para");
var DB_CellOrKey = /** @class */ (function () {
    //Constructor
    function DB_CellOrKey() {
        this.paras = new Array(0);
    }
    //Functions
    DB_CellOrKey.prototype.addPara = function (name, value) {
        this.paras.push(new db_para_1.DB_Para(name, value));
    };
    DB_CellOrKey.prototype.getIndexes = function () {
        var indexes = new Array(0);
        for (var _i = 0, _a = this.paras; _i < _a.length; _i++) {
            var para = _a[_i];
            if (para.name === "index") {
                indexes.push(para.value);
            }
        }
        return indexes;
    };
    DB_CellOrKey.prototype.getPara = function (name) {
        for (var _i = 0, _a = this.paras; _i < _a.length; _i++) {
            var para = _a[_i];
            if (para.name === name) {
                return para.value;
            }
        }
        return undefined;
    };
    DB_CellOrKey.prototype.hasName = function () {
        for (var _i = 0, _a = this.paras; _i < _a.length; _i++) {
            var para = _a[_i];
            if (para.name === "name") {
                return true;
            }
        }
        return false;
    };
    DB_CellOrKey.prototype.hasType = function () {
        for (var _i = 0, _a = this.paras; _i < _a.length; _i++) {
            var para = _a[_i];
            if (para.name === "type") {
                return true;
            }
        }
        return false;
    };
    return DB_CellOrKey;
}());
exports.DB_CellOrKey = DB_CellOrKey;
//# sourceMappingURL=db_cellorkey.js.map