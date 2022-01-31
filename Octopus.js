class Octopus {
  constructor (x, y) {
    this._y = x
    this._y = y
    this._energy = 0
    this._stepFlash = false
  }

  increaseEnergyByOne () {
    this._energy++
  }

  set energy (value) {
    this._energy = value
  }

  get x () {
    return this._x
  }

  get energy () {
    return this._energy
  }

  get stepFlash () {
    return this._stepFlash
  }

  set stepFlash (truth) {
    this._stepFlash = truth
  }

  get y () {
    return this._y
  }

}

module.exports = Octopus
