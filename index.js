const config = {
  lath: { x: 19, y: 98 },
  length: 2000,
  height: 700,
  widthNLath: 8,

  // gap between laths
  gap: 2,

  // distance of the pillars from the edge
  pillarFactor: 2.5,

  display: {
    padding: 200
  }
}

d3.select('#lath-width-input').attr('value', config.lath.y)
d3.select('#lath-height-input').attr('value', config.lath.x)
d3.select('#width-n-lath-input').attr('value', config.widthNLath)
d3.select('#width-output').text(config.widthNLath * (config.lath.y + config.gap))
d3.select('#length-input').attr('value', config.length)
d3.select('#height-input').attr('value', config.height)

const svg = d3.select('svg.drawing')
const table = d3.select('table#tavoleite')
const tbody = table.append("tbody")

const renderSide = values => {
  const laths = []
  const x1 = 0
  const y1 = values.width + config.display.padding
  
  for (var i = 0; i < config.widthNLath; i++) {
    laths.push({
      name: 'side plate lath',
      x: x1 + i*values.lath.dy,
      y: y1,
      width: config.lath.y,
      height: config.lath.x
    })
  }
  laths.push({
    name: 'side plate stuetze',
    x: x1,
    y: y1 + config.lath.x + config.gap,
    width: values.width,
    height: config.lath.y
  })

  const rects = svg.selectAll('rect.side-rects')
    .data(laths)

  rects
    .attr('x', d => d.x)
    .attr('class', d => d.name + ' side-rects')
    .attr('y', d => d.y)
    .attr('width', d => d.width)
    .attr('height', d => d.height)

  rects.enter()
    .append('rect')
    .attr('class', d => d.name + ' side-rects')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', d => d.width)
    .attr('height', d => d.height)

  rects.exit().remove()
}

const renderTop = values => {
  const x1 = values.width + config.display.padding
  const y1 = 0
  const laths = []
  
  for (var i = 0; i < config.widthNLath; i++) {
    laths.push({
      name: 'plate lath',
      x: x1,
      y: y1 + i*values.lath.dy,
      width: config.length,
      height: config.lath.y
    })
  }
  laths.push({
    name: 'contour',
    x: x1,
    y: y1,
    width: config.length,
    height: values.width
  })

  const rects = svg.selectAll('rect.top-rects')
    .data(laths)

  rects
    .attr('x', d => d.x)
    .attr('class', d => d.name + ' top-rects')
    .attr('y', d => d.y)
    .attr('width', d => d.width)
    .attr('height', d => d.height)

  rects.enter()
    .append('rect')
    .attr('class', d => d.name + ' top-rects')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', d => d.width)
    .attr('height', d => d.height)

  rects.exit().remove()

  const lines = [
    {
      name: 'length',
      x1: x1,
      y1: y1 + values.width + config.display.padding/2,
      x2: x1 + config.length,
      y2: y1 + values.width + config.display.padding/2
    },
    {
      name: 'width',
      x1: x1 + config.length + config.display.padding/4,
      y1: y1,
      x2: x1 + config.length + config.display.padding/4,
      y2: y1 + values.width
    }
  ]

  const lineElements = svg.selectAll('line.top-lines')
    .data(lines)

  lineElements
    .attr('x', d => d.x)
    .attr('class', d => d.name + ' top-lines')
    .attr('x1', d => d.x1)
    .attr('y1', d => d.y1)
    .attr('x2', d => d.x2)
    .attr('y2', d => d.y2)

  lineElements.enter()
    .append('line')
    .attr('class', d => d.name + ' top-lines')
    .attr('x1', d => d.x1)
    .attr('y1', d => d.y1)
    .attr('x2', d => d.x2)
    .attr('y2', d => d.y2)

  lineElements.exit().remove()


  const labels = [
    {
      title: 'A',
      name: 'lath-title',
      x: x1 + config.lath.y/2,
      y: y1 + config.lath.y/2 + 16
    },
    {
      title: `mm ${config.length}`,
      x: x1 + config.length / 2,
      y: y1 + values.width + config.display.padding/2,
    },
    {
      title: `${values.width}`,
      x: x1 + config.length + config.display.padding/2,
      y: y1 + values.width/2 + 10,
    }
  ]
  
  const labelElements = svg.selectAll('text.top-labels')
    .data(labels)

  labelElements
    .attr('x', d => d.x)
    .attr('class', d => d.name + ' top-labels')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .text(d => d.title)

  labelElements.enter()
    .append('text')
    .attr('class', d => d.name + ' top-labels')
    .attr('x', d => d.x - 30)
    .attr('y', d => d.y - 10)
    .text(d => d.title)

  labelElements.exit().remove()
}

