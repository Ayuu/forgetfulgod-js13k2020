// zzfx() - the universal entry point -- returns a AudioBufferSourceNode
zzfx = (...t) => zzfxP(zzfxG(...t))

// zzfxP() - the sound player -- returns a AudioBufferSourceNode
zzfxP = (...t) => {
  let e = zzfxX.createBufferSource(),
    f = zzfxX.createBuffer(t.length, t[0].length, zzfxR)
  t.map((d, i) => f.getChannelData(i).set(d)), (e.buffer = f), e.connect(zzfxX.destination), e.start()
  return e
}

zzfxPLoop = (...t) => {
  let e = zzfxX.createBufferSource(),
    f = zzfxX.createBuffer(t.length, t[0].length, zzfxR)
  t.map((d, i) => f.getChannelData(i).set(d)), (e.buffer = f), (e.loop = true), e.connect(zzfxX.destination), e.start()
  return e
}

// zzfxG() - the sound generator -- returns an array of sample data
zzfxG = (
  a = 1,
  t = 0.05,
  h = 220,
  M = 0,
  n = 0,
  s = 0.1,
  i = 0,
  r = 1,
  o = 0,
  z = 0,
  e = 0,
  f = 0,
  m = 0,
  x = 0,
  b = 0,
  d = 0,
  u = 0,
  c = 1,
  G = 0,
  I = zzfxR,
  P = 99 + M * I,
  V = n * I,
  g = s * I,
  j = G * I,
  k = u * I,
  l = 2 * Math.PI,
  p = a => (0 < a ? 1 : -1),
  q = P + j + V + g + k,
  v = (o *= (500 * l) / I ** 2),
  w = (h *= ((1 + 2 * t * Math.random() - t) * l) / I),
  y = (p(b) * l) / 4,
  A = 0,
  B = 0,
  C = 0,
  D = 0,
  E = 0,
  F = 0,
  H = 1,
  J = []
) => {
  for (; C < q; J[C++] = F)
    ++E > 100 * d &&
      ((E = 0),
      (F = A * h * Math.sin((B * b * l) / I - y)),
      (F =
        p(
          (F = i
            ? 1 < i
              ? 2 < i
                ? 3 < i
                  ? Math.sin((F % l) ** 3)
                  : Math.max(Math.min(Math.tan(F), 1), -1)
                : 1 - (((((2 * F) / l) % 2) + 2) % 2)
              : 1 - 4 * Math.abs(Math.round(F / l) - F / l)
            : Math.sin(F))
        ) *
        Math.abs(F) ** r *
        a *
        zzfxV *
        (C < P ? C / P : C < P + j ? 1 - ((C - P) / j) * (1 - c) : C < P + j + V ? c : C < q - k ? ((q - C - k) / g) * c : 0)),
      (F = k ? F / 2 + (k > C ? 0 : ((C < q - k ? 1 : (C - q) / k) * J[(C - k) | 0]) / 2) : F)),
      (A += 1 - x + ((1e9 * (Math.sin(C) + 1)) % 2) * x),
      (B += 1 - x + ((1e9 * (Math.sin(C) ** 2 + 1)) % 2) * x),
      (h += o += (500 * z * l) / I ** 3),
      H && ++H > f * I && ((h += (e * l) / I), (w += (e * l) / I), (H = 0)),
      m && ++D > m * I && ((h = w), (o = v), (D = 1), (H = H || 1))
  return J
}

//! ZzFXM (v2.0.2) | (C) Keith Clark | MIT | https://github.com/keithclark/ZzFXM
zzfxM = (f, n, o, t = 125) => {
  let z,
    e,
    l,
    r,
    g,
    h,
    x,
    a,
    u,
    c,
    d,
    i,
    m,
    p,
    G,
    M,
    R = [],
    b = [],
    j = [],
    k = 0,
    q = 1,
    s = {},
    v = ((zzfxR / t) * 60) >> 2
  for (; q; k++)
    (R = [(q = a = d = m = 0)]),
      o.map((t, d) => {
        for (x = n[t][k] || [0, 0, 0], q |= !!n[t][k], G = m + (n[t][0].length - 2 - !a) * v, e = 2, r = m; e < x.length + (d == o.length - 1); a = ++e) {
          for (g = x[e], u = (c != (x[0] || 0)) | g | 0, l = 0; l < v && a; l++ > v - 99 && u ? (i += (i < 1) / 99) : 0)
            (h = ((1 - i) * R[p++]) / 2 || 0), (b[r] = (b[r] || 0) + h * M - h), (j[r] = (j[r++] || 0) + h * M + h)
          g && ((i = g % 1), (M = x[1] || 0), (g |= 0) && (R = s[[(c = x[(p = 0)] || 0), g]] = s[[c, g]] || ((z = [...f[c]]), (z[2] *= 2 ** ((g - 12) / 12)), zzfxG(...z))))
        }
        m = G
      })
  return [b, j]
}

// zzfxV - global volume
zzfxV = 0.1

// zzfxR - global sample rate
zzfxR = 44100

// zzfxX - the common audio context
zzfxX = new (top.AudioContext || webkitAudioContext)()
