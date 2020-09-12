const screens = [new ConsoleScreen(WELCOME_MESSAGE), new GameScreen(), new ConsoleScreen(END_GAME_MESSAGE)]
const consoleDom = document.getElementById("console")
s = WELCOME_SCREEN

/** Key Mapping **/
const kp = {}
const keyMap = {}
keyMap.ArrowUp = keyMap.KeyW = keyMap.KeyZ = "u"
keyMap.ArrowDown = keyMap.KeyS = "d"
keyMap.ArrowLeft = keyMap.KeyQ = keyMap.KeyA = "l"
keyMap.ArrowRight = keyMap.KeyD = "r"
keyMap.Enter = keyMap.NumpadEnter = "enter"

toggleConsole = () => {
  consoleDom.innerHTML = `${cmd}
${screens[s].console ? screens[s].console() : ""}`
  consoleDom.classList.toggle("visible")
}

onkeyup = ({ code }) => (kp[code] = false)

onkeypress = onkeydown = e => {
  const code = e.code
  if (!e._gui && kp[code]) return
  kp[code] = !e._gui

  if (code === "F5") return window.location.reload()
  switch (code.toLowerCase()) {
    case "backquote":
      overlay.classList.contains("visible") && overlay.classList.toggle("visible")
      return s === GAME_SCREEN && toggleConsole()
    case "keyh":
      if (s !== GAME_SCREEN) return
      consoleDom.classList.contains("visible") && toggleConsole()
      return overlay.classList.toggle("visible")
    case "keym":
      zzfxV = 0
      const soundbtn = document.getElementById("soundbtn")
      soundbtn && (soundbtn.innerHTML = sound ? "🔇" : "🔉")
      sound = !sound
      return Sounds.background()
    case "keyr":
      e.ctrlKey && e.preventDefault()
      return screens[s].init(true)
    default:
      return screens[s].proccesKeyUp(keyMap[code] || code)
  }
}

isMobileDevice && document.body.classList.add("mobile")

screens[s].init()
