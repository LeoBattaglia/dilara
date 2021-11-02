import {DB_Para} from "./db_para";

export class DB_CellOrKey{
    //Declarations
    paras: Array<DB_Para>;

    //Constructor
    constructor(){
        this.paras = new Array<DB_Para>(0);
    }

    //Functions
    addPara(name:string, value:string):void{
        this.paras.push(new DB_Para(name, value));
    }

    getIndexes():string[]{
        let indexes:Array<string> = new Array<string>(0);
        for(let para of this.paras){
            if(para.name === "index"){
                indexes.push(para.value)
            }
        }
        return indexes;
    }

    getPara(name:string):string{
        for(let para of this.paras){
            if(para.name === name){
                return para.value;
            }
        }
        return undefined;
    }

    hasName():Boolean{
        for(let para of this.paras){
            if(para.name === "name"){
                return true;
            }
        }
        return false;
    }

    hasType():Boolean{
        for(let para of this.paras){
            if(para.name === "type"){
                return true;
            }
        }
        return false;
    }
}