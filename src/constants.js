// Screen index
const WELCOME_SCREEN = 0
const GAME_SCREEN = 1
const END_GAME_SCREEN = 2

const CELL_SIZE = 8
const ICELL_SIZE = CELL_SIZE * 0.8 // all the other item are 0.8
const WCELL_SIZE = CELL_SIZE * 0.99 // wall size, 0.99 to avoid overlap
const CACHE = "X2pzMTNrMjAyMGZvcmdldGZ1bGdvZA==" // _js13k2020forgetfulgod

// Display console for tips
const TIPS_LEVEL = [3, 5, 13]

// Mobile inputs
const MOBILE_ARROWS = { l: "⇦", u: "⇧", r: "⇨", d: "⇩" }
const MOBILE_EXTRA = { keyr: "R", keyh: "H", keyi: "I", backquote: "`" }

// Trophies to unlock
const TROPHIES = {
  2: ["🧩", "Puzzle Solver", "Insert the correct missing piece"],
  3: ["🎨", "Painter", "Adding color has no secrets"], // first level where merging color is needed
  5: ["📐📏", "Mathematics", "Adding form has no secrets"], // first level where merging form is needed
  6: ["🧠", "Brainy", "Can solve anything"] // first non-tuto level
}
