export const returnNameWithNoSpaces = (fileName:string):string =>{
    return fileName.replace(/\s+/g, '');
}