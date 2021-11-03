"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
//Constants
const mysql = require("mysql");
//Classes
class DB {
    //Constructor
    constructor(host, user, password, schema) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.schema = schema;
        this.connect();
    }
    //Methods
    close() {
        this.dbconn.end();
        this.dbconn_info.end();
    }
    connect() {
        this.dbconn_info = mysql.createConnection({
            host: this.getHost(),
            user: this.getUser(),
            password: this.getPassword(),
            database: "INFORMATION_SCHEMA"
        });
        this.dbconn_info.connect(function (error) {
            if (error)
                throw error;
        });
        this.dbconn = mysql.createConnection({
            host: this.getHost(),
            user: this.getUser(),
            password: this.getPassword(),
            database: this.getSchema()
        });
        this.dbconn.connect(function (error) {
            if (error)
                throw error;
        });
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
}
exports.DB = DB;
//# sourceMappingURL=index.js.map