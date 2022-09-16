const nome = 'Flavio'

console.log(('Adriano' || 'Flavio') === nome)

describe('lookup tables', () => {
    it('should return true', () => {
        expect({Adriano: 1, Flavio: 1}['Adriano']).toBeTruthy()
        expect({Adriano: 1, Flavio: 1}['Flavio']).toBeTruthy()
        expect({Adriano: 1, Flavio: 1}['Luca']).toBeFalsy()
    })
})