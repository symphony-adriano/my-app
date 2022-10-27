const mockInput = {
    "2212f452-03c1-4dea-b928-ddce824dcec6": {
        "type": "LINK",
        "mutability": "MUTABLE",
        "data": {
            "url": "qwer.com",
            "targetOption": "_blank"
        }
    },
    "b7dcfaab-831a-46e4-adee-8579c199db5d": {
        "type": "LINK",
        "mutability": "MUTABLE",
        "data": {
            "url": "google.it",
            "targetOption": "_blank"
        }
    }
}

const temp = Object.keys(mockInput).forEach((key) => {
    const entity = entities[key];
    newEntityKeys[key] = Entity.create(
      entity.get('type'),
      entity.get('mutability'),
      entity.get('data'),
    );
})

console.log()