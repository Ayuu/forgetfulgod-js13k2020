Accessibility = {
  toggle: () => {
    if (s !== GAME_SCREEN) return
    scene.classList.toggle("accessibility")
    colorAccessibility.classList.toggle("visible")
  },
  update: () => {
    colorAccessibility.innerText = ""
    const k = Object.keys(Accessibility.colors)
    k.length ? colorAccessibility.classList.remove("empty") : colorAccessibility.classList.add("empty")
    colorAccessibility.innerText = k.reduce((res, form, i) => {
      const c = hex2rgb(Accessibility.colors[form])
      const ln = i === 0 ? "" : "\n"
      console.log(form, i, `${ln}${form}: (r: ${c[0]}, g: ${c[1]}, b: ${c[2]})`)
      res += `${ln}${form}: (r: ${c[0]}, g: ${c[1]}, b: ${c[2]})`
      return res
    }, "")
  }
}
