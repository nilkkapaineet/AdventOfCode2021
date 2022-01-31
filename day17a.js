// Advent of Code 2021
// Day 17.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const targetArea = pin.match(/-?\d+/g)

let probe = {
  x: 0,
  y: 0,
  veloX: 1,
  veloY: 1,
  highest: 0
}

let velocities = 0
for (let brute=parseInt(targetArea[2]); brute<1000; brute++) {
  for (let force=1; force<=targetArea[1]; force++) {
    // init
    probe.x = 0
    probe.y = 0
    if (trajectory(brute, force)) { velocities++ }
  }
}

console.log("velocities: " + velocities + " highest: " + probe.highest)  

function trajectory(brute, force) {
  let hit = false
  probe.veloY = brute
  probe.veloX = force
  let hitOrPassTarget = true
  let tempHighest = 0
  while (hitOrPassTarget) {
    probe.x += probe.veloX
    probe.y += probe.veloY
    if (tempHighest < probe.y) {
      tempHighest = probe.y
    }

    // drag
    if (probe.veloX < 0) {
      probe.veloX++
    } else if (probe.veloX > 0) {
      probe.veloX--
    }
    probe.veloY-- // gravity
    // hit target ?
    if (probe.x >= targetArea[0] && probe.x <= targetArea[1] && probe.y >= targetArea[2] && probe.y <= targetArea[3]) {
      if (probe.highest < tempHighest) {
        probe.highest = tempHighest
      }
      hit = true
      hitOrPassTarget = false
    }
    if (probe.y < targetArea[2] || probe.x > targetArea[1]) {
      hitOrPassTarget = false
    }
  }
  return hit
}