import {DB_Table} from "./db_table";
import * as sys from "samara"

export class MySQL_CreateSchema{
    //Declarations
    schema:string;

    //Constructor
    constructor(schema:string){
        this.schema = schema;
    }

    //Functions
    getQuery():string{
        return "CREATE SCHEMA `" + this.schema + "`"
    }
}

export class MySQL_Delete{
    //Declarations
    table:string;
    wheres:Array<string> = new Array<string>(0);

    //Constructor
    constructor(table:string){
        this.table = table;
    }

    //Functions
    getQuery():string{
        let query:string = "DELETE FROM " + this.table;
        for(let i:number=0; i<this.wheres.length; i++){
            if(i < 1){
                query += " WHERE " + this.wheres[i];
            }else{
                query += " AND " + this.wheres[i];
            }
        }
        return query;
    }
}

export class MySQL_Drop{
    //Declarations
    table:string;

    //Constructor
    constructor(table:string){
        this.table = table;
    }

    //Functions
    getQuery():string{
        return "DROP TABLE " + "`" + this. table + "`";
    }
}

export class MySQL_InsertOrUpdate{
    //Declarations
    table:string;
    values:Array<Array<string>> = new Array<Array<string>>(0);
    wheres:Array<string> = new Array<string>(0);

    //Constructor
    constructor(table:string){
        this.table = table;
    }

    //Functions
    addValue(col:string, val:string):void{
        let value:Array<string> = new Array<string>(2);
        value[0] = col;
        value[1] = val;
        this.values.push(value);
    }

    addWhere(where:string):void{
        this.wheres.push(where);
    }

    getQueryInsert():string{
        if(this.values.length > 0){
            let query: string = "INSERT INTO " + "`" + this.table + "`";
            query += " (";
            let value:string[];
            let values_string:string = "(";
            for(let i=0; i<this.values.length; i++){
                value = this.values[i];
                query += "`" + value[0] + "`";
                values_string += "'" + value[1] + "'";
                if(i < this.values.length - 1){
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

    getQueryUpdate():string{
        if(this.values.length > 0){
            let query: string = "UPDATE " + "`" + this.table + "`";
            query += " SET ";
            let value:string[];
            for(let i:number=0; i<this.values.length; i++){
                value = this.values[i];
                query += "`" + value[0] + "`";
                query += "='" + value[1] + "'";
                if(i < this.values.length - 1){
                    query += ",";
                }
            }
            for(let i:number=0; i<this.wheres.length; i++){
                if(i < 1){
                    query += " WHERE " + this.wheres[i];
                }else{
                    query += " AND " + this.wheres[i];
                }
            }
            return query;
        }
        return undefined;
    }
}

export class MySQL_Select{
    //Declarations
    cols:string;
    order:string = undefined;
    table:string;
    wheres:Array<string> = new Array<string>(0);

    //Constructor
    constructor(table:string, cols:string){
        this.table = table;
        this.cols = cols;
    }

    //Functions
    addWhere(where:string):void{
        this.wheres.push(where);
    }

    getQuery():string{
        let query:string = "SELECT " + this.cols;
        query += " FROM " + this.table;
        for(let i:number=0; i<this.wheres.length; i++){
            if(i < 1){
                query += " WHERE " + this.wheres[i];
            }else{
                query += " AND " + this.wheres[i];
            }
        }
        if(!sys.isNull(this.order)){
            query += " ORDER BY " + this.order
        }
        return query;
    }
}