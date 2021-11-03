//Imports
import * as sys from "samara";

//Constants
const mysql = require("mysql");

//Classes
export class DB{
    //Declarations
    private dbconn;
    private dbconn_info;
    private readonly host:string;
    private readonly password:string;
    private readonly schema:string;
    private readonly user:string;

    //Constructor
    constructor(host:string, user:string, password:string, schema:string){
        this.host = host;
        this.user = user;
        this.password = password;
        this.schema = schema;
        this.connect();
    }

    //Methods
    close():void{
        this.dbconn.end();
        this.dbconn_info.end();
    }

    connect():void{
        this.dbconn_info = mysql.createConnection({
            host: this.getHost(),
            user: this.getUser(),
            password: this.getPassword(),
            database: "INFORMATION_SCHEMA"
        });
        this.dbconn_info.connect(function(error):void{
            if(error) throw error;
        });
        this.dbconn = mysql.createConnection({
            host: this.getHost(),
            user: this.getUser(),
            password: this.getPassword(),
            database: this.getSchema()
        });
        this.dbconn.connect(function(error):void{
            if(error) throw error;
        });
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
}