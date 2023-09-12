export const getFirstChar = (name:string) => {
    return  name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').join('').substring(0,1).toLocaleUpperCase();
}