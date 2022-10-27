const exp = require('constants')
const { Entity } = require('draft-js')

jest.mock('draft-js', () => ({
  Entity: {
    create: () => '6bc6f2fb-8d1e-42d6-ba02-c678459b1a44',
  }
}))

const mockInput = {
  "2212f452-03c1-4dea-b928-ddce824dcec6": {
    get: jest.fn(),
    "type": "LINK",
    "mutability": "MUTABLE",
    "data": {
      "url": "qwer.com",
      "targetOption": "_blank"
    }
  },
  "b7dcfaab-831a-46e4-adee-8579c199db5d": {
    get: jest.fn(),
    "type": "LINK",
    "mutability": "MUTABLE",
    "data": {
      "url": "google.it",
      "targetOption": "_blank"
    }
  }
}

const expected = {
  "2212f452-03c1-4dea-b928-ddce824dcec6": "6bc6f2fb-8d1e-42d6-ba02-c678459b1a44",
  "b7dcfaab-831a-46e4-adee-8579c199db5d": "6bc6f2fb-8d1e-42d6-ba02-c678459b1a44",
}

const function1 = (input) => {
  const result = {}
  Object.keys(input).forEach((key) => {
    const entity = input[key];
    result[key] = Entity.create(
      entity.get('type'),
      entity.get('mutability'),
      entity.get('data'),
    );
  })
  return result
}

describe('asdf', () => {
  it('should, it should...', () => {
    const result = function1(mockInput)
    expect(result).toEqual(expected)
  })
})
