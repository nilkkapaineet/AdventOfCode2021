// Advent of Code 2021
// Day 19.1
const Scanner = require('./Scanner')
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
console.log(pin)

let scanner = new Scanner(1)
scanner.addBeacons(1, 2, 3)
scanner.addBeacons(4, 5, 6)
for (let i=1; i<9; i++) {
  console.log(scanner._beacons)
  scanner.rotations(i)
  console.log("r: " + scanner._beacons)
  scanner.rotateBack(i)
  console.log("r b: " + scanner._beacons)
}
