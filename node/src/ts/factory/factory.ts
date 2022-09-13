interface Person {
    getName: Function
}

class Villager implements Person {
    public getName = () => 'Village Person'    
}

class CityPerson implements Person {
    public getName = () => 'City Person'
}

enum PersonType {
    RURAL,
    URBAN,
}

class PersonFactory {
    public getPerson = (type: PersonType) => {
        switch (type) {
            case PersonType.RURAL:
                return new Villager()
            case PersonType.URBAN:
                return new CityPerson()
            default:
                throw 'Person Type not supported!' 
        }
    }
}

const factory = new PersonFactory()

console.log(factory.getPerson(PersonType.RURAL).getName())
console.log(factory.getPerson(PersonType.URBAN).getName())
