const isCoilMember = () => document.monetization && document.monetization.state === "started"

Coil = {
  initLevel: () => {
    fog.classList.remove(...fog.classList)
    if (isCoilMember()) {
      fog.classList.add("coil")
      tips.classList.add("coil")
    }
  },

  updateCheatSheet: maps => {
    const assets = maps.filter(v => Array.isArray(v) && v[2] && !v[3])
    tips.innerHTML = ""
    if (assets.length > 1) {
      const colors = [...new Set(assets.map(v => v[2]))]
      if (colors.length <= 1) {
        return tips.classList.remove("visible")
      }

      tips.classList.add("visible")
      const colorsDiv = color => {
        const n = document.createElement("div")
        n.classList.add("color")
        n.style.background = color
        return n
      }

      for (i = 0; i < colors.length - 1; i++) {
        for (j = i + 1; j < colors.length; j++) {
          const row = document.createElement("div")
          ;[colorsDiv(colors[i]), colorsDiv(colors[j]), colorsDiv(addRGB(colors[i], colors[j]))].forEach((c, i) => {
            row.appendChild(c)
            if (i < 2) {
              const t = document.createElement("span")
              t.innerHTML = i === 0 ? "+" : "="
              row.appendChild(t)
            }
          })
          tips.appendChild(row)
        }
      }
    } else {
      tips.classList.remove("visible")
    }
  }
}
