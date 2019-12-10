
const options = {
  padding: 200
}

class Config {
  constructor () {
    this.q1 = 20
    this.q2 = 100
    this.length = 2000
    this.height = 700
    this.widthN = 8
  }

  get width () {
    return this.widthN * this.q2
  }
}

// Brett:    View:  top   side  front
// top H            ===   -     ---
// front H          ---   |     ===
// side H           |     ===   |
// top V            ||    ---   -
// font V           -     |     ||
// side V           '     ||    |

const perspectiveMap = {
  '===': { side: '-',   front: '---' },
  '---': { side: '|',   front: '===' },
  '|':   { side: '===', front: '|' },
  '||':  { side: '---', front: '-' },
  '-':   { side: '|',   front: '||' },
  "'":   { side: '||',  front: '|' },
}


const getPosition = (level, view) => {
  if (view === 'top') return level
  return perspectiveMap[level][view]
}

const getGTransform = (config, d, view) => {
  const position = getPosition(d.level, view)
  switch (position) {
    case '===':
      return `translate(${d.x}, ${d.y})`
      break;
    case '-':
      return `translate(${d.y}, ${d.x})`
      break;
    case '|':
      return `translate(${d.z}, ${d.y})`
      break;
    case '---':
      return `translate(${d.x}, ${d.z})`
      break;
    default:
      break;
  }
}

const getWidth = (config, d, view) => {
  const position = getPosition(d.level, view)
  switch (position) {
    case '===':
      return d.length
      break;
    case '-':
      return config.q2
      break;
    case '|':
      return config.q1
      break;
    case '---':
      return d.length
      break;
    default:
      break;
  }
}
const getHeight = (config, d, view) => {
  const position = getPosition(d.level, view)
  switch (position) {
    case '===':
      return config.q2
      break;
    case '-':
      return config.q1
      break;
    case '|':
      return config.q2
      break;
    case '---':
      return config.q1
      break;
    default:
      break;
  }
}
const getRectTransform = (config, d, view) => d.rotate && `rotate(${d.rotate})`

class View {
  constructor (svg) {
    this.svg = svg
    this.top = this.svg.append('g')
      .attr('class', 'top-view')
    this.side = this.svg.append('g')
      .attr('class', 'side-view')
    this.front = this.svg.append('g')
      .attr('class', 'front-view')
  }

  update (config, laths) {
    const dimensions = {
      width: config.width + options.padding + config.length,
      height: config.width + options.padding + config.height,
    }
    this.svg.attr('viewBox', `0, 0, ${dimensions.width}, ${dimensions.height}`)

    this.updateTop(config, laths)
    this.updateSide(config, laths)
    this.updateFront(config, laths)
  }

  updateTop (config, laths) {
    this.top.attr('transform', `translate(${config.width + options.padding}, 0)`)
    const update = this.updateLath(config, 'top')
    const g = this.top.selectAll('g').data(laths)
    g.exit().remove()
    g.enter().append('g').call(update)
    g.call(update)
  }

  updateSide (config, laths) {
    this.side.attr('transform', `translate(0, ${config.height + options.padding})`)
    const update = this.updateLath(config, 'side')
    const g = this.side.selectAll('g').data(laths)
    g.exit().remove()
    g.enter().append('g').call(update)
    g.call(update)
  }

  updateFront (config, laths) {
    this.front.attr('transform', `translate(${config.width + options.padding}, ${config.height + options.padding})`)
    const update = this.updateLath(config, 'front')
    const g = this.front.selectAll('g').data(laths)
    g.exit().remove()
    g.enter().append('g').call(update)
    g.call(update)
  }
  
  updateLath (config, view) {
    return g => {
      const rect = g
        .attr('class', 'lath')
        .attr('transform', d => getGTransform(config, d, view))
        .append('rect')

      rect
        .attr('width', d => getWidth(config, d, view))
        .attr('height', d => getHeight(config, d, view))
        .attr('transform', d =>getRectTransform(config, d, view)) 

      g.append('text')
        .classed('hidden', d => getPosition(d.level, view) !== '===')
        .text(d => d.name)
        .attr('text-anchor', 'middle')
        .attr('x', config.q2/2)
        .attr('y', config.q2/2)

      return g
    }
  }
}

const buildLaths = config => {
  const arr = []

  // plate
  for (let i = 0; i < config.widthN; i++) {
    arr.push({
      name: `A${i+1}`,
      group: 'plate',
      length: config.length,
      x: 0,
      y: i * config.q2,
      z: 0,
      level: '==='
    })
  }

  // front queer top
  arr.push({
    name: `B1`,
    group: 'front-queer',
    length: config.length - 2*config.q1,
    x: config.q1,
    y: config.q1 + config.q2,
    z: config.width/2 - config.q1/2,
    level: '---'
  })
  // front queer bottom
  arr.push({
    name: `B2`,
    group: 'front-queer',
    length: config.length - 2*config.q1,
    x: config.q1,
    y: config.q1 + 3*config.q2,
    z: config.width/2 - config.q1/2,
    level: '---'
  })

  // front senkrecht left
  arr.push({
    name: `G1`,
    group: 'front-queer',
    length: 3*config.q2,
    x: config.q1 + 4*config.q2-config.q1/2,
    y: config.q1 + 2*config.q2,
    z: config.width/2 - config.q1/2,
    level: '-'
  })
  // front senkrecht schräg left
  // arr.push({
  //   name: `G2`,
  //   group: 'front-queer',
  //   length: 3*config.q2,
  //   x: config.q1 + 3.2*config.q2,
  //   y: config.q1 + 3.2*config.q2,
  //   z: config.width/2 - config.q1/2,
  //   level: 'front',
  //   rotate: -45
  // })
  // // front senkrecht schräg right
  // arr.push({
  //   name: `G3`,
  //   group: 'front-queer',
  //   length: 3*config.q2,
  //   x: config.q1 + config.width,
  //   y: config.q1 + 1.1*config.q2,
  //   z: config.width/2 - config.q1/2,
  //   level: 'front',
  //   rotate: 45
  // })
  // front senkrecht right
  // arr.push({
  //   name: `G4`,
  //   group: 'front-queer',
  //   length: 3*config.q2,
  //   x: config.q1 + 2*config.q2,
  //   y: config.q1 + 4*config.q2,
  //   z: config.width/2 - config.q1/2,
  //   level: 'front',
  //   rotate: -90
  // })

  return arr
}

  
const config = new Config()
const svg = d3.select('svg.drawing')
const view = new View(svg)
const laths = buildLaths(config)
view.update(config, laths)

