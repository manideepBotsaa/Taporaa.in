import * as THREE from 'three'

/**
 * Generates a visually realistic, deterministic QR-style pattern.
 * This is a DEMO placeholder — not a functional scannable code.
 * Swap with a real QR (e.g. generated server-side per business) at integration time.
 */
export function createDemoQRTexture(seed = 7, fg = '#f2edf7', bg = 'transparent'): THREE.CanvasTexture {
  const size = 256
  const cells = 21
  const cell = size / cells
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  if (bg !== 'transparent') {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, size, size)
  }
  ctx.fillStyle = fg

  // deterministic pseudo-random from seed
  let s = seed * 9301 + 49297
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }

  const isFinder = (x: number, y: number) => {
    const inCorner = (cx: number, cy: number) => x >= cx && x < cx + 7 && y >= cy && y < cy + 7
    return inCorner(0, 0) || inCorner(cells - 7, 0) || inCorner(0, cells - 7)
  }

  const drawFinder = (cx: number, cy: number) => {
    ctx.fillRect(cx * cell, cy * cell, 7 * cell, 7 * cell)
    ctx.clearRect((cx + 1) * cell, (cy + 1) * cell, 5 * cell, 5 * cell)
    ctx.fillRect((cx + 2) * cell, (cy + 2) * cell, 3 * cell, 3 * cell)
  }

  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      if (isFinder(x, y)) continue
      if (rand() > 0.56) {
        ctx.fillRect(x * cell, y * cell, cell * 0.92, cell * 0.92)
      }
    }
  }

  drawFinder(0, 0)
  drawFinder(cells - 7, 0)
  drawFinder(0, cells - 7)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}
