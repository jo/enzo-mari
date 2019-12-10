class Config {
  constructor () {
    this.length = 200
    this.height = 70
    this.widthN = 8
    this.legRotation = Math.PI/12
    this.lathType = '2x10'
  }

  set lathType (type) {
    const [q1, q2] = type.split('x').map(parseFloat) //lathTypes[type]
    this.q1 = q1
    this.q2 = q2
  }

  get lathType () {
    return `${this.q1}x${this.q2}`
  }

  get width () {
    return this.widthN * this.q2
  }

  get legLength () {
    return this.width - this.q2
  }
}
