function Map(m) {
  // helper get cell
  this.gxy = (x, y) => this.g({ x, y })
  this.g = p => this.m[this.c(p)]
  this.i = i => this.m[i]
  this.cxy = (x, y) => this.c({ x, y })
  this.c = ({ x, y }) => x + y * this.l

  this.init = () => {
    // reinit scene
    scene.innerHTML = ""

    // reinit css3d
    C.sprites = []
    C.sprite_count = 0
    C.plane_count = 0
    C.cube_count = 0
    C.pyramid_count = 0

    // init floor
    C.plane({
      x: ((this.l - 1) * CELL_SIZE) / 2,
      y: ((this.l - 1) * CELL_SIZE) / 2,
      z: 0,
      w: this.l * CELL_SIZE * 2,
      h: this.l * CELL_SIZE * 2,
      css: "floor"
    })

    this.wm = new Array(this.l)
    for (i = 0; i < this.l; i++) this.wm[i] = new Array(this.l)

    this.m.forEach((c, i) => {
      const t = `${c}`.split("-")
      let cellType = c,
        isDoor = false,
        b = undefined
      if (`${c}`.includes("#")) {
        ;[cellType, b] = t
        isDoor = cellType.endsWith("d")
        if (isDoor) {
          cellType = cellType.substr(0, cellType.length - 1)
        }
      }
      let [x, y] = [i % this.l, Math.floor(i / this.l)]
      this.wm[y][x] = cellType === CELL.wall ? -1 : 0

      this.createNode({ x, y }, cellType, isDoor, b)
    })

    this.buildWall()
    Coil.updateCheatSheet(this.m)
  }

  this.buildWall = () => {
    let visited = new Array(this.l)
    for (i = 0; i < this.l; i++) visited[i] = new Array(this.l)

    ws = 0
    for (i = 0; i < this.l; i++) {
      for (j = 0; j < this.l; j++) {
        if (!visited[j][i] && this.wm[j][i]) {
          cc = cr = 0
          for (k = i + 1; k < this.l && this.wm[j][k] === -1; k++, cr++) {}
          for (l = j + 1; l < this.l && this.wm[l][i] === -1; l++, cc++) {}
          ws++
          w = d = h = CELL_SIZE
          if (cc > cr) {
            for (k = j; k < l; k++) {
              this.wm[k][i] = ws
              visited[k][i] = 1
            }
            ;[x, y] = [i * CELL_SIZE, (j + (l - j - 1) / 2) * CELL_SIZE]
            d = (l - j) * CELL_SIZE
          } else {
            for (l = i; l < k; l++) {
              this.wm[j][l] = ws
              visited[j][l] = 1
            }
            ;[x, y] = [(i + (k - i - 1) / 2) * CELL_SIZE, j * CELL_SIZE]
            w = (k - i) * CELL_SIZE
          }
          C.cube({ y, x, w, d, h, r: 0, css: "cube wall", b: `#b22222` })
        }
      }
    }
  }

  this.createNode = ({ x: cx, y: cy }, ct, bd, b) => {
    ;[x, y] = [cx * CELL_SIZE, cy * CELL_SIZE]

    let i = this.cxy(cx, cy)
    let cellType = +ct
    switch (cellType) {
      case CELL.exit:
        C.cube({ y, x, w: CELL_SIZE / 2, d: CELL_SIZE / 2, h: CELL_SIZE / 2, css: "exit", b: `#ff6` })
        break
      case CELL.player:
        this.m[i] = 0
        const n = C.sprite({ y, x, w: CELL_SIZE, h: CELL_SIZE, d: CELL_SIZE, html: "🖲", css: "char" })
        this.playerStartPosition = { n, x: cx, y: cy, rz: 0 }
        break
      default:
        let d = bd ? "d" : ""
        switch (cellType) {
          case CELL.hole:
            this.m[i] = [C.sprite({ y, x, w: CELL_SIZE, h: CELL_SIZE, d: CELL_SIZE, html: "🕳", css: "hole" }), cellType, b, bd]
            break
          case CELL.sphere:
            this.m[i] = [C.sphere({ y, x, w: ICELL_SIZE, d: ICELL_SIZE, h: ICELL_SIZE, b, css: `${d} sphere` }), cellType, b, bd]
            break
          case CELL.rect:
            this.m[i] = [C.cube({ y, x, w: ICELL_SIZE, d: ICELL_SIZE * 0.5, h: ICELL_SIZE * 0.5, b, css: `${d} cube`, r: 0 }), cellType, b, bd]
            break
          case CELL.rrect:
            this.m[i] = [C.cube({ y, x, w: ICELL_SIZE, d: ICELL_SIZE * 0.5, h: ICELL_SIZE * 0.5, b, css: `${d} cube`, r: 2 }), cellType, b, bd]
            break
          case CELL.pyramid:
            this.m[i] = [C.pyramid({ y, x, w: ICELL_SIZE, d: ICELL_SIZE, h: ICELL_SIZE, css: `${d} pyramid`, b, r: 0 }), cellType, b, bd]
            break
          case CELL.cone:
            this.m[i] = [C.pyramid({ y, x, w: ICELL_SIZE, d: ICELL_SIZE, h: ICELL_SIZE, css: `${d} pyramid`, b, r: 40 }), cellType, b, bd]
            break
          case CELL.cube:
            this.m[i] = [C.cube({ y, x, w: ICELL_SIZE, d: ICELL_SIZE, h: ICELL_SIZE, b, css: `${d} cube`, r: 0 }), cellType, b, bd]
            break
          case CELL.rcube:
            this.m[i] = [C.cube({ y, x, w: ICELL_SIZE, d: ICELL_SIZE, h: ICELL_SIZE, b, css: `${d} cube`, r: 2 }), cellType, b, bd]
            break
        }
        break
    }
  }

  this.canInteract = (from, to) => {
    if ([-1, -9].includes(this.g(to)) || [-1, -8].includes(this.g(from))) return false
    let [[n1, c1, b1], [n2, c2, b2, d]] = [this.g(from), this.g(to)]
    var s = this
    var pushed = false
    if (c1 === c2) {
      if (b1 === b2 || (b1 !== b2 && !d)) {
        setTimeout(function() {
          s.m[s.c(from)] = 0
          if (d) {
            Sounds.destroy()
            ;[C.$(n1), C.$(n2)].forEach(elt => elt && elt.parentNode.removeChild(elt))
            s.m[s.c(to)] = 0
          } else {
            Sounds.merge()
            // remove node
            ;[C.$(n1), C.$(n2)].forEach(elt => elt && elt.parentNode.removeChild(elt))
            // merge color + create new
            s.createNode(to, c2, d, addRGB(b1, b2))
          }
          Coil.updateCheatSheet(s.m)
        }, 100)
        pushed = true
      }
    } else {
      if (!d) {
        setTimeout(function() {
          s.m[s.c(from)] = 0
          if (c2 === CELL.hole) {
            Sounds.destroy()
            ;[C.$(n1)].forEach(elt => elt && elt.parentNode.removeChild(elt))
          } else {
            Sounds.merge()
            ;[C.$(n1), C.$(n2)].forEach(elt => elt && elt.parentNode.removeChild(elt))
            s.createNode(to, mergeGeo(c1, c2), d, addRGB(b1, b2))
          }
          Coil.updateCheatSheet(s.m)
        }, 100)
        pushed = true
      }
    }

    return pushed
  }

  // move cell around
  this.move = (np, key) => {
    let x = np.x
    let y = np.y
    let updated = false
    let interacted = false
    if (this.g(np)[3]) return false

    switch (key) {
      case "u":
        for (let ty = y - 1; ty >= 0; ty--) {
          let cmp = { x, y: ty }
          let freeCell = this.g(cmp) === 0
          if (freeCell || this.canInteract(np, cmp)) {
            y = ty
            updated = true
            if (!freeCell) break
          } else break
        }
        break
      case "d":
        for (let ty = y + 1; ty < this.l; ty++) {
          let cmp = { x, y: ty }
          let freeCell = this.g(cmp) === 0
          if (freeCell || this.canInteract(np, cmp)) {
            y = ty
            updated = true
            if (!freeCell) break
          } else break
        }
        break
      case "r":
        for (let tx = x + 1; tx < this.l; tx++) {
          let cmp = { x: tx, y }
          let freeCell = this.g(cmp) === 0
          if (freeCell || this.canInteract(np, cmp)) {
            x = tx
            updated = true
            if (!freeCell) break
          } else break
        }
        break
      case "l":
        for (let tx = x - 1; tx >= 0; tx--) {
          let cmp = { x: tx, y }
          let freeCell = this.g(cmp) === 0
          if (freeCell || this.canInteract(np, cmp)) {
            x = tx
            updated = true
            if (!freeCell) break
          } else break
        }
        break
    }
    if (updated) {
      Sounds.pushed()
      const n = this.g(np)
      const to = this.gxy(x, y)
      if (to === 0) {
        this.m[this.c(np)] = 0
        this.m[this.cxy(x, y)] = n
      }
      C.move({ n: n[0], x: x * CELL_SIZE, y: y * CELL_SIZE })
      return true
    }
    return false
  }

  this.m = m
  this.l = Math.floor(Math.sqrt(m.length))
  this.init()
}
