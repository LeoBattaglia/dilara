"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.MySQL_Select = exports.MySQL_InsertOrUpdate = exports.MySQL_Delete = void 0;
//Imports
const db_file_1 = require("./src/db/db_file");
const db_functions_1 = require("./src/db/db_functions");
const db_mysql_1 = require("./src/db/db_mysql");
//Exports
var db_mysql_2 = require("./src/db/db_mysql");
Object.defineProperty(exports, "MySQL_Delete", { enumerable: true, get: function () { return db_mysql_2.MySQL_Delete; } });
Object.defineProperty(exports, "MySQL_InsertOrUpdate", { enumerable: true, get: function () { return db_mysql_2.MySQL_InsertOrUpdate; } });
Object.defineProperty(exports, "MySQL_Select", { enumerable: true, get: function () { return db_mysql_2.MySQL_Select; } });
//Constants
const mysql = require("mysql");
//Declarations
let connection_limit = 10;
let connection_limit_info = 5;
//Classes
class DB {
    //Constructor
    constructor(host, user, password, schema) {
        this.reset = false;
        //private executeQuery(query:string, info?:Boolean){
        this.executeQuery = (query, info) => {
            return new Promise((resolve, reject) => {
                let pool;
                if (info === true) {
                    pool = this.pool_info;
                }
                else {
                    pool = this.pool;
                }
                pool.query(query, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        };
        this.host = host;
        this.user = user;
        this.password = password;
        this.schema = schema;
    }
    //Methods
    checkTables() {
        return __awaiter(this, void 0, void 0, function* () {
            let tables = this.file.tables;
            while (tables.length > 0) {
                const exist = yield this.existTable(tables[0].name);
                if (!exist) {
                    yield this.createTable(tables[0]);
                }
                else {
                    if (this.reset) {
                        yield this.dropTable(tables[0]);
                        yield this.createTable(tables[0]);
                    }
                }
                tables.shift();
            }
        });
    }
    close() {
        this.pool_info.end();
        this.pool.end();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pool_info = mysql.createPool({
                connectionLimit: connection_limit_info,
                host: this.getHost(),
                user: this.getUser(),
                password: this.getPassword(),
                database: "INFORMATION_SCHEMA"
            });
            let exist = yield this.existSchema(this.getSchema());
            if (!exist) {
                let query = new db_mysql_1.MySQL_CreateSchema(this.getSchema());
                yield this.executeQuery(query.getQuery(), true);
            }
            this.pool = mysql.createPool({
                connectionLimit: connection_limit,
                host: this.getHost(),
                user: this.getUser(),
                password: this.getPassword(),
                database: this.getSchema()
            });
        });
    }
    createTable(table) {
        return __awaiter(this, void 0, void 0, function* () {
            if (table.countCells() > 1) {
                let query = (0, db_functions_1.getQuery)(table);
                yield this.executeQuery(query);
                yield this.insertValues(table);
            }
            else {
                throw "Dilara - createTable: Table (" + table.name + ") contains no Cells";
            }
        });
    }
    delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.executeQuery(query.getQuery());
        });
    }
    dropTable(table) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = new db_mysql_1.MySQL_Drop(table.name);
            yield this.executeQuery(query.getQuery());
        });
    }
    existSchema(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = new db_mysql_1.MySQL_Select("INFORMATION_SCHEMA.SCHEMATA", "COUNT(*) AS cnt");
            query.wheres.push("SCHEMA_NAME=" + "'" + schema + "'");
            const values = yield this.executeQuery(query.getQuery(), true);
            if (values[0].cnt === 0) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    existTable(table) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = new db_mysql_1.MySQL_Select("INFORMATION_SCHEMA.TABLES", "COUNT(*) AS cnt");
            query.wheres.push("TABLE_SCHEMA=" + "'" + this.schema + "'");
            query.wheres.push("TABLE_NAME='" + table + "'");
            const values = yield this.executeQuery(query.getQuery(), true);
            if (values[0].cnt === 0) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    getEmptyDeleteQuery(table) {
        return new db_mysql_1.MySQL_Delete(table);
    }
    getEmptyInsertOrUpdateQuery(table) {
        return new db_mysql_1.MySQL_InsertOrUpdate(table);
    }
    getEmptySelectQuery(table, cols) {
        return new db_mysql_1.MySQL_Select(table, cols);
    }
    getHost() {
        return this.host;
    }
    getPassword() {
        return this.password;
    }
    getSchema() {
        return this.schema;
    }
    getUser() {
        return this.user;
    }
    init(path) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            if (path !== undefined) {
                yield this.installDB(path);
            }
        });
    }
    insertValues(table) {
        return __awaiter(this, void 0, void 0, function* () {
            while (table.inserts.length > 0) {
                let insert = table.inserts[0];
                table.inserts.shift();
                let query = new db_mysql_1.MySQL_InsertOrUpdate(table);
                let insert_split = insert.split(";");
                for (let i = 0; i < insert_split.length; i++) {
                    query.addValue(table.cells[i + 1].getPara("name"), insert_split[i].trim());
                }
                yield this.executeQuery(query.getQueryInsert());
            }
        });
    }
    installDB(path) {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = new db_file_1.DB_File(path);
            yield this.checkTables();
        });
    }
    select(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.executeQuery(query.getQuery());
        });
    }
    setConnectionLimits(limit, limit_info) {
        connection_limit = limit;
        connection_limit_info = limit_info;
    }
    setReset(reset) {
        this.reset = reset;
    }
}
exports.DB = DB;
//# sourceMappingURL=index.js.map