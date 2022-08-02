import counterReducer, {
    decrement,
    increment,
    incrementByAmount,
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
    it('should handle decrement', () => {
        const actual = counterReducer(initialState, decrement())
        expect(actual.value).toEqual(2)
    })
    it('should handle increment by amount', () => {
        const actual = counterReducer(initialState, incrementByAmount(3))
        expect(actual.value).toEqual(6)
    })
})
