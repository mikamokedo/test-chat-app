export const getFirstChar = (name:string) => {
    return  name.split(' ').join('').substring(0,1).toLocaleUpperCase();
}