var assert = require("assert")
require("./helpers.js")
require("../src/game_rules.js")

describe("Game rules", function() {
  describe("isValidPosition", function() {
    // assume valid maps
    const maps = [0, 0, 0, 0]
    maps.l = Math.sqrt(maps.length) // 2

    const tests = [
      {
        p: { x: 0, y: 0 },
        expected: true
      },
      {
        p: { x: 1, y: 1 },
        expected: true
      },
      {
        p: { x: -1, y: 1 },
        expected: false
      },
      {
        p: { x: 1, y: 2 },
        expected: false
      },
      {
        p: { x: 1, y: -1 },
        expected: false
      },
      {
        p: { x: 2, y: 1 },
        expected: false
      }
    ]
    tests.forEach(test => {
      it(`should be ${test.expected} from ${p(test.p)}`, function() {
        assert.equal(test.expected, isValidPosition(maps, test.p))
      })
    })
  })
})
