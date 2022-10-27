const input = [
    {
        character: [
            'a',
            'b',
        ]
    },
    {
        character: [
            'c',
            'd',
        ]
    },
]
const output = ['a', 'b', 'c', 'd']

const flattenToArray = (block1, block2) => block1.character.concat(block2.character)

const funzione = (input) => input
    .reduce(flattenToArray)

test('asdf', () => {
    expect(funzione(input)).toEqual(output)
})
