class Car {
    constructor(make, model, vin) {
        this.make = make
        this.model = model
        this.vin = vin
    }
}

class InsurancePolicy { }

function makeInsurable(o) {
    o.addInsurancePolicy = (p) => { this.insurancePolicy = p }
    o.getInsurancePolicy = () => this.insurancePolicy
    o.isInsured = () => !!this.insurancePolicy
}

makeInsurable(Car.prototype)

const car1 = new Car()

console.log(car1.isInsured())

car1.addInsurancePolicy('Insurance 1')

console.log(car1.getInsurancePolicy())
console.log(car1.isInsured())