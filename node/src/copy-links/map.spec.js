const arr = [
    { key: 'qwer', val: 1 },
    { key: 'asdf', val: 2 },
]

const result = {
    'asdf': 2,
    'qwer': 1,
}

const convertToMap = (previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.val
    return previousValue
}

const funzione = input => input.reduce(convertToMap, {})

test('asdf', () => {
    expect(funzione(arr)).toEqual(result)
})

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

test('asdf', () => {
    expect()
})