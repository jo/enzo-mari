// orientation seen from top view
// const perspectiveMap = {
//   '===': { side: '-',   front: '---' },
//   '---': { side: '|',   front: '===' },
//   '|':   { side: '===', front: '|' },
//   '||':  { side: '---', front: '-' },
//   '-':   { side: '|',   front: '||' },
//   "'":   { side: '||',  front: '|' },
// }

class Side {
  constructor (config) {
    this.config = config
    this.group = 'side'
  }

  get laths () {
    const z = this.config.length/2 - this.config.krag
    const fl = 5*this.config.q2
    const fx = this.config.q1/2 + this.config.q2/2
    const fy = this.config.height - fl/2

    const getRotation = (initialAlpha, steps = 3) => {
      const dh = Math.sin(initialAlpha) * this.config.q2
      const dx = dh / Math.asin(initialAlpha)
      const alpha = Math.atan((this.config.width/2 - this.config.q1/2 - this.config.q2 - dx)/(this.config.height - dh))

      return steps > 0 ? getRotation(alpha, steps-1) : { alpha, dh, dx }
    }

    const initialRotation = 15 * Math.PI/180
    const rotation = getRotation(initialRotation)

    const dl = this.config.height / Math.cos(rotation.alpha) - rotation.dh
    
    const dxc = Math.tan(rotation.alpha) * (this.config.height/2 - rotation.dh/2)
    const dx = this.config.q1/2 + this.config.q2 + rotation.dx/2 + dxc
    const legRotation = rotation.alpha

    const dxe = Math.tan(rotation.alpha) * (fl - this.config.q2)
    const el = 2*(this.config.q1/2 + this.config.q2 + rotation.dx + dxe)

    const dy = this.config.height - dl/2

    return [
      {
        name: `F1`,
        group: this.group,
        orientation: "'",
        length: fl,
        y: fy,
        x: fx,
        z
      },
      {
        name: `F2`,
        group: this.group,
        orientation: "'",
        length: fl,
        y: fy,
        x: -fx,
        z
      },

      {
        name: `D1`,
        group: this.group,
        orientation: "'",
        length: dl,
        y: dy,
        x: dx,
        z,
        rotation: legRotation
      },

      {
        name: `D2`,
        group: this.group,
        orientation: "'",
        length: dl,
        y: dy,
        x: -dx,
        z,
        rotation: -legRotation
      },

      {
        name: `C`,
        group: this.group,
        orientation: '|',
        length: this.config.width,
        y: this.config.height - this.config.q2/2,
        x: 0,
        z: z + this.config.q1
      },

      {
        name: `E`,
        group: this.group,
        orientation: '|',
        length: el,
        y: this.config.height - 4*this.config.q2 - this.config.q2/2,
        x: 0,
        z: z + this.config.q1
      }
    ]
  }
}

class Board {
  constructor (config) {
    this.config = config
  }

  get laths () {
    return [
      ...this.lathsQueer,
      ...this.lathsHor
    ]
  }

  get lathsQueer () {
    const arr = []

    const group = 'plate'
    const orientation = '==='
    const length = this.config.length
    const y = this.config.height + this.config.q1/2
    const z = 0
    const x0 = -this.config.width/2 + this.config.q2/2
    
    for (let i = 0; i < this.config.widthN; i++) {
      arr.push({
        name: `A${i}`,
        group, orientation,
        length, y, z,
        x: x0 + i*this.config.q2
      })
    }

    return arr
  }

  get lathsHor () {
    const group = 'plate'
    const orientation = '||'
    const length = this.config.width
    const x = 0
    const y = this.config.height - this.config.q1/2
    const z = 0
    const dz = this.config.length/2 - this.config.krag + this.config.q2/2 + this.config.q1 + this.config.q1/2

    return [
      {
        name: `C3`,
        group, orientation,
        length, x, y, z
      },
      {
        name: `C4`,
        group, orientation,
        length, x, y, z: z+dz
      },
      {
        name: `C5`,
        group, orientation,
        length, x, y, z: z-dz
      }
    ]
  }
}

class Keel {
  constructor (config) {
    this.config = config
  }

  get laths () {
    return [
      ...this.lathsQueer,
      ...this.lathsHor
    ]
  }

  get lathsQueer () {
    const group = 'keel'
    const orientation = '-'
    const length = 3*this.config.q2
    const x = this.config.q1
    const y = this.config.height - 2*this.config.q2 - this.config.q2/2
    const z = this.config.length/2 - this.config.krag - this.config.q2/2 - this.config.q1/2
    const rotation = Math.PI/4
    const queerX = 2*this.config.q2

    return [
      {
        name: `G1`,
        group, orientation,
        length, x, y, z
      },
      {
        name: `G2`,
        group, orientation,
        length, x, y, z: z - queerX,
        rotation
      },
      {
        name: `G3`,
        group, orientation,
        length, x, y, z: -z + queerX,
        rotation: -rotation
      },
      {
        name: `G4`,
        group, orientation,
        length, x, y, z: -z
      },
    ]
  }

  get lathsHor () {
    const group = 'keel'
    const orientation = '---'
    const length = this.config.length - 2*this.config.q2 + this.config.q1
    const x = 0
    const y1 = this.config.height - 2*this.config.q2 + this.config.q2/2
    const y2 = y1 - 2*this.config.q2
    const z = 0

    return [
      {
        name: `B1`,
        group, orientation,
        length, x, y: y1, z
      },
      {
        name: `B2`,
        group, orientation,
        length, x, y: y2, z
      }
    ]
  }
}


const getLengths = laths => {
  return laths
    .reduce((memo, lath) => {
      const key = lath.name.slice(0, 1)
      memo[key] = lath.length
      return memo
    }, {})
}

const buildLaths = config => {
  const sideLeft = new Side(config)
  const sideRight = new Side(config)
  const board = new Board(config)
  const keel = new Keel(config)

  return [
    ...sideLeft.laths,
    ...keel.laths,
    ...sideRight.laths.map(lath => ({ ...lath, z: -lath.z })),
    ...board.laths
  ]
}
