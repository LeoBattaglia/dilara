"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = void 0;
//Constants
var cell_length_bigint = 8;
var cell_length_int = 11;
var cell_length_string = 255;
//Functions
function getCellDefault(def, para) {
    if (para !== undefined) {
        def = para;
    }
    return def;
}
function getCellLength(length, para) {
    if (para !== undefined) {
        var length_read = parseInt(para);
        if (length_read > 0) {
            length = length_read;
        }
    }
    return length;
}
function getCellNotNull(para) {
    if (para === "true") {
        return true;
    }
    else {
        return false;
    }
}
function getQuery(table) {
    var query = "CREATE TABLE " + "`" + table.name + "` (\n";
    query += getQueryCells(table.cells);
    query += "PRIMARY KEY (`id`),\n";
    query += getQueryKeys(table.keys);
    query = query.substring(0, query.length - 2) + "\n";
    query += ")";
    return query;
}
exports.getQuery = getQuery;
function getQueryBigint(cell) {
    var query = " bigint";
    var length = cell_length_bigint;
    length = getCellLength(length, cell.getPara("length"));
    query += "(" + length + ")";
    query += " NOT NULL";
    var def = "0";
    def = getCellDefault(def, cell.getPara("default"));
    query += " DEFAULT '" + def + "',\n";
    return query;
}
function getQueryCells(cells) {
    var query = "";
    var type;
    for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
        var cell = cells_1[_i];
        query += "`" + cell.getPara("name") + "`";
        type = cell.getPara("type");
        switch (type) {
            case "bigint":
                query += getQueryBigint(cell);
                break;
            case "float":
                query += getQueryFloat(cell);
                break;
            case "int":
                query += getQueryInt(cell);
                break;
            case "longtext":
                query += getQueryLongtext(cell);
                break;
            case "string":
                query += getQueryString(cell);
                break;
        }
    }
    return query;
}
function getQueryFloat(cell) {
    var query = " float";
    query += " NOT NULL";
    var def = "0";
    def = getCellDefault(def, cell.getPara("default"));
    query += " DEFAULT '" + def + "',\n";
    return query;
}
function getQueryInt(cell) {
    var query = " int";
    var length = cell_length_int;
    length = getCellLength(length, cell.getPara("length"));
    query += "(" + length + ")";
    query += " NOT NULL";
    if (cell.getPara("name") === "id") {
        query += " AUTO_INCREMENT,\n";
    }
    else {
        var def = "0";
        def = getCellDefault(def, cell.getPara("default"));
        query += " DEFAULT '" + def + "',\n";
    }
    return query;
}
function getQueryKeys(keys) {
    var query = "";
    var type;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        type = key.getPara("type");
        if (type === "unique" || type === "key") {
            switch (type) {
                case "unique":
                    query += "UNIQUE KEY";
                    break;
                case "key":
                    query += "KEY";
            }
            query += " `" + key.getPara("name") + "` (";
            for (var _a = 0, _b = key.getIndexes(); _a < _b.length; _a++) {
                var index = _b[_a];
                query += "`" + index + "`,";
            }
            query += "),\n";
            query = query.replace("`,)", "`)");
        }
    }
    return query;
}
function getQueryLongtext(cell) {
    var query = " longtext";
    if (getCellNotNull(cell.getPara("not_null"))) {
        query += " NOT NULL";
    }
    var def = "''";
    def = getCellDefault(def, cell.getPara("default"));
    query += " DEFAULT " + def + ",\n";
    return query;
}
function getQueryString(cell) {
    var query = " varchar";
    var length = cell_length_string;
    length = getCellLength(length, cell.getPara("length"));
    query += "(" + length + ")";
    if (getCellNotNull(cell.getPara("not_null"))) {
        query += " NOT NULL";
    }
    var def = "''";
    def = getCellDefault(def, cell.getPara("default"));
    query += " DEFAULT " + def + ",\n";
    return query;
}
//# sourceMappingURL=db_functions.js.map