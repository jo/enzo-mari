const buildScene = (element, camera, controlsEnabled) => {
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
    renderer.setSize(element.clientWidth, element.clientHeight)
    
    element.appendChild(renderer.domElement)

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
    camera.aspect = element.clientWidth / element.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(element.clientWidth, element.clientHeight)
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
