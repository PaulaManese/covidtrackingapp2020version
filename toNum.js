export default function toNum(str){
    const arr = [...str]
    const filteredArr = arr.filter(element => element !== ",")
    return parseInt(filteredArr.reduce((x, y) => x + y))
}