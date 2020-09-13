function ConsoleScreen(msg) {
  this.init = () => {
    consoleDom.innerHTML = msg
    consoleDom.classList.add("visible")

    gctrl.style.display = "none"
    gbar.style.display = "none"
    colorAccessibility.classList.remove("visible")
    tips.classList.remove("visible")
    if (isMobileDevice) {
      if (s === WELCOME_SCREEN) {
        gctrl.style.display = "none"
        gbar.style.display = "flex"
        gbar.innerHTML = ""
        const start = document.createElement("div")
        start.innerHTML = "New Game"
        start.onclick = this.startNewGame

        const resume = document.createElement("div")
        resume.innerHTML = "Continue"
        resume.onclick = this.resumeGame
        gbar.appendChild(start)
        gbar.appendChild(resume)
      }
    }
  }

  this.startGame = () => {
    s = 1
    screens[GAME_SCREEN].init()
    Sounds.background()
  }

  this.startNewGame = () => {
    level = 0
    this.startGame()
  }

  this.resumeGame = () => {
    level = levelFromCache()
    this.startGame()
  }

  this.proccesKeyUp = key => {
    if (s === END_GAME_SCREEN) return

    if (key == "enter") this.startNewGame()
    else if (key === "KeyC") this.resumeGame()
  }
}
