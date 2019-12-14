// orientation seen from top view
// const perspectiveMap = {
//   '===': { side: '-',   front: '---' },
//   '---': { side: '|',   front: '===' },
//   '|':   { side: '===', front: '|' },
//   '||':  { side: '---', front: '-' },
//   '-':   { side: '|',   front: '||' },
//   "'":   { side: '||',  front: '|' },
// }

const D = config => {
  const group = 'side'
  const orientation = "'"
  // TODO: decouple or expose for length table
  const length = config.height / Math.cos(config.legRotation) - config.q2
  const z = config.length/2 - 2*config.q2 - config.q1/2

  // distance on top for screw
  const dd = config.q2/2 
  const fest = config.q1/2 + config.q2 + dd
  const rest = config.width/2 - fest
  const x = fest + rest/2
  const y = config.height/2
  const rotation = config.legRotation

  return [
    {
      name: 'D1',
      group, orientation, length,
      x, y, z, rotation
    },
    {
      name: 'D2',
      group, orientation, length,
      x: -x, y, z, rotation: -rotation
    },
    {
      name: 'D3',
      group, orientation, length,
      x, y, z: -z, rotation
    },
    {
      name: 'D4',
      group, orientation, length,
      x: -x, y, z: -z, rotation: -rotation
    }
  ]
}

const E = config => {
  const group = 'side'
  const orientation = '|'
  const x = 0
  const y = config.height - 4*config.q2 - config.q2/2 - config.q1/2
  const z = config.length/2 - 2*config.q2 + config.q1/2

  // TODO: calculate length from y
  // TODO: decouple or expose for length table
  const dd = config.q2/2 
  const fest = config.q1/2 + config.q2 + dd
  const rest = config.width/2 - fest
  const length = 2*(fest + rest/2 + Math.tan(config.legRotation) * (y - (config.height/2 - config.q2))) + 1.5*config.q2
  // console.log(length)

  const left = {
    name: `E L`,
    group, orientation,
    length,
    x, y, z
  }
  const right = {
    name: `E R`,
    group, orientation,
    length,
    x, y, z: -z
  }

  return [left, right]
}


const buildLengths = config => ({
  A: config.length,
  B: config.length - 2*config.q1,
  C: config.width,
  D: config.height / Math.cos(config.legRotation) - config.q2,
  E: config.width - config.q2,
  F: 5*config.q2,
  G: 3*config.q2
})

const buildLaths = config => {
  let arr = []

  const lengths = buildLengths(config)
  
  // A
  for (let i = 0; i < config.widthN; i++) {
    arr.push({
      name: `A${i}`,
      group: 'plate',
      orientation: '===',
      length: lengths.A,
      y: config.height,
      x: -config.width/2 + i*config.q2 + config.q2/2,
      z: 0
    })
  }

  // B
  arr.push({
    name: `B1`,
    group: 'keel',
    orientation: '---',
    length: lengths.B,
    y: config.height - 2*config.q2 - config.q1/2 + config.q2/2,
    x: 0,
    z: 0
  })
  arr.push({
    name: `B2`,
    group: 'keel',
    orientation: '---',
    length: lengths.B,
    y: config.height - config.q1/2 - 4*config.q2 + config.q2/2,
    x: 0,
    z: 0
  })
  
  // C
  arr.push({
    name: `C1`,
    group: 'side',
    orientation: '|',
    length: lengths.C,
    y: config.height - config.q2/2 - config.q1/2,
    x: 0,
    z: config.length/2 - 2*config.q2 + config.q1/2
  })
  arr.push({
    name: `C2`,
    group: 'side',
    orientation: '|',
    length: lengths.C,
    y: config.height - config.q2/2 - config.q1/2,
    x: 0,
    z: -config.length/2 + 2*config.q2 - config.q1/2
  })
  arr.push({
    name: `C3`,
    group: 'side',
    orientation: '||',
    length: lengths.C,
    y: config.height - config.q1,
    x: 0,
    z: config.length/2 - config.q2/2 - config.q2 + config.q1
  })
  arr.push({
    name: `C4`,
    group: 'side',
    orientation: '||',
    length: lengths.C,
    y: config.height - config.q1,
    x: 0,
    z: 0
  })
  arr.push({
    name: `C5`,
    group: 'side',
    orientation: '||',
    length: lengths.C,
    y: config.height - config.q1,
    x: 0,
    z: - config.length/2 + config.q2/2 + config.q2 - config.q1
  })

  // D
  const ds = D(config)
  arr = arr.concat(ds)

  // E
  const es = E(config)
  arr = arr.concat(es)

  // F
  arr.push({
    name: `F1`,
    group: 'side',
    orientation: "'",
    length: lengths.F,
    y: config.height - lengths.F/2 - config.q1/2,
    x: config.q2/2 + config.q1/2,
    z: config.length/2 - 2*config.q2 - config.q1/2
  })
  arr.push({
    name: `F2`,
    group: 'side',
    orientation: "'",
    length: lengths.F,
    y: config.height - lengths.F/2 - config.q1/2,
    x: - config.q1/2 -config.q2/2,
    z: config.length/2 - 2*config.q2 - config.q1/2
  })
  arr.push({
    name: `F3`,
    group: 'side',
    orientation: "'",
    length: lengths.F,
    y: config.height - lengths.F/2 - config.q1/2,
    x: config.q2/2 + config.q1/2,
    z: -config.length/2 + 2*config.q2 + config.q1/2
  })
  arr.push({
    name: `F4`,
    group: 'side',
    orientation: "'",
    length: lengths.F,
    y: config.height - lengths.F/2 - config.q1/2,
    x: - config.q1/2 -config.q2/2,
    z: -config.length/2 + 2*config.q2 + config.q1/2
  })

  // G
  arr.push({
    name: `G1`,
    group: 'keel',
    orientation: '-',
    length: lengths.G,
    y: config.height - config.q1/2 - 2.5*config.q2,
    x: config.q1,
    z: config.length / 2 - config.q2/2 - 2*config.q2 - config.q1
  })
  arr.push({
    name: `G2`,
    group: 'keel',
    orientation: '-',
    length: lengths.G,
    y: config.height - config.q1/2 - 2.5*config.q2,
    x: config.q1,
    z: config.length / 2 - config.q2/2 - 4*config.q2 - config.q1,
    rotation: Math.PI/4
  })
  arr.push({
    name: `G3`,
    group: 'keel',
    orientation: '-',
    length: lengths.G,
    y: config.height - config.q1/2 - 2.5*config.q2,
    x: config.q1,
    z: -config.length / 2 + config.q2/2 + 4*config.q2 + config.q1,
    rotation: -Math.PI/4
  })
  arr.push({
    name: `G4`,
    group: 'keel',
    orientation: '-',
    length: lengths.G,
    y: config.height - config.q1/2 - 2.5*config.q2,
    x: config.q1,
    z: -config.length / 2 + config.q2/2 + 2*config.q2 + config.q1
  })

  return arr
}
