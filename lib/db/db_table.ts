//Imports
import {DB_CellOrKey} from "./db_cellorkey";
import {print, printLine} from "../sys";

export class DB_Table{
    //Declarations
    name:string;
    cells: Array<DB_CellOrKey>;
    keys: Array<DB_CellOrKey>;
    inserts: Array<string>;

    //Constructor
    constructor(name:string){
        this.name = name;
        this.cells = new Array<DB_CellOrKey>(0);
        this.keys = new Array<DB_CellOrKey>(0);
        this.inserts = new Array<string>(0);
        //Add Default-Cell: ID
        let cellOrKey:DB_CellOrKey = new DB_CellOrKey();
        cellOrKey.addPara("type", "int");
        cellOrKey.addPara("name", "id");
        cellOrKey.addPara("auto_increment", "true");
        this.cells.push(cellOrKey);
    }

    //Functions
    addCellOrKey(str:string, key:Boolean):void{
        let paras:string[] = str.split(";");
        let para_split:string[];
        let cellOrKey:DB_CellOrKey = new DB_CellOrKey();
        for(let para of paras){
            para = para.trim();
            para_split = para.split(":")
            if(para_split.length == 2){
                para_split[0] = para_split[0].trim();
                para_split[1] = para_split[1].trim();
                if(para_split[0].length > 0 && para_split[1].length > 0){
                    cellOrKey.addPara(para_split[0], para_split[1])
                }else{
                    print("--> Error 2 in Parameter: " + para);
                }
            }else{
                print("--> Error 1 in Parameter: " + para);
            }
        }
        if(cellOrKey.hasName() && cellOrKey.hasType()){
            if(key){
                this.keys.push(cellOrKey);
            }else{
                this.cells.push(cellOrKey);
            }
        }
    }

    addInsert(insert:string){
        this.inserts.push(insert);
    }

    countCells():number{
        return this.cells.length;
    }
}