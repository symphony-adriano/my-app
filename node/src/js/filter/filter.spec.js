const isOfficial = foo => foo?.official

const input = [
    { id: 1, official: true },
    { id: 2, official: false },
    { id: 3, official: true },
    { id: 4, official: false },
]

describe('filter', () => {
    it('should filter', () => {
        expect(isOfficial({ official: true })).toBe(true)
        expect(isOfficial({ official: false })).toBe(false)
        expect(input.filter(isOfficial)).toEqual([
            { id: 1, official: true },
            { id: 3, official: true },
        ])
    })
})
