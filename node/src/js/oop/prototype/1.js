class Car {
    constructor(make, model, vin) {
        this.make = make
        this.model = model
        this.vin = vin
    }
}

console.log(Car.prototype)

const car1 = new Car('Ford', 'Fiesta', '01')

console.log(car1.__proto__)

console.log(car1.__proto__ === Car.prototype)