isValidPosition = (map, { x, y }) => x >= 0 && x < map.l && y >= 0 && y < map.l

mergeGeo = (c1, c2) => {
  const cc = ct => c1 === ct || c2 === ct
  if (c1 === c2) return c1
  if (cc(CELL.rcube)) return CELL.rcube
  if (cc(CELL.rrect) && (cc(CELL.rect) || cc(CELL.sphere))) return CELL.rrect
  if (cc(CELL.cone) && (cc(CELL.pyramid) || cc(CELL.sphere))) return CELL.cone
  if (cc(CELL.cube) && (cc(CELL.pyramid) || cc(CELL.rect))) return CELL.cube
  return Math.min(c1 * c2, CELL.rcube)
}

const dec2hex = v => v.toString(16).padStart(2, 0)
const hex2dec = v => parseInt(v, 16)
const hexColor = v => (v.length === 1 ? `${v}${v}` : v)
const shexRegex = /[\da-z]{2}/gi
const thexRegex = /[\da-z]{1}/gi
const round = (v, d) => Math.round(v * d) / d

hex2rgb = v => {
  var b1 = v.match(v.length < 5 ? thexRegex : shexRegex)
  return b1.map(c => `${hex2dec(hexColor(c))}`)
}

addRGB = (c1, c2) => {
  var b1 = c1.match(c1.length < 5 ? thexRegex : shexRegex)
  var b2 = c2.match(c2.length < 5 ? thexRegex : shexRegex)
  var c = b1.map((c, i) => {
    const m1 = hex2dec(hexColor(c)) / 255
    const m2 = hex2dec(hexColor(b2[i])) / 255
    return dec2hex((255 * (m1 + m2)) >> 1)
  })

  return `#${c.join("")}`
}
