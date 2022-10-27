class Macchina {
    constructor(nome) {
        this.nome = nome
    }
    sayHello() {
        console.log(this.nome)
    }
}

let nome = true

const macchina1 = new Macchina(nome)

macchina1.sayHello()

nome = false

macchina1.sayHello()
