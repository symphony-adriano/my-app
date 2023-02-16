const array = ['red', 'yellow']

const object = array.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue]: 'ciao ' + currentValue }), {})

console.log(object)