const renderFront = values => {
  const x1 = values.width + config.display.padding
  const y1 = values.width + config.display.padding
  const laths = [
    {
      name: 'plate',
      x: x1,
      y: y1,
      width: config.length,
      height: config.lath.x
    },
    {
      name: 'keel top',
      x: x1 + values.indent.keel,
      y: y1 + config.lath.x + config.gap + values.lath.dy,
      width: config.length - 2*values.indent.keel,
      height: config.lath.y
    },
    {
      name: 'keel bottom',
      x: x1 + values.indent.keel,
      y: y1 + config.lath.x + config.gap + 3*values.lath.dy,
      width: config.length - 2*values.indent.keel,
      height: config.lath.y
    },
    {
      name: 'keel-pillar left',
      x: x1 + values.indent.pillar,
      y: y1 + config.lath.x + config.gap + values.lath.dy,
      width: config.lath.y,
      height: 3*values.lath.dy
    },
    {
      name: 'keel-pillar left-b',
      x: x1 + values.indent.pillar + 2*values.lath.dy,
      y: y1 + config.lath.x + config.gap + values.lath.dy,
      width: config.lath.y,
      height: 3*values.lath.dy
    },
    {
      name: 'keel-pillar right',
      x: x1 + config.length - values.indent.pillar - config.lath.y,
      y: y1 + config.lath.x + config.gap + values.lath.dy,
      width: config.lath.y,
      height: 3*values.lath.dy
    },
    {
      name: 'keel-pillar right-b',
      x: x1 + config.length - values.indent.pillar - config.lath.y - 2*values.lath.dy,
      y: y1 + config.lath.x + config.gap + values.lath.dy,
      width: config.lath.y,
      height: 3*values.lath.dy
    },
    {
      name: 'pillar left',
      x: x1 + values.indent.pillar - config.gap - config.lath.x,
      y: y1 + config.lath.x + config.gap,
      width: config.lath.x,
      height: config.height - config.lath.x - config.gap
    },
    {
      name: 'pillar right',
      x: x1 + config.length - values.indent.pillar + config.gap,
      y: y1 + config.lath.x + config.gap,
      width: config.lath.x,
      height: config.height - config.lath.x - config.gap
    },
    {
      name: 'queer left top stirn',
      x: x1 + values.indent.pillar - 2*(config.gap +config.lath.x),
      y: y1 + config.lath.x + config.gap,
      width: config.lath.x,
      height: config.lath.y
    },
    {
      name: 'queer left bottom stirn',
      x: x1 + values.indent.pillar - 2*(config.gap +config.lath.x),
      y: y1 + config.lath.x + config.gap + 4*values.lath.dy,
      width: config.lath.x,
      height: config.lath.y
    },
    {
      name: 'queer right top stirn',
      x: x1 + config.length - values.indent.pillar + config.lath.x + 2*config.gap,
      y: y1 + config.lath.x + config.gap,
      width: config.lath.x,
      height: config.lath.y
    },
    {
      name: 'queer right bottom stirn',
      x: x1 + config.length - values.indent.pillar + config.lath.x + 2*config.gap,
      y: y1 + config.lath.x + config.gap + 4*values.lath.dy,
      width: config.lath.x,
      height: config.lath.y
    },
  ]
  
  const rects = svg.selectAll('rect.front-rects')
    .data(laths)

  rects
    .attr('x', d => d.x)
    .attr('class', d => d.name + ' front-rects')
    .attr('y', d => d.y)
    .attr('width', d => d.width)
    .attr('height', d => d.height)

  rects.enter()
    .append('rect')
    .attr('class', d => d.name + ' front-rects')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', d => d.width)
    .attr('height', d => d.height)


  rects.exit().remove()

  
  const lines = [
    {
      name: 'height',
      x1: x1 + config.length + config.display.padding/4,
      y1: y1,
      x2: x1 + config.length + config.display.padding/4,
      y2: y1 + config.height
    }
  ]

  const lineElements = svg.selectAll('line.front-lines')
    .data(lines)

  lineElements
    .attr('x', d => d.x)
    .attr('class', d => d.name + ' front-lines')
    .attr('x1', d => d.x1)
    .attr('y1', d => d.y1)
    .attr('x2', d => d.x2)
    .attr('y2', d => d.y2)

  lineElements.enter()
    .append('line')
    .attr('class', d => d.name + ' front-lines')
    .attr('x1', d => d.x1)
    .attr('y1', d => d.y1)
    .attr('x2', d => d.x2)
    .attr('y2', d => d.y2)

  lineElements.exit().remove()


  const labels = [
    {
      title: `${config.height}`,
      x: x1 + config.length + config.display.padding/2,
      y: y1 + config.height/2 + 10,
    },
    {
      title: 'B',
      name: 'lath-title',
      x: x1 + values.indent.keel + config.lath.y / 2,
      y: y1 + config.lath.x + config.gap + values.lath.dy + config.lath.y/2 + 16
    },
    {
      title: 'B',
      name: 'lath-title',
      x: x1 + values.indent.keel + config.lath.y / 2,
      y: y1 + config.lath.x + config.gap + 3*values.lath.dy + config.lath.y/2 + 16
    },
    {
      title: 'G',
      name: 'lath-title',
      x: x1 + values.indent.pillar + config.lath.y / 2,
      y: y1 + config.lath.x + config.gap + 2*values.lath.dy + config.lath.y/2 + 16
    },
    {
      title: 'G*',
      name: 'lath-title',
      x: x1 + values.indent.pillar + config.lath.y / 2 + 16 + 2*values.lath.dy,
      y: y1 + config.lath.x + config.gap + 2*values.lath.dy + config.lath.y/2 + 16
    },
    {
      title: 'G',
      name: 'lath-title',
      x: x1 + config.length - values.indent.pillar - config.lath.y / 2,
      y: y1 + config.lath.x + config.gap + 2*values.lath.dy + config.lath.y/2 + 16
    },
    {
      title: 'G*',
      name: 'lath-title',
      x: x1 + config.length - values.indent.pillar - config.lath.y / 2 + 16 - 2*values.lath.dy,
      y: y1 + config.lath.x + config.gap + 2*values.lath.dy + config.lath.y/2 + 16
    },
  ]
  
  const labelElements = svg.selectAll('text.front-labels')
    .data(labels)

  labelElements
    .attr('x', d => d.x)
    .attr('class', d => d.name + ' front-labels')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .text(d => d.title)

  labelElements.enter()
    .append('text')
    .attr('class', d => d.name + ' front-labels')
    .attr('x', d => d.x - 30)
    .attr('y', d => d.y - 10)
    .text(d => d.title)

  labelElements.exit().remove()
}



const renderTable = values => {
  const laths = [
    {
      title: 'A',
      dim: `${config.lath.x}x${config.lath.y}`,
      q: config.widthNLath,
      l: config.length
    }
  ]

  d3.select('#lath-size-output').text(`${config.lath.x} x ${config.lath.y}`)
  d3.select('#lath-a-length-output').text(config.length)
  d3.select('#lath-a-nr-output').text(config.widthNLath)
  d3.select('#lath-b-length-output').text(config.length - 2*values.indent.keel)
  d3.select('#lath-c-length-output').text(values.width)
  d3.select('#lath-f-length-output').text(5*values.lath.dy)
  d3.select('#lath-g-length-output').text(3*values.lath.dy)
}

let imageRendered = false
const renderImage = values => {
  if (imageRendered) return
  svg.append('image')
    .attr('xlink:href', 'images/drawing-cropped.jpg')
    .attr('x', 10)
    .attr('width', values.width)
    .attr('height', config.height)
  imageRendered = true
}

const updateForm = ({ id, value }) => {
  value = parseInt(value, 10)
  switch (id) {
    case 'lath-width-input':
      config.lath.y = value
    break;
    case 'lath-height-input':
      config.lath.x = value
    break;
    case 'width-n-lath-input':
      config.widthNLath = value
    break;
    case 'length-input':
      config.length = value
    break;
    case 'height-input':
      config.height = value
    break;
    case undefined:
    break;
    default:
      console.log('unknown field', id, value)
      break;
  }
  // console.log(config)
  const dy = config.lath.y + config.gap
  const values = {
    width: config.widthNLath * dy - config.gap,
    lath: {
      dy
    },
    indent: {
      keel: config.lath.x + config.gap,
      pillar: config.pillarFactor * dy
    }
  }
  // console.log(values)
  
  d3.select('#width-output').text(`${values.width}mm`)


  const svgDim = {
    width: values.width + config.display.padding + config.length + 10 + config.display.padding,
    height: values.width + config.display.padding + config.height + 10
  }
  svg.attr('viewBox', `0 0 ${svgDim.width} ${svgDim.height}`)

  renderImage(values)
  renderFront(values)
  renderTop(values)
  renderSide(values)
  renderTable(values)
}
d3.select('#inputs-form').on('change', () => updateForm(d3.event.target))
updateForm({})

