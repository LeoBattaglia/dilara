"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQL_Select = exports.MySQL_InsertOrUpdate = exports.MySQL_Drop = exports.MySQL_Delete = exports.MySQL_CreateSchema = void 0;
const sys = require("samara");
class MySQL_CreateSchema {
    //Constructor
    constructor(schema) {
        this.schema = schema;
    }
    //Functions
    getQuery() {
        return "CREATE SCHEMA `" + this.schema + "`";
    }
}
exports.MySQL_CreateSchema = MySQL_CreateSchema;
class MySQL_Delete {
    //Constructor
    constructor(table) {
        this.wheres = new Array(0);
        this.table = table;
    }
    //Functions
    getQuery() {
        let query = "DELETE FROM " + this.table;
        for (let i = 0; i < this.wheres.length; i++) {
            if (i < 1) {
                query += " WHERE " + this.wheres[i];
            }
            else {
                query += " AND " + this.wheres[i];
            }
        }
        return query;
    }
}
exports.MySQL_Delete = MySQL_Delete;
class MySQL_Drop {
    //Constructor
    constructor(table) {
        this.table = table;
    }
    //Functions
    getQuery() {
        return "DROP TABLE " + "`" + this.table + "`";
    }
}
exports.MySQL_Drop = MySQL_Drop;
class MySQL_InsertOrUpdate {
    //Constructor
    constructor(table) {
        this.values = new Array(0);
        this.wheres = new Array(0);
        this.table = table;
    }
    //Functions
    addValue(col, val) {
        let value = new Array(2);
        value[0] = col;
        value[1] = val;
        this.values.push(value);
    }
    addWhere(where) {
        this.wheres.push(where);
    }
    getQueryInsert() {
        if (this.values.length > 0) {
            let query = "INSERT INTO " + "`" + this.table + "`";
            query += " (";
            let value;
            let values_string = "(";
            for (let i = 0; i < this.values.length; i++) {
                value = this.values[i];
                query += "`" + value[0] + "`";
                values_string += "'" + value[1] + "'";
                if (i < this.values.length - 1) {
                    query += ",";
                    values_string += ",";
                }
            }
            values_string += ")";
            query += ") VALUES " + values_string;
            return query;
        }
        return undefined;
    }
    getQueryUpdate() {
        if (this.values.length > 0) {
            let query = "UPDATE " + "`" + this.table + "`";
            query += " SET ";
            let value;
            for (let i = 0; i < this.values.length; i++) {
                value = this.values[i];
                query += "`" + value[0] + "`";
                query += "='" + value[1] + "'";
                if (i < this.values.length - 1) {
                    query += ",";
                }
            }
            for (let i = 0; i < this.wheres.length; i++) {
                if (i < 1) {
                    query += " WHERE " + this.wheres[i];
                }
                else {
                    query += " AND " + this.wheres[i];
                }
            }
            return query;
        }
        return undefined;
    }
}
exports.MySQL_InsertOrUpdate = MySQL_InsertOrUpdate;
class MySQL_Select {
    //Constructor
    constructor(table, cols) {
        this.order = undefined;
        this.wheres = new Array(0);
        this.table = table;
        this.cols = cols;
    }
    //Functions
    addWhere(where) {
        this.wheres.push(where);
    }
    getQuery() {
        let query = "SELECT " + this.cols;
        query += " FROM " + this.table;
        for (let i = 0; i < this.wheres.length; i++) {
            if (i < 1) {
                query += " WHERE " + this.wheres[i];
            }
            else {
                query += " AND " + this.wheres[i];
            }
        }
        if (!sys.isNull(this.order)) {
            query += " ORDER BY " + this.order;
        }
        return query;
    }
    setOrder(order) {
        this.order = order;
    }
}
exports.MySQL_Select = MySQL_Select;
//# sourceMappingURL=db_mysql.js.map