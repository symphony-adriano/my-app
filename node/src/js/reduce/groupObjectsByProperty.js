const people = [
    {name: 'Adriano', age: 35, },
    {name: 'Bruna', age: 70, },
    {name: 'Tonino', age: 70, },
]

const initialValue = {}

const reducer = (previousValue, currentValue) => {
    const key = currentValue['age']
    previousValue[key] ??= []
    previousValue[key].push(currentValue.name)
    return previousValue
}

Array.prototype.groupByAge = function() {
    return this.reduce(reducer, initialValue)
} 

const grouped = people.groupByAge()

console.log(grouped)
