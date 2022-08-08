const add = (args) => aux({ ...args, arrayDirection: 'horizontal' })

const aux = ({ input, element, newElement, elementDirection, arrayDirection }) => {

    const sameDirection = isSameDirection(elementDirection, arrayDirection)
    const before = isBefore(elementDirection)

    if (input.includes(element)) {
        if (sameDirection) {
            return insertElement(input, element, newElement, before)
        } else {
            return insertArray(input, element, newElement, before)
        }
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

const insertElement = (input, element, newElement, before) => {
    const array = [...input]
    let index = array.indexOf(element)

    if (!before) {
        index++
    }
    array.splice(index, 0, newElement)

    return array
}

const insertArray = (input, element, newElement, before) => {
    const array = [...input]
    const index = array.indexOf(element)
    const newArray = before ? [newElement, element] : [element, newElement]
    array.splice(index, 1, newArray)
    return array
}

module.exports = {
    add,
    insertElement,
    insertArray,
}