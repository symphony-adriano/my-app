import counterReducer, {
    increment,
} from './counterSlice'

describe('counter slice', () => {
    const initialState = {
        value: 3,
    }
    it('should handle initial state', () => {
        expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
            value: 0
        })
    })
    it('should handle increment', () => {
        const actual = counterReducer(initialState, increment())
        expect(actual.value).toEqual(4)
    })
})
