
class Config {
  constructor () {
    // 2 x 10
    // 1.8 x 9.8
    // 3.8 x 3.8
    // 3.8 x 5.8
    // 4 x 20
    
    this.q1 = 3.8
    this.q2 = 5.8
    this.widthN = 10
    this.length = 150
    this.legRotation = Math.PI/12
    
    this.q1 = 2
    this.q2 = 10
    this.widthN = 8
    this.length = 200
    this.legRotation = Math.PI/8
    
    this.gap = 0.01

    this.height = 70

    this.d1 = this.q1 + this.gap
    this.d2 = this.q2 + this.gap

    this.legLength = this.widthN * this.d2
  }

  get width () {
    return this.widthN * this.d2
  }
}

// orientation seen from top view
// const perspectiveMap = {
//   '===': { side: '-',   front: '---' },
//   '---': { side: '|',   front: '===' },
//   '|':   { side: '===', front: '|' },
//   '||':  { side: '---', front: '-' },
//   '-':   { side: '|',   front: '||' },
//   "'":   { side: '||',  front: '|' },
// }

const buildLaths = config => {
  const arr = []

  const lengths = {
    A: config.length,
    B: config.length - 2*config.d1,
    C: config.width,
    D: config.height,
    E: config.legLength,
    F: 5*config.d2,
    G: 3*config.d2
  }
  
  // A
  for (let i = 0; i < config.widthN; i++) {
    arr.push({
      name: `A${i}`,
      group: 'plate',
      orientation: '===',
      length: lengths.A,
      y: config.height,
      x: -config.width/2 + i*config.d2 + config.d2/2,
      z: 0
    })
  }

  // B
  arr.push({
    name: `B1`,
    group: 'keel',
    orientation: '---',
    length: lengths.B,
    y: config.height - 2*config.d2 - config.d1/2 + config.d2/2,
    x: 0,
    z: 0
  })
  arr.push({
    name: `B2`,
    group: 'keel',
    orientation: '---',
    length: lengths.B,
    y: config.height - config.d1/2 - 4*config.d2 + config.d2/2,
    x: 0,
    z: 0
  })
  
  // C
  arr.push({
    name: `C1`,
    group: 'side',
    orientation: '|',
    length: lengths.C,
    y: config.height - config.q2/2 - config.gap - config.q1/2,
    x: 0,
    z: config.length/2 - 2*config.d2 + config.d1/2
  })
  arr.push({
    name: `C2`,
    group: 'side',
    orientation: '|',
    length: lengths.C,
    y: config.height - config.q2/2 - config.gap - config.q1/2,
    x: 0,
    z: -config.length/2 + 2*config.d2 - config.d1/2
  })
  arr.push({
    name: `C3`,
    group: 'side',
    orientation: '||',
    length: lengths.C,
    y: config.height - config.q1 - config.gap,
    x: 0,
    z: config.length/2 - config.d2/2 - config.d2 + config.d1
  })
  arr.push({
    name: `C4`,
    group: 'side',
    orientation: '||',
    length: lengths.C,
    y: config.height - config.q1 - config.gap,
    x: 0,
    z: 0
  })
  arr.push({
    name: `C5`,
    group: 'side',
    orientation: '||',
    length: lengths.C,
    y: config.height - config.q1 - config.gap,
    x: 0,
    z: - config.length/2 + config.d2/2 + config.d2 - config.d1
  })

  // D
  arr.push({
    name: `D1`,
    group: 'side',
    orientation: "'",
    length: lengths.D,
    y: config.height/2 -config.d1/2,
    x: config.d2/2 + config.d1/2 + 2.5*config.d2,
    z: config.length/2 - 2*config.d2 - config.d1/2,
    rotation: config.legRotation
  })
  arr.push({
    name: `D2`,
    group: 'side',
    orientation: "'",
    length: lengths.D,
    y: config.height/2 -config.d1/2,
    x: -config.d2/2 - config.d1/2 - 2.5*config.d2,
    z: config.length/2 - 2*config.d2 - config.d1/2,
    rotation: -config.legRotation
  })
  arr.push({
    name: `D3`,
    group: 'side',
    orientation: "'",
    length: lengths.D,
    y: config.height/2 -config.d1/2,
    x: config.d2/2 + config.d1/2 + 2.5*config.d2,
    z: -config.length/2 + 2*config.d2 + config.d1/2,
    rotation: config.legRotation
  })
  arr.push({
    name: `D4`,
    group: 'side',
    orientation: "'",
    length: lengths.D,
    y: config.height/2 -config.d1/2,
    x: -config.d2/2 - config.d1/2 - 2.5*config.d2,
    z: -config.length/2 + 2*config.d2 + config.d1/2,
    rotation: -config.legRotation
  })

  // E
  arr.push({
    name: `E1`,
    group: 'side',
    orientation: '|',
    length: lengths.E,
    y: config.height - 4*config.q2 - config.q2/2 - config.gap - config.q1/2,
    x: 0,
    z: config.length/2 - 2*config.d2 + config.d1/2
  })
  arr.push({
    name: `E2`,
    group: 'side',
    orientation: '|',
    length: lengths.E,
    y: config.height - 4*config.q2 - config.q2/2 - config.gap - config.q1/2,
    x: 0,
    z: -config.length/2 + 2*config.d2 - config.d1/2
  })

  // F
  arr.push({
    name: `F1`,
    group: 'side',
    orientation: "'",
    length: lengths.F,
    y: config.height - lengths.F/2 - config.d1/2,
    x: config.d2/2 + config.d1/2,
    z: config.length/2 - 2*config.d2 - config.d1/2
  })
  arr.push({
    name: `F2`,
    group: 'side',
    orientation: "'",
    length: lengths.F,
    y: config.height - lengths.F/2 - config.d1/2,
    x: - config.d1/2 -config.d2/2,
    z: config.length/2 - 2*config.d2 - config.d1/2
  })
  arr.push({
    name: `F3`,
    group: 'side',
    orientation: "'",
    length: lengths.F,
    y: config.height - lengths.F/2 - config.d1/2,
    x: config.d2/2 + config.d1/2,
    z: -config.length/2 + 2*config.d2 + config.d1/2
  })
  arr.push({
    name: `F4`,
    group: 'side',
    orientation: "'",
    length: lengths.F,
    y: config.height - lengths.F/2 - config.d1/2,
    x: - config.d1/2 -config.d2/2,
    z: -config.length/2 + 2*config.d2 + config.d1/2
  })

  // G
  arr.push({
    name: `G1`,
    group: 'keel',
    orientation: '-',
    length: lengths.G,
    y: config.height - config.d1/2 - 2.5*config.d2,
    x: config.d1/2,
    z: config.length / 2 - config.d2/2 - 2*config.d2 - config.d1
  })
  arr.push({
    name: `G2`,
    group: 'keel',
    orientation: '-',
    length: lengths.G,
    y: config.height - config.d1/2 - 2.5*config.d2,
    x: config.d1/2,
    z: config.length / 2 - config.d2/2 - 4*config.d2 - config.d1,
    rotation: Math.PI/4
  })
  arr.push({
    name: `G3`,
    group: 'keel',
    orientation: '-',
    length: lengths.G,
    y: config.height - config.d1/2 - 2.5*config.d2,
    x: config.d1/2,
    z: -config.length / 2 + config.d2/2 + 4*config.d2 + config.d1,
    rotation: -Math.PI/4
  })
  arr.push({
    name: `G4`,
    group: 'keel',
    orientation: '-',
    length: lengths.G,
    y: config.height - config.d1/2 - 2.5*config.d2,
    x: config.d1/2,
    z: -config.length / 2 + config.d2/2 + 2*config.d2 + config.d1
  })

  return arr
}

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


const buildScene = (camera, controlsEnabled) => {
  // fancy
  var controls, scene, renderer;

  init();
  animate();

  function init() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth/2, window.innerHeight/2)
    document.body.appendChild(renderer.domElement)

    // controls
    if (controlsEnabled) {
      controls = new THREE.OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.screenSpacePanning = false
      controls.minDistance = 10
      controls.maxDistance = 500
      controls.maxPolarAngle = Math.PI
    }


    const config = new Config()
    const laths = buildLaths(config)

    // console.log(laths)

    const materialSum = laths.reduce((memo, lath) => memo + lath.length, 0)
    console.log('Material: ', materialSum)
    

    var texture = new THREE.TextureLoader().load('images/material-stroke.jpg')
    var material = new THREE.MeshBasicMaterial({ map: texture })
    const geometries = laths.map(buildLathGeometry(config, material))
    geometries.forEach(g => scene.add(g))


    // lights
    var light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1)
    scene.add(light)

    light = new THREE.DirectionalLight(0x002288)
    light.position.set(-1, -1, -1)
    scene.add(light)

    light = new THREE.AmbientLight(0x222222)
    scene.add(light)


    //axes
    var axes = new THREE.AxesHelper(100)
    scene.add(axes)

    // grid
    var gridXZ = new THREE.GridHelper(1000, 10)
    scene.add(gridXZ)

    window.addEventListener( 'resize', onWindowResize, false )
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth/2, window.innerHeight/2)
  }

  function animate() {
    requestAnimationFrame(animate)
    if (controls) controls.update()
    render()
  }

  function render() {
    renderer.render(scene, camera)
  }

  return scene
}



const width = window.innerWidth/2
const height = window.innerHeight/2

const camera1 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
camera1.position.set(100, 100, 100)
buildScene(camera1, true)

const zoom = 4.5

const camera2 = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, -1000)
camera2.zoom = zoom
camera2.updateProjectionMatrix()
const scene2 = buildScene(camera2)
scene2.rotation.x = -Math.PI/2
scene2.rotation.y = Math.PI/2

const camera3 = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, -1000)
const scene3 = buildScene(camera3)
camera3.zoom = zoom
camera3.updateProjectionMatrix()
scene3.position.y = -40

const camera4 = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, -1000)
const scene4 = buildScene(camera4)
camera4.zoom = zoom
camera4.updateProjectionMatrix()
scene4.rotation.y = -Math.PI/2
scene4.position.y = -40
