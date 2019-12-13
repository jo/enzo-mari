const prices = {
  '1.7x3.7': [ 0.46 ],
  '1.9x9.4': [ 1.8 ],
  '2.3x10': [ 1.05 ],
  '2.4x4.8': [ 0.39 ],
  '3x5': [ 0.6 ],
  '3.8x5.8': [ 0.84 ]
}


const perspectiveViewElement = document.getElementById('perspective-view')
const topViewElement = document.getElementById('top-view')
const sideViewElement = document.getElementById('side-view')
const frontViewElement = document.getElementById('front-view')

const zoom = 4

const perspectiveCamera = new THREE.PerspectiveCamera(60, perspectiveViewElement.clientWidth / perspectiveViewElement.clientHeight, 1, 1000)
perspectiveCamera.position.set(100, 100, 100)
const perspectiveScene = buildScene(perspectiveViewElement, perspectiveCamera, true)

const topCamera = new THREE.OrthographicCamera(-topViewElement.clientWidth/2, topViewElement.clientWidth/2, topViewElement.clientHeight/2, -topViewElement.clientHeight/2, -1000)
topCamera.zoom = zoom
topCamera.updateProjectionMatrix()
const topScene = buildScene(topViewElement, topCamera)
topScene.rotation.x = -Math.PI/2
topScene.rotation.y = Math.PI/2

const sideCamera = new THREE.OrthographicCamera(-sideViewElement.clientWidth/2, sideViewElement.clientWidth/2, sideViewElement.clientHeight/2, -sideViewElement.clientHeight/2, -1000)
const sideScene = buildScene(sideViewElement, sideCamera)
sideCamera.zoom = zoom
sideCamera.updateProjectionMatrix()
sideScene.position.y = -40

const frontCamera = new THREE.OrthographicCamera(-frontViewElement.clientWidth/2, frontViewElement.clientWidth/2, frontViewElement.clientHeight/2, -frontViewElement.clientHeight/2, -1000)
const frontScene = buildScene(frontViewElement, frontCamera)
frontCamera.zoom = zoom
frontCamera.updateProjectionMatrix()
frontScene.rotation.y = -Math.PI/2
frontScene.position.y = -40

// Build laths objects
const buildLathGeometry = (config, material) => lath => {
  const geometry = new THREE.BoxGeometry(config.q2, config.q1, lath.length)
  const mesh = new THREE.Mesh(geometry, material)
  
  mesh.position.x = lath.x
  mesh.position.y = lath.y
  mesh.position.z = lath.z

  if (lath.orientation === '---') {
    mesh.rotation.z = Math.PI/2
  }
  if (lath.orientation === '-') {
    mesh.rotation.x = lath.rotation || Math.PI/2
    mesh.rotation.z = Math.PI/2
  }
  if (lath.orientation === '|') {
    mesh.rotation.y = Math.PI/2
    mesh.rotation.z = Math.PI/2
  }
  if (lath.orientation === '||') {
    mesh.rotation.y = Math.PI/2
  }
  if (lath.orientation === "'") {
    mesh.rotation.x = Math.PI/2
    if (lath.rotation) {
      mesh.rotation.y = lath.rotation
    }
  }

  return mesh
}

const config = new Config()
const texture = new THREE.TextureLoader().load('textures/wood.jpg')
const material = new THREE.MeshBasicMaterial({ map: texture })

const addGeometries = (laths, scene) => {
  const oldGroup = scene.getObjectByName('my-table')
  if (oldGroup) scene.remove(oldGroup)

  const geometries = laths.map(buildLathGeometry(config, material))
  const group = new THREE.Group()
  group.name = 'my-table'
  
  geometries.forEach(g => group.add(g))

  scene.add(group)
}

const updateWidthOutput = value => document.getElementById('width-output').innerText = round(value)

document.getElementById('lath-select-input').onchange = e => {
  config.lathType = e.target.value
  updateWidthOutput(config.width)
  render()
}
document.getElementById('width-n-lath-input').onchange = e => {
  config.widthN = parseInt(e.target.value)
  updateWidthOutput(config.width)
  render()
}
document.getElementById('length-input').onchange = e => {
  config.length = parseFloat(e.target.value)
  render()
}
document.getElementById('height-input').onchange = e => {
  config.height = parseFloat(e.target.value)
  render()
}

const round = value => Math.round(value*10)/10

const render = () => {
  const laths = buildLaths(config)
  // console.log(laths)

  const materialSum = laths.reduce((memo, lath) => memo + lath.length, 0)
  // console.log('Material: ', materialSum)
  document.getElementById('lath-total-length-output').innerText = `${Math.round(materialSum/100)}m`
  document.getElementById('lath-total-nr-output').innerText = laths.length
  const price = config.lathType in prices && prices[config.lathType][0]*materialSum / 100 + 5
  document.getElementById('lath-total-price-output').innerText = price > 0 ? `~${Math.round(price)}€` : '?'
  document.getElementById('lath-a-nr-output').innerText = config.widthN
  document.getElementById('lath-size-output').innerText = config.lathType
  document.getElementById('lath-type-output').innerText = config.lathType
  const date = new Date
  document.getElementById('date-output').innerText = `${date.getMonth()+1}/${date.getFullYear()}`

  
  const lengths = buildLengths(config)

  Object.keys(lengths).forEach(name => {
    document.getElementById(`lath-${name.toLowerCase()}-length-output`).innerText = round(lengths[name])
  })

  addGeometries(laths, perspectiveScene)
  addGeometries(laths, topScene)
  addGeometries(laths, sideScene)
  addGeometries(laths, frontScene)
}

render()

