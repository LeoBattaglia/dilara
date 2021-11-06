"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = void 0;
//Constants
const cell_length_bigint = 8;
const cell_length_int = 11;
const cell_length_string = 255;
//Functions
function getCellDefault(def, para) {
    if (para !== undefined) {
        def = para;
    }
    return def;
}
function getCellLength(length, para) {
    if (para !== undefined) {
        let length_read = parseInt(para);
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
    let query = "CREATE TABLE " + "`" + table.name + "` (\n";
    query += getQueryCells(table.cells);
    query += "PRIMARY KEY (`id`),\n";
    query += getQueryKeys(table.keys);
    query = query.substring(0, query.length - 2) + "\n";
    query += ")";
    return query;
}
exports.getQuery = getQuery;
function getQueryBigint(cell) {
    let query = " bigint";
    let length = cell_length_bigint;
    length = getCellLength(length, cell.getPara("length"));
    query += "(" + length + ")";
    query += " NOT NULL";
    let def = "0";
    def = getCellDefault(def, cell.getPara("default"));
    query += " DEFAULT '" + def + "',\n";
    return query;
}
function getQueryCells(cells) {
    let query = "";
    let type;
    for (let cell of cells) {
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
    let query = " float";
    query += " NOT NULL";
    let def = "0";
    def = getCellDefault(def, cell.getPara("default"));
    query += " DEFAULT '" + def + "',\n";
    return query;
}
function getQueryInt(cell) {
    let query = " int";
    let length = cell_length_int;
    length = getCellLength(length, cell.getPara("length"));
    query += "(" + length + ")";
    query += " NOT NULL";
    if (cell.getPara("name") === "id") {
        query += " AUTO_INCREMENT,\n";
    }
    else {
        let def = "0";
        def = getCellDefault(def, cell.getPara("default"));
        query += " DEFAULT '" + def + "',\n";
    }
    return query;
}
function getQueryKeys(keys) {
    let query = "";
    let type;
    for (let key of keys) {
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
            for (let index of key.getIndexes()) {
                query += "`" + index + "`,";
            }
            query += "),\n";
            query = query.replace("`,)", "`)");
        }
    }
    return query;
}
function getQueryLongtext(cell) {
    let query = " longtext";
    if (getCellNotNull(cell.getPara("not_null"))) {
        query += " NOT NULL";
    }
    let def = "''";
    def = getCellDefault(def, cell.getPara("default"));
    query += " DEFAULT " + def + ",\n";
    return query;
}
function getQueryString(cell) {
    let query = " varchar";
    let length = cell_length_string;
    length = getCellLength(length, cell.getPara("length"));
    query += "(" + length + ")";
    if (getCellNotNull(cell.getPara("not_null"))) {
        query += " NOT NULL";
    }
    let def = "''";
    def = getCellDefault(def, cell.getPara("default"));
    query += " DEFAULT " + def + ",\n";
    return query;
}
//# sourceMappingURL=db_functions.js.map