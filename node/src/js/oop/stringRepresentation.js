class Car {
    constructor(make, model, vin) {
        this.make = make
        this.model = model
        this.vin = vin
    }
    toString = () => `${this.make} ${this.model} ${this.vin}`
}

const car1 = new Car('Toyota', 'Corolla', '01')

console.log(car1.toString())

// the default behavior of toString is to return [object Object]