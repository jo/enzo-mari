class Config {
  constructor () {
    this.length = 200
    this.height = 70
    this.widthN = 8
  
    this.lathType = '2.3x10'
  }

  set lathType (type) {
    const [q1, q2] = type.split('x').map(parseFloat) //lathTypes[type]
    this.q1 = q1
    this.q2 = q2
  }

  get lathType () {
    return `${this.q1}x${this.q2}`
  }

  get legRotation () {
    const dd = this.q2/2
    const fest = this.q1/2 + this.q2 + 2*dd
    const x2 = (this.width/2 - fest)/2

    return Math.atan(x2/(this.height/2))
  }

  get width () {
    return this.widthN * this.q2
  }
}
