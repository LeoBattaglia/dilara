//Requires
const mysql = require("mysql");

//Imports
import {DB_File} from "./db/db_file";
import {getQuery} from "./db/db_functions";
import {DB_Table} from "./db/db_table";
import {config_json, print} from "./sys";
import {MySQL_CreateSchema, MySQL_Drop, MySQL_InsertOrUpdate, MySQL_Select} from "./db/db_mysql";

//Declarations
let config:config_json;
let dbconn;

//Functions
function checkSchema():void{
    let query:MySQL_Select = new MySQL_Select("INFORMATION_SCHEMA.SCHEMATA", "COUNT(*) AS cnt");
    query.wheres.push("SCHEMA_NAME=" + "'" + config.db_schema + "'");
    dbconn.query(query.getQuery(), function(err, result):void{
        if (err) throw err;
        if(result[0].cnt == 0){
            print("--> Schema (" + config.db_schema + ") does NOT exist!");
            installSchema();
        }
        closeConnection();
        createConnection(true);
        connect(false);
    });
}

function checkTable(tables:DB_Table[]):void{
    if(tables.length > 0){
        let table: DB_Table = tables[0];
        //print("CHECK TABLE: " + table.getName());
        let query:MySQL_Select = new MySQL_Select("INFORMATION_SCHEMA.TABLES", "COUNT(*) AS cnt");
        query.wheres.push("TABLE_SCHEMA=" + "'" + config.db_schema + "'");
        query.wheres.push("TABLE_NAME='" + table.name + "'")
        dbconn.query(query.getQuery(), function(err, result):void{
            if (err) throw err;
            if(result[0].cnt < 1){
                //print("--> Table (" + table.getName() + ") does NOT exist!");
                createTable(tables);
            }else{
                if(config.db_reset){
                    dropTable(tables);
                }else{
                    tables.shift();
                    checkTable(tables);
                }
            }
        });
    }
}

function checkTables(){
    //print("CHECK TABLES");
    let db_file:DB_File = new DB_File("./db/db.txt");
    db_file.parse();
    checkTable(db_file.tables);
}

export function closeConnection():void{
    dbconn.end();
}

function connect(check_schema:boolean):void{
    dbconn.connect(function(err):void{
        if(err) throw err;
        if(check_schema){
            checkSchema();
        }else{
            checkTables();
        }
    });
}

function createConnection(use_schema:boolean):void{
    if(use_schema){
        dbconn = mysql.createConnection({
            host: config.db_host,
            user: config.db_user,
            password: config.db_pw,
            database: config.db_schema
        });
    }else{
        dbconn = mysql.createConnection({
            host: config.db_host,
            user: config.db_user,
            password: config.db_pw,
            database: "INFORMATION_SCHEMA"
        });
    }
}

function createTable(tables:DB_Table[]):void{
    let table:DB_Table = tables[0];
    tables.shift();
    if(table.countCells() > 1){
        //print("CREATE TABLE: " + table.getName());
        let query:string = getQuery(table);
        //print("QUERY: " + query);
        dbconn.query(query, function(err):void{
            if (err) throw err;
            insertValues(table, tables);
        });
    }else{
        print("--> Table (" + table.name + ") contains NOT enough Cells!");
    }
}

function dropTable(tables:DB_Table[]):void{
    let table:DB_Table = tables[0];
    let query:MySQL_Drop = new MySQL_Drop(table.name);
    dbconn.query(query.getQuery(), function(err):void{
        if (err) throw err;
        createTable(tables);
    });
}

export function init(config:config_json):void{
    setConfiguration(config);
    createConnection(false);
    connect(true);
}

function insertValues(table:DB_Table, tables:DB_Table[]):void{
    if(table.inserts.length > 0){
        let insert:string = table.inserts[0];
        table.inserts.shift();
        let query:MySQL_InsertOrUpdate = new MySQL_InsertOrUpdate(table);
        let insert_split:string[] = insert.split(";")
        for(let i:number=0; i<insert_split.length; i++){
            query.addValue(table.cells[i+1].getPara("name"), insert_split[i].trim());
        }
        dbconn.query(query.getQueryInsert(), function(err){
            if (err) throw err;
            insertValues(table, tables);
        });
    }else{
        checkTable(tables);
    }
}

function installSchema():void{
    let query:MySQL_CreateSchema = new MySQL_CreateSchema(config.db_schema);
    dbconn.query(query.getQuery(), function(err){
        if (err) throw err;
        print("--> Built Schema (" + config.db_schema + ").");
    });
}

function setConfiguration(configuration:config_json):void{
    config = configuration;
}