const add = (args) => aux({ ...args, arrayDirection: 'horizontal' })

const aux = ({ input, element, newElement, elementDirection, arrayDirection }) => {
    if (input.includes(element)) {
        return addInArray({ input, element, newElement, before:isBefore(elementDirection), sameDirection: isSameDirection(elementDirection, arrayDirection)})
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
    const index = input.indexOf(element)

    if (sameDirection) {
        return addInSameDirection({ input: inputCopy, index, newElement, before })
    } else {
        return addInDifferentDirection({ input: inputCopy, index, element, newElement, before })
    }
}

const addInSameDirection = ({ input, index, newElement, before }) => {
    if (!before) {
        index++
    }
    input.splice(index, 0, newElement)

    return input
}
const addInDifferentDirection = ({ input, index, element, newElement, before }) => {
    input.splice(index, 1, before ? [newElement, element] : [element, newElement])
    return input
}

module.exports = {
    add,
    addInArray
}