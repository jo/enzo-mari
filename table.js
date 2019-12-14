// orientation seen from top view
// const perspectiveMap = {
//   '===': { side: '-',   front: '---' },
//   '---': { side: '|',   front: '===' },
//   '|':   { side: '===', front: '|' },
//   '||':  { side: '---', front: '-' },
//   '-':   { side: '|',   front: '||' },
//   "'":   { side: '||',  front: '|' },
// }


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
  const arr = []

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
  const dd = config.q2/2
  const fest = config.q1/2 + config.q2 + dd
  const two = config.width/2 - fest
  const dx = fest + two/2
  arr.push({
    name: `D1`,
    group: 'side',
    orientation: "'",
    length: lengths.D,
    y: config.height/2 -config.q1/2,
    x: dx,
    z: config.length/2 - 2*config.q2 - config.q1/2,
    rotation: config.legRotation
  })
  arr.push({
    name: `D2`,
    group: 'side',
    orientation: "'",
    length: lengths.D,
    y: config.height/2 -config.q1/2,
    x: -dx,
    z: config.length/2 - 2*config.q2 - config.q1/2,
    rotation: -config.legRotation
  })
  arr.push({
    name: `D3`,
    group: 'side',
    orientation: "'",
    length: lengths.D,
    y: config.height/2 -config.q1/2,
    x: dx,
    z: -config.length/2 + 2*config.q2 + config.q1/2,
    rotation: config.legRotation
  })
  arr.push({
    name: `D4`,
    group: 'side',
    orientation: "'",
    length: lengths.D,
    y: config.height/2 -config.q1/2,
    x: -dx,
    z: -config.length/2 + 2*config.q2 + config.q1/2,
    rotation: -config.legRotation
  })

  // E
  arr.push({
    name: `E1`,
    group: 'side',
    orientation: '|',
    length: lengths.E,
    y: config.height - 4*config.q2 - config.q2/2 - config.q1/2,
    x: 0,
    z: config.length/2 - 2*config.q2 + config.q1/2
  })
  arr.push({
    name: `E2`,
    group: 'side',
    orientation: '|',
    length: lengths.E,
    y: config.height - 4*config.q2 - config.q2/2 - config.q1/2,
    x: 0,
    z: -config.length/2 + 2*config.q2 - config.q1/2
  })

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
