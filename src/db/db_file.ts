//Imports
import {readFileSync} from "fs";
import {DB_Table} from "./db_table";

//Declarations

export class DB_File{
    //Declarations
    file_path:string;
    file_string:string;
    tables:Array<DB_Table> = new Array<DB_Table>(0);

    //Constructor
    constructor(path:string){
        this.file_path = path;
        this.file_string = readFileSync(path, "utf-8");
        this.parse();
    }

    //Methods
    getTableNames():string[]{
        let names:Array<string> = new Array<string>(0);
        for(let table of this.tables){
            names.push(table.name);
        }
        return names;
    }

    private parse(){
        let separator:string = "#table";
        if(this.file_string.indexOf(separator) > -1){
            let split_tables:string[] = this.file_string.split(separator);
            for(let table_split of split_tables){
                let table:DB_Table = undefined;
                let split_rows:string[] = table_split.split("\n");
                for(let i in split_rows){
                    let row:string = split_rows[i];
                    row = row.trim();
                    while(row.indexOf("\t") > -1){
                        row = row.replace("\t", "");
                    }
                    while(row.indexOf("  ") > -1){
                        row = row.replace("  ", " ");
                    }
                    if(row.length > 0){
                        if(row.indexOf("#") == 0){
                            let cmd:string;
                            if(row === "#create"){
                                cmd = "create";
                            }else{
                                if(row.indexOf(":") > 1){
                                    cmd = row.substring(1, row.indexOf(":"))
                                    cmd = cmd.trim().toLowerCase();
                                }else{
                                    cmd = null;
                                }
                            }
                            if(cmd != null){
                                row = row.substring(row.indexOf(":") + 1, row.length);
                                row = row.trim();
                                if(cmd === "name"){
                                    table = new DB_Table(row)
                                }else if(cmd === "cell" && table !== undefined){
                                    table.addCellOrKey(row, false);
                                }else if(cmd === "key" && table !== undefined){
                                    table.addCellOrKey(row, true);
                                }else if(cmd === "ins" && table !== undefined){
                                    table.addInsert(row);
                                }else if(cmd === "create" && table !== undefined){
                                    this.tables.push(table);
                                    table = undefined;
                                }else{
                                    throw "Dilara - parse: Unknown Command (" + cmd + "): " + row;
                                }
                            }
                        }
                    }
                }
            }
        }else{
            throw "Dilara - parse: File (" + this.file_path + ") does not contain any Tables";
        }
    }
}