const { anything, mock, instance, verify, when, } = require('ts-mockito')

const Foo = require('./Foo')

describe('Foo', () => {
  it('should return Fortunate Son if not mocked', () => {
    const foo = new Foo()
    expect(foo.getBar()).toEqual('Fortunate Son')
    foo.age = 35
    expect(foo.age).toEqual(35)
  })
  it('should mock Foo', () => {
    const mockedFoo = mock(Foo)
    const mockedInstance = instance(mockedFoo)

    mockedInstance.getBar('Creedence')
    mockedInstance.getBar('Stones')

    verify(mockedFoo.getBar('Stones')).called()
    verify(mockedFoo.getBar(anything())).called()
  })
  it('should stub method calls', () => {
    const mockedFoo = mock(Foo)
    when(mockedFoo.getBar('Guns')).thenReturn('Patience')
    const mockedInstance = instance(mockedFoo)

    expect(mockedInstance.getBar('Guns')).toEqual('Patience')
    // getBar('Iron') is not stubbed
    expect(mockedInstance.getBar('Iron')).toEqual(null)
  })
  it('should stub getter value', () => {
    const mockedFoo = mock(Foo)
    when(mockedFoo.age).thenReturn('Patience')
    const mockedInstance = instance(mockedFoo)

    expect(mockedInstance.age).toEqual('Patience')
  })
})