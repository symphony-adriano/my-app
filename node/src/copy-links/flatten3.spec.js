const input = [
    {
        getCharacters: () => [
            'a',
            'b',
        ]
    },
    {
        getCharacters: () => [
            'c',
            'd',
        ]
    },
]
const output = ['a', 'b', 'c', 'd']

const getCharacterList = block => block.getCharacters()
const flattenToArray = (block1, block2) => block1.concat(block2)

const funzione = (input) => input
    .map(getCharacterList)
    .reduce(flattenToArray)

test('asdf', () => {
    expect(funzione(input)).toEqual(output)
})
