const array1 = [1,2,3,4,5,6]

const initialValue = 0;

const reducer = (previousValue, currentValue) => previousValue + currentValue

const sumWithInitial = array1.reduce(reducer, initialValue)

console.log(sumWithInitial)

