class Scanner {
  constructor (id) {
    this._id = id
    this._beacons = []
  }

  get id() { return this._id }
  addBeacons(x, y, z) { this._beacons.push([x, y, z]) }

  rotateBack(params) {
    switch(params) {
      case 1: // xz-y
        this.rotations(3)
        break
      case 2: // x-y-z
        this.rotations(2)
        break
      case 3: // x-zy
        this.rotations(1)
      break
      case 4: // xzy
        this.rotations(4)
        break
      case 5: // -xyz
        this.rotations(5)
        break
      case 6: // -x-zy
        this.rotations(7)
        break
      case 7: // -xz-y
        this.rotations(6)
        break
      case 8: // -x-y-z
        this.rotations(8)
        break
    }
  }

  rotations(params) {
    // arguments xyz -> yxz or -> -x-yz etc ?
    switch(params) {
      case 1: // xz-y
        for (let i=0; i < this._beacons.length; i++) {
          let beacon = this._beacons[i]
          this._beacons[i] = [beacon[0], beacon[2], -beacon[1]] 
        }
        break
      case 2: // x-y-z
        for (let i=0; i < this._beacons.length; i++) {
          let beacon = this._beacons[i]
          this._beacons[i] = [beacon[0], -beacon[1], -beacon[2]] 
        }
        break
      case 3: // x-zy
        for (let i=0; i < this._beacons.length; i++) {
          let beacon = this._beacons[i]
          this._beacons[i] = [beacon[0], -beacon[2], beacon[1]] 
        }
        break
      case 4: // xzy
        for (let i=0; i < this._beacons.length; i++) {
          let beacon = this._beacons[i]
          this._beacons[i] = [beacon[0], beacon[2], beacon[1]] 
        }
        break
      case 5: // -xyz
        for (let i=0; i < this._beacons.length; i++) {
          let beacon = this._beacons[i]
          this._beacons[i] = [-beacon[0], beacon[1], beacon[2]] 
        }
        break
      case 6: // -x-zy
        for (let i=0; i < this._beacons.length; i++) {
          let beacon = this._beacons[i]
          this._beacons[i] = [-beacon[0], -beacon[2], beacon[1]] 
        }
        break
      case 7: // -xz-y
        for (let i=0; i < this._beacons.length; i++) {
          let beacon = this._beacons[i]
          this._beacons[i] = [-beacon[0], beacon[2], -beacon[1]] 
        }
        break
      case 8: // -x-y-z
        for (let i=0; i < this._beacons.length; i++) {
          let beacon = this._beacons[i]
          this._beacons[i] = [-beacon[0], -beacon[1], -beacon[2]] 
        }
        break
      }
  }

}

module.exports = Scanner
