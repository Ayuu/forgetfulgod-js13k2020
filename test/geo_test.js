var assert = require("assert")
require("../src/game_rules.js")
require("../src/cell.js")

const lookupCell = {}
Object.keys(CELL).forEach(key => (lookupCell[CELL[key]] = key))

describe("Geo", function() {
  const tests = {
    sphere: [[CELL.sphere, CELL.sphere]],
    rect: [[CELL.rect, CELL.rect]],
    pyramid: [[CELL.pyramid, CELL.pyramid]],
    rrect: [
      [CELL.rrect, CELL.rrect],
      [CELL.rrect, CELL.sphere],
      [CELL.rrect, CELL.rect]
    ],
    cone: [
      [CELL.cone, CELL.cone],
      [CELL.cone, CELL.sphere],
      [CELL.cone, CELL.pyramid]
    ],
    cube: [
      [CELL.cube, CELL.cube],
      [CELL.cube, CELL.rect],
      [CELL.cube, CELL.pyramid]
    ],
    rcube: [
      [CELL.rcube, CELL.rcube],
      [CELL.rcube, CELL.rect],
      [CELL.rcube, CELL.rrect],
      [CELL.rcube, CELL.pyramid],
      [CELL.rcube, CELL.cube],
      [CELL.rcube, CELL.sphere],
      [CELL.rcube, CELL.cone]
    ]
  }
  Object.keys(tests).forEach(key => {
    describe(key, function() {
      tests[key].forEach(v => {
        it(`should be a ${key} from ${v.map(c => lookupCell[c])}`, function() {
          assert.equal(CELL[key], mergeGeo(...v))
        })
      })
    })
  })
})
