export function capitalize(str:string):string{
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function fillString(str:string, length:number, chars:string):string{
    if(chars.length > 0){
        while(str.length < length){
            str += chars;
        }
    }
    return str;
}