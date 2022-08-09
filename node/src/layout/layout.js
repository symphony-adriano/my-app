const add = (args) => aux({ ...args, arrayDirection: 'horizontal' })

const aux = ({ input, element, newElement, elementDirection, arrayDirection }) => {
    if (input.includes(element)) {
        return addInArray({ input, element, newElement, before: isBefore(elementDirection), sameDirection: isSameDirection(elementDirection, arrayDirection) })
    } else if (shouldRecurse(input)) {
        return input.map(currentArray => aux({ input: currentArray, element, newElement, elementDirection, arrayDirection: switchArrayDirection(arrayDirection) }))
    } else {
        return input
    }
}

const shouldRecurse = input => Array.isArray(input) && containsArray(input)

const switchArrayDirection = (arrayDirection) => arrayDirection === 'horizontal' ? 'vertical' : 'horizontal'

const isSameDirection = (elementDirection, arrayDirection) =>
    ((elementDirection === 'left' || elementDirection === 'right') && arrayDirection === 'horizontal') ||
    ((elementDirection === 'top' || elementDirection === 'bottom') && arrayDirection !== 'horizontal')

const isBefore = (elementDirection) => (elementDirection === 'left' || elementDirection === 'top')

const containsArray = array => array.some(element => Array.isArray(element))

const addInArray = ({ input, element, newElement, before, sameDirection }) => {
    const inputCopy = [...input]
    let index = input.indexOf(element)
    if (sameDirection) {
        if (!before) {
            index++
        }
        inputCopy.splice(index, 0, newElement)
    } else {
        const newArray = before ? [newElement, element] : [element, newElement]
        inputCopy.splice(index, 1, newArray)
    }
    return inputCopy
}

module.exports = {
    add,
    addInArray,
}