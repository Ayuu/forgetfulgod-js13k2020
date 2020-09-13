Accessibility = {
  toggle: () => {
    if (s !== GAME_SCREEN) return
    scene.classList.toggle("accessibility")
    colorAccessibility.classList.toggle("visible")
  },
  update: () => {
    colorAccessibility.innerText = ""
    Object.keys(Accessibility.colors).length ? colorAccessibility.classList.remove("empty") : colorAccessibility.classList.add("empty")
    Object.keys(Accessibility.colors).forEach((form, i) => {
      const c = hex2rgb(Accessibility.colors[form])
      const ln = i === 0 ? "" : "\n"
      colorAccessibility.innerText += `${ln}${form}: (r: ${c[0]}, g: ${c[1]}, b: ${c[2]})`
    })
  }
}
