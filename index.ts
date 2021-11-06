//Imports
import {DB_File} from "./src/db/db_file";
import {DB_Table} from "./src/db/db_table";
import {getQuery} from "./src/db/db_functions";
import {MySQL_CreateSchema, MySQL_Delete, MySQL_Drop, MySQL_InsertOrUpdate, MySQL_Select} from "./src/db/db_mysql";

//Exports
export {MySQL_Delete, MySQL_InsertOrUpdate, MySQL_Select} from "./src/db/db_mysql";

//Constants
const mysql = require("mysql");

//Declarations
let connection_limit:number = 10;
let connection_limit_info:number = 5;

//Classes
export class DB{
    //Declarations
    private file:DB_File;
    private readonly host:string;
    private readonly password:string;
    private pool;
    private pool_info;
    private readonly schema:string;
    private readonly user:string;
    private reset:Boolean = false;

    //Constructor
    constructor(host:string, user:string, password:string, schema:string){
        this.host = host;
        this.user = user;
        this.password = password;
        this.schema = schema;
    }

    //Methods
    private async checkTables(){
        let tables = this.file.tables;
        while(tables.length > 0){
            const exist:Boolean = await this.existTable(tables[0].name);
            if(!exist){
                await this.createTable(tables[0]);
            }else{
                if(this.reset){
                    await this.dropTable(tables[0]);
                    await this.createTable(tables[0]);
                }
            }
            tables.shift();
        }
    }

    close():void{
        this.pool_info.end();
        this.pool.end();
    }

    private async connect(){
        this.pool_info = mysql.createPool({
            connectionLimit: connection_limit_info,
            host: this.getHost(),
            user: this.getUser(),
            password: this.getPassword(),
            database: "INFORMATION_SCHEMA"
        });
        let exist:Boolean = await this.existSchema(this.getSchema());
        if(!exist){
            let query:MySQL_CreateSchema = new MySQL_CreateSchema(this.getSchema());
            await this.executeQuery(query.getQuery(), true);
        }
        this.pool = mysql.createPool({
            connectionLimit: connection_limit,
            host: this.getHost(),
            user: this.getUser(),
            password: this.getPassword(),
            database: this.getSchema()
        });
    }

    async createTable(table:DB_Table){
        if(table.countCells() > 1){
            let query:string = getQuery(table);
            await this.executeQuery(query);
            await this.insertValues(table);
        }else{
            throw "Dilara - createTable: Table (" + table.name + ") contains no Cells";
        }
    }

    async delete(query:MySQL_Delete){
        return await this.executeQuery(query.getQuery());
    }

    async dropTable(table:DB_Table){
        let query:MySQL_Drop = new MySQL_Drop(table.name);
        await this.executeQuery(query.getQuery());
    }

    async existSchema(schema:string){
        let query:MySQL_Select = new MySQL_Select("INFORMATION_SCHEMA.SCHEMATA", "COUNT(*) AS cnt");
        query.wheres.push("SCHEMA_NAME=" + "'" + schema + "'");
        const values = await this.executeQuery(query.getQuery(), true);
        if(values[0].cnt === 0){
            return false;
        }else{
            return true;
        }
    }

    async existTable(table:string){
        let query:MySQL_Select = new MySQL_Select("INFORMATION_SCHEMA.TABLES", "COUNT(*) AS cnt");
        query.wheres.push("TABLE_SCHEMA=" + "'" + this.schema + "'");
        query.wheres.push("TABLE_NAME='" + table + "'")
        const values = await this.executeQuery(query.getQuery(), true);
        if(values[0].cnt === 0){
            return false;
        }else{
            return true;
        }
    }

    //private executeQuery(query:string, info?:Boolean){
        executeQuery = (query:string, info?:Boolean) => {
        return new Promise((resolve, reject) => {
            let pool;
            if(info === true){
                pool = this.pool_info;
            }else{
                pool = this.pool;
            }
            pool.query(query, (error, results) => {
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };

    getEmptyDeleteQuery(table:string):MySQL_Delete{
        return new MySQL_Delete(table);
    }

    getEmptyInsertOrUpdateQuery(table:DB_Table):MySQL_InsertOrUpdate{
        return new MySQL_InsertOrUpdate(table);
    }

    getEmptySelectQuery(table:string, cols:string):MySQL_Select{
        return new MySQL_Select(table, cols);
    }

    getHost():string{
        return this.host;
    }

    private getPassword():string{
        return this.password;
    }

    getSchema():string{
        return this.schema;
    }

    private getUser():string{
        return this.user;
    }

    async init(path?:string){
        await this.connect();
        if(path !== undefined){
            await this.installDB(path);
        }
    }

    private async insertValues(table:DB_Table){
        while(table.inserts.length > 0){
            let insert:string = table.inserts[0];
            table.inserts.shift();
            let query:MySQL_InsertOrUpdate = new MySQL_InsertOrUpdate(table);
            let insert_split:string[] = insert.split(";")
            for(let i:number=0; i<insert_split.length; i++){
                query.addValue(table.cells[i+1].getPara("name"), insert_split[i].trim());
            }
            await this.executeQuery(query.getQueryInsert());
        }
    }

    private async installDB(path:string){
        this.file = new DB_File(path);
        await this.checkTables();
    }

    async select(query:MySQL_Select){
        return await this.executeQuery(query.getQuery());
    }

    setConnectionLimits(limit:number, limit_info:number){
        connection_limit = limit;
        connection_limit_info = limit_info;
    }

    setReset(reset:Boolean):void{
        this.reset = reset;
    }
}