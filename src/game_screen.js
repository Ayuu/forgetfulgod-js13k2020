const appendBtns = (btns, dom) => {
  Object.keys(btns).forEach(code => addDom(btns[code], `key${code}`, () => processKey(code), dom))
}

function GameScreen() {
  this.init = reset => {
    if (!reset && TIPS_LEVEL.includes(level)) toggleConsole()
    else consoleDom.classList.remove("visible")
    document.body.classList.add("ingame")

    this.loaded = false
    this.initLevel()
    this.initGUI()
    this.loaded = true
  }

  this.initGUI = () => {
    gctrl.style.display = "flex"
    gctrl.innerHTML = ""
    appendBtns(MOBILE_ARROWS, gctrl)

    gbar.style.display = "flex"
    gbar.innerHTML = ""
    addDom(getSoundIcon(), "keym", () => processKey("keym"), gbar, "soundbtn")
    appendBtns(MOBILE_EXTRA, gbar)
  }

  this.initLevel = () => {
    Coil.initLevel()
    this.map = maps.init(level)
    this.position = this.position2d = this.map.playerStartPosition
    this.v = { d: true }
    this.updatePosition(this.position2d)
  }

  this.updatePosition = np => {
    this.position2d = np
    const [x, y] = [np.x * CELL_SIZE, np.y * CELL_SIZE]
    this.position = { ...this.position, x, y, rz: np.rz }
    this.cameraPosition = { x, y, z: 40 }
    C.camera(this.cameraPosition)
  }

  this.rotate = np => {
    Sounds.move(true)
    this.position2d.rz = this.position.rz = np.rz
    C.move(this.position)
  }

  this.move = np => {
    Sounds.move(false)
    this.updatePosition(np)
    C.move(this.position)
  }

  this.proccesKeyUp = key => {
    const np = { ...this.position2d }

    // update position + rotation
    switch (key) {
      case "u":
        np.y -= 1
        !this.v.u && (np.rz = this.v.d ? 180 : this.v.l ? np.rz + 90 : np.rz - 90)
        break
      case "d":
        np.y += 1
        !this.v.d && (np.rz = this.v.u ? 0 : this.v.r ? np.rz + 90 : np.rz - 90)
        break
      case "r":
        np.x += 1
        !this.v.r && (np.rz = this.v.l ? -90 : this.v.u ? np.rz + 90 : np.rz - 90)
        break
      case "l":
        np.x -= 1
        !this.v.l && (np.rz = this.v.r ? 90 : this.v.d ? np.rz + 90 : np.rz - 90)
        break
    }
    if ("lrdu".includes(key)) {
      this.v = { [key]: true }
      // disable console when moving
      consoleDom.classList.remove("visible")
    }

    // check collision
    if (np.x !== this.position2d.x || np.y !== this.position2d.y) {
      if (!isValidPosition(this.map, np)) {
        this.rotate(np)
        return
      }
      switch ((cs = this.map.g(np))) {
        case CELL.wall:
          this.rotate(np)
          return
        case CELL.exit:
          const unlockedTrophy = TROPHIES[level]
          if (unlockedTrophy) {
            const [icon, title, msg] = unlockedTrophy
            localStorage[`OS13kTrophy,${icon},Forgetful God,${title}`] = msg
          }
          level++
          setCache()
          if (level >= maps.length) {
            // turn off background sound
            Sounds.background()

            document.body.classList.remove("ingame")
            Sounds.winGame()
            setTimeout(() => {
              consoleDom.classList.add("visible")
              s = END_GAME_SCREEN
              screens[s].init()
            }, 500)
          } else {
            Sounds.win()
            this.init()
          }
          break
        case CELL.floor:
          this.move(np)
          break
        default:
          if (this.map.move(np, key)) this.move(np)
          else this.rotate(np)
          break
      }
    }
  }

  this.console = () => {
    let tips = `Current level: ${level}
TIPS:
- Push the assets to the highlighted area`
    if (level > 1)
      tips = `${tips}
- Merging assets with different colors will add the colors together`
    if (level > 3)
      tips = `${tips}
- Merging assets with different form will form a new form`
    if (level > 12)
      tips = `${tips}
- Color mixing are subject to order (experiment and find the right order!)`

    return tips
  }
}
