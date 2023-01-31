function Proto()  {
    this.name = 'Proto'
    return this
}

Proto.prototype.getName = function() {
    return this.name
  }

class MyClass extends Proto {
    constructor() {
        super()
        this.name = 'MyClass'
    }
}

const instance = new MyClass()

console.log(instance.getName())