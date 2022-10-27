const input = [['a', 'b'], ['c', 'd']]
const output = ['a', 'b', 'c', 'd']

const funzione = (input) => input.reduce((a, b) => a.concat(b))

test('asdf', () => {
    expect(funzione(input)).toEqual(output)
})
