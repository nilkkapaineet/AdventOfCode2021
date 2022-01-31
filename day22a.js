// Advent of Code 2021
// Day 22.1
const { X509Certificate } = require('crypto');
const fs = require('fs')
let reboot = fs.readFileSync('puzzleinput.txt', 'utf-8')
reboot = reboot.split("\n")
let cuboidsOn = []

reboot.forEach(element => {
  let areas = element.match(/-?\d+/gm)  // x1..x2 y1..y2 z1..z2
  areas = areas.map(x => parseInt(x, 10))
  if (element.substring(0,3) == "off") {
    turnOnOff(false, areas, cuboidsOn)
  } else {
    turnOnOff(true, areas, cuboidsOn)
  }
});

console.log("Cuboids on: " + cuboidsOn.length)

function isItThere(cuboid, cuboidsOn) {
  let result = false
  let index = -1
  let k = 0
  /*
  cuboidsOn.forEach(cb => {
    if (cuboid[0] == cb[0] && cuboid[1] == cb[1] && cuboid[2] == cb[2]) {
      result = true
      index = i
    }
    i++
  })
  */
  for (let i=0; i<cuboidsOn.length; i++) {
    if (cuboid[0] == cuboidsOn[i][0] && cuboid[1] == cuboidsOn[i][1] && cuboid[2] == cuboidsOn[i][2]) {
      result = true
      index = k
      break
    }
    k++
  }
  return [result, index]
}

function turnOnOff(onOff, areas, cuboidsOn) {
  if (onOff) {
    for (let x=areas[0]; x<=areas[1]; x++) {
      for (let y=areas[2]; y<=areas[3]; y++) {
        for (let z=areas[4]; z<=areas[5]; z++) {
          const iit = isItThere([x, y, z], cuboidsOn)
          if (!iit[0]) {
            cuboidsOn.push([x, y, z])
          } 
        }
      }
    }
  } else {
    for (let x=areas[0]; x<=areas[1]; x++) {
      for (let y=areas[2]; y<=areas[3]; y++) {
        for (let z=areas[4]; z<=areas[5]; z++) {
          const iit = isItThere([x, y, z], cuboidsOn)
          if (iit[0]) {
            // remove from array
            cuboidsOn.splice(iit[1],1);
          }
        }
      }
    }
  }
}
