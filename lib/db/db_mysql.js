"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQL_Select = exports.MySQL_InsertOrUpdate = exports.MySQL_Drop = exports.MySQL_CreateSchema = void 0;
var MySQL_CreateSchema = /** @class */ (function () {
    //Constructor
    function MySQL_CreateSchema(schema) {
        this.schema = schema;
    }
    //Functions
    MySQL_CreateSchema.prototype.getQuery = function () {
        return "CREATE SCHEMA `" + this.schema + "`";
    };
    return MySQL_CreateSchema;
}());
exports.MySQL_CreateSchema = MySQL_CreateSchema;
var MySQL_Drop = /** @class */ (function () {
    //Constructor
    function MySQL_Drop(table) {
        this.table = table;
    }
    //Functions
    MySQL_Drop.prototype.getQuery = function () {
        return "DROP TABLE " + "`" + this.table + "`";
    };
    return MySQL_Drop;
}());
exports.MySQL_Drop = MySQL_Drop;
var MySQL_InsertOrUpdate = /** @class */ (function () {
    //Constructor
    function MySQL_InsertOrUpdate(table) {
        this.values = new Array(0);
        this.wheres = new Array(0);
        this.table = table;
    }
    //Functions
    MySQL_InsertOrUpdate.prototype.addValue = function (col, val) {
        var value = new Array(2);
        value[0] = col;
        value[1] = val;
        this.values.push(value);
    };
    MySQL_InsertOrUpdate.prototype.getQueryInsert = function () {
        if (this.values.length > 0) {
            var query = "INSERT INTO " + "`" + this.table.name + "`";
            query += " (";
            var value = void 0;
            var values_string = "(";
            for (var i = 0; i < this.values.length; i++) {
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
    };
    MySQL_InsertOrUpdate.prototype.getQueryUpdate = function () {
        if (this.values.length > 0) {
            var query = "UPDATE " + "`" + this.table.name + "`";
            query += " SET ";
            var value = void 0;
            for (var i = 0; i < this.values.length; i++) {
                value = this.values[i];
                query += "`" + value[0] + "`";
                query += "='" + value[1] + "'";
                if (i < this.values.length - 1) {
                    query += ",";
                }
            }
            for (var i = 0; i < this.wheres.length; i++) {
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
    };
    return MySQL_InsertOrUpdate;
}());
exports.MySQL_InsertOrUpdate = MySQL_InsertOrUpdate;
var MySQL_Select = /** @class */ (function () {
    //Constructor
    function MySQL_Select(table, cols) {
        this.order = undefined;
        this.wheres = new Array(0);
        this.table = table;
        this.cols = cols;
    }
    //Functions
    MySQL_Select.prototype.getQuery = function () {
        var query = "SELECT " + this.cols;
        query += " FROM " + this.table;
        for (var i = 0; i < this.wheres.length; i++) {
            if (i < 1) {
                query += " WHERE " + this.wheres[i];
            }
            else {
                query += " AND " + this.wheres[i];
            }
        }
        if (this.order !== undefined && this.order !== null && this.order !== "") {
            query += " ORDER BY " + this.order;
        }
        return query;
    };
    return MySQL_Select;
}());
exports.MySQL_Select = MySQL_Select;
//# sourceMappingURL=db_mysql.js.map