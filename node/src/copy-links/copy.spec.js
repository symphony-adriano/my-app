const { Entity } = require('draft-js')

jest.mock('draft-js', () => ({
  Entity: {
    get: (key) => {
      switch (key) {
        case "b660f791-1a10-47d3-b970-448b00d5afdd":
          return {
            "type": "LINK",
            "mutability": "MUTABLE",
            "data": {
              "url": "google.com",
              "targetOption": "_blank"
            }
          }
        case "ad250cba-e4c9-8721-1b32-6142cf223c73":
          return {
            "type": "LINK",
            "mutability": "MUTABLE",
            "data": {
              "url": "repubblica.it",
              "targetOption": "_blank"
            }
          }
        case "46d30bfd-3137-43a1-b30e-f0d987043d26":
          return {
            "type": "LINK",
            "mutability": "MUTABLE",
            "data": {
              "url": "ilfattoquotidiano.it",
              "targetOption": "_blank"
            }
          }
      }
    }
  }
}))

const mockFragment = [
  { // block1
    getCharacterList: () => [
      {
        getEntity: () => null,
      },
      {
        getEntity: () => null,
      },
      {
        getEntity: () => "b660f791-1a10-47d3-b970-448b00d5afdd"
      },
      {
        getEntity: () => "b660f791-1a10-47d3-b970-448b00d5afdd"
      },
      {
        getEntity: () => null,
      },
      {
        getEntity: () => "ad250cba-e4c9-8721-1b32-6142cf223c73"
      },
      {
        getEntity: () => "ad250cba-e4c9-8721-1b32-6142cf223c73"
      },
    ]
  }, {
    getCharacterList: () => [
      {
        getEntity: () => null,
      },
      {
        getEntity: () => null,
      },
      {
        getEntity: () => "46d30bfd-3137-43a1-b30e-f0d987043d26"
      },
      {
        getEntity: () => "46d30bfd-3137-43a1-b30e-f0d987043d26"
      },
    ]
  },
]

const inputFragment = {
  "24bo6": {
    "key": "24bo6",
    "type": "unstyled",
    "text": "my link",
    "characterList": [
      {
        "style": [],
        "entity": null
      },
      {
        "style": [],
        "entity": "b660f791-1a10-47d3-b970-448b00d5afdd"
      },
    ],
    "depth": 0,
    "data": {}
  }
}

const output = {
  "b660f791-1a10-47d3-b970-448b00d5afdd": {
    "type": "LINK",
    "mutability": "MUTABLE",
    "data": {
      "url": "google.com",
      "targetOption": "_blank"
    }
  },
  "ad250cba-e4c9-8721-1b32-6142cf223c73": {
    "type": "LINK",
    "mutability": "MUTABLE",
    "data": {
      "url": "repubblica.it",
      "targetOption": "_blank"
    }
  },
  "46d30bfd-3137-43a1-b30e-f0d987043d26": {
    "type": "LINK",
    "mutability": "MUTABLE",
    "data": {
      "url": "ilfattoquotidiano.it",
      "targetOption": "_blank"
    }
  },
}

const getCharacterList = block => block.getCharacterList()
const flattenToArray = (block1, block2) => block1.concat(block2)
const getEntity = (character) => character.getEntity()
const notNull = entityKey => entityKey !== null
const toMap = (previousValue, currentValue) => {
  previousValue[currentValue] = Entity.get(currentValue)
  return previousValue
}

const funzione = (input) => [...new Set(
  input
    .map(getCharacterList)
    .reduce(flattenToArray)
    .map(getEntity)
    .filter(notNull))]
  .reduce(toMap, {})

describe('asdf', () => {
  it('should, it should...', () => {
    const result = funzione(mockFragment)
    expect(result).toEqual(output)
    // expect(result['b660f791-1a10-47d3-b970-448b00d5afdd'].data.url === 'google.com')
    // expect(result['ad250cba-e4c9-8721-1b32-6142cf223c73'].data.url === 'repubblica.it')
    // expect(result['46d30bfd-3137-43a1-b30e-f0d987043d26'].data.url === 'ilfattoquotidiano.it')
  })
})
