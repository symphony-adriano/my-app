const object = {
    name: 'Adriano',
    speak() {
        console.log(this)
        return `My name is ${this?.name}!`
    },
}

it('should return its name', () => {
    expect(object.speak()).toEqual('My name is Adriano!')
})

test('this should be bound according to how the function is called, not where the function is declared', () => {
    const speak = object.speak
    expect(speak === object.speak).toBe(true)
    expect(speak()).toEqual('My name is undefined!')
})

