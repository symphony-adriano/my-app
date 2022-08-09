const input = [[0,1], [2,3], [4,5]]

const initialValue = []

const reducer = (previousValue, currentValue) => previousValue.concat(currentValue)

const flattened = input.reduce(reducer, initialValue)

console.log(flattened)