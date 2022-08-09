const { add, addInArray } = require('./layout')

const a = 'a'
const b = 'b'
const c = 'c'
const d = 'd'
const e = 'e'
const n = 'n'

describe('insert:', () => {
    it('should insert same direction', () => {
        const input = [a, b, c]
        expect(addInArray({ input, element: a, newElement: n, before: true, sameDirection: true })).toEqual([n, a, b, c])
        expect(addInArray({ input, element: a, newElement: n, before: false, sameDirection: true })).toEqual([a, n, b, c])
        expect(addInArray({ input, element: b, newElement: n, before: true, sameDirection: true })).toEqual([a, n, b, c])
        expect(addInArray({ input, element: b, newElement: n, before: false, sameDirection: true })).toEqual([a, b, n, c])
        expect(addInArray({ input, element: c, newElement: n, before: true, sameDirection: true })).toEqual([a, b, n, c])
        expect(addInArray({ input, element: c, newElement: n, before: false, sameDirection: true })).toEqual([a, b, c, n])
    })
    it('should insert diff direction', () => {
        const input = [a, b, c]
        expect(addInArray({ input, element: a, newElement: n, before: true })).toEqual([[n, a], b, c])
        expect(addInArray({ input, element: b, newElement: n, before: true })).toEqual([a, [n, b], c])
        expect(addInArray({ input, element: c, newElement: n, before: true })).toEqual([a, b, [n, c]])
        expect(addInArray({ input, element: a, newElement: n, before: false })).toEqual([[a, n], b, c])
        expect(addInArray({ input, element: b, newElement: n, before: false })).toEqual([a, [b, n], c])
        expect(addInArray({ input, element: c, newElement: n, before: false })).toEqual([a, b, [c, n]])
    })
})

describe('add:', () => {
    it('should add to one element', () => {
        const input = [a]
        expect(add({ input, element: a, newElement: n, elementDirection: 'left' })).toEqual([n, a])
        expect(add({ input, element: a, newElement: n, elementDirection: 'right' })).toEqual([a, n])
        expect(add({ input, element: a, newElement: n, elementDirection: 'top' })).toEqual([[n, a]])
        expect(add({ input, element: a, newElement: n, elementDirection: 'bottom' })).toEqual([[a, n]])
    })
    it('should add to two element', () => {
        const input = [a, b]
        expect(add({ input, element: a, newElement: n, elementDirection: 'left' })).toEqual([n, a, b])
        expect(add({ input, element: a, newElement: n, elementDirection: 'right' })).toEqual([a, n, b])
        expect(add({ input, element: a, newElement: n, elementDirection: 'top' })).toEqual([[n, a], b])
        expect(add({ input, element: a, newElement: n, elementDirection: 'bottom' })).toEqual([[a, n], b])
    })
    it('should add to nested array', () => {
        const input = [a, [b, c]]
        expect(add({ input, element: b, newElement: n, elementDirection: 'left' })).toEqual([a, [[n, b], c]])
        expect(add({ input, element: b, newElement: n, elementDirection: 'right' })).toEqual([a, [[b, n], c]])
        expect(add({ input, element: b, newElement: n, elementDirection: 'top' })).toEqual([a, [n, b, c]])
        expect(add({ input, element: b, newElement: n, elementDirection: 'bottom' })).toEqual([a, [b, n, c]])
    })
    it('should add to nested nested array', () => {
        const input = [a, [[b, c], d], e]
        expect(add({ input, element: b, newElement: n, elementDirection: 'top' })).toEqual([a, [[[n, b], c], d], e])
    })
})
