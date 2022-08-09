const names = ['Alice', 'Alice', 'Bobo', 'Carl', 'Bobo']

const initialValue = {}

const reducer = (previousValue, currentValue) => {
    previousValue[currentValue] ??= 0
    previousValue[currentValue]++
    return previousValue
}

const countedNames = names.reduce(reducer, initialValue)

console.log(countedNames)
