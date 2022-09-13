const isSingleModule1 = (workspace) => {
    if (!workspace || workspace.length !== 1) {
        return false
    }
    return workspace[0].length === 1
}

const isSingleModule = (workspace) => 
    workspace?.length === 1 && workspace[0].length === 1

describe('isSingleModule', () => {
    it('should be a single module', () => {
        // !workspace
        expect(isSingleModule(undefined)).toBe(false)
        expect(isSingleModule(null)).toBe(false)
        expect(isSingleModule(false)).toBe(false)

        // workspace.length != 1
        expect(isSingleModule(1)).toBe(false)
        expect(isSingleModule([])).toBe(false)
        expect(isSingleModule([1, 2])).toBe(false)
        
        // workspace[0].length !== 1
        expect(isSingleModule([1])).toBe(false)
        expect(isSingleModule([[]])).toBe(false)
        expect(isSingleModule([[1, 2]])).toBe(false)
        
        // workspace[0].length === 1
        expect(isSingleModule([[1]])).toBe(true)        
    })
})