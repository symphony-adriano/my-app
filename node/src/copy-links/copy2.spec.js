const { Entity, getDefaultKeyBinding } = require('draft-js')

jest.mock('draft-js', () => ({
  Entity: { get: (key) => {
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
  } }
}))

const input = ["b660f791-1a10-47d3-b970-448b00d5afdd", "ad250cba-e4c9-8721-1b32-6142cf223c73", "46d30bfd-3137-43a1-b30e-f0d987043d26"]

const output = {
  "b660f791-1a10-47d3-b970-448b00d5afdd": {
    "type": "LINK",
    "mutability": "MUTABLE",
    "data": {
      "url": "google.com",
      "targetOption": "_blank"
    }
  }
}

const function1 = () => {
  return Entity.get(input[0])
}

describe('asdf', () => {
  it('should, it should...', () => {
    const result = function1()
    console.log(JSON.stringify(result, null, 2))
    // expect(function1()).toEqual(output)
  })
})
