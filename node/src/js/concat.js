const first = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]

const second = [
    { id: 2 },
    { id: 3 },
    { id: 4 },
]

const result = first

function unique(array, field) {
    const result = [...array]
    for (let i = 0; i < result.length; ++i) {
        for (let j = i + 1; j < result.length; ++j) {
            if (result[i][field] === result[j][field])
                result.splice(j--, 1);
        }
    }
    return result;
}
console.log(unique([...first, ...second], 'id'))
