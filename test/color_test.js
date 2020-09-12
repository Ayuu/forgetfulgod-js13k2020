var assert = require("assert")
require("../src/game_rules.js")

describe("Color", function() {
  const tests = [
    {
      c1: "#fff",
      c2: "#fff",
      expected: "#ffffff"
    },
    {
      c1: "#f0f",
      c2: "#0f0",
      expected: "#7f7f7f"
    },
    {
      c1: "#f00",
      c2: "#0f0",
      expected: "#7f7f00"
    },
    {
      c1: "#ff0000",
      c2: "#ffff00",
      expected: "#ff7f00"
    },
    {
      c1: "#55ff00",
      c2: "#ff5500",
      expected: "#aaaa00"
    },
    {
      c1: "#55ff00",
      c2: "#55ff00",
      expected: "#55ff00"
    }
  ]

  tests.forEach(test => {
    it(`should be ${test.expected} from ${test.c1} + ${test.c2}`, function() {
      assert.equal(test.expected, addRGB(test.c1, test.c2))
    })
  })
})
