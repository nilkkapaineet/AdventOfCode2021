// Advent of Code 2021
// Day 5.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const numbers = pin.split('\n')
let input = []
for (let i=0; i<numbers.length; i++) {
  let thenums = numbers[i].match(/\d+/g)
  thenums = thenums.map(i=>Number(i));
  input.push(thenums)
}

// populate coordinate points 
// go through input and make an array of coordinate objects

let coordPoint = function(myX, myY) { 
  this.x = myX; 
  this.y = myY; 
  this.intersections = 0;
}
coordPoint.prototype.addIntersection = function() {
  this.intersections = this.intersections + 1  
}

let CPs = [] // coordinatePoints
let overLappingPoints = 0
input.forEach(element => {
  overLappingPoints += parsePoints(element, CPs)  
})

console.log("Overlapping points: " + overLappingPoints)

// ------------------- methods ------------------------------------------
// input is an array of ints
function parsePoints(AoI, CPs) {
  let points = 0
    if (AoI[0] != AoI[2] && AoI[1] == AoI[3]) {
      // x-coord changes
      let tempX1 = AoI[0]
      let tempX2 = AoI[2]
      if (AoI[0] > AoI[2]) {
        tempX1 = AoI[2]
        tempX2 = AoI[0]
      }
      for (let i=tempX1; i<=tempX2; i++) {
        // form coordpoints
        let cp = new coordPoint(i, AoI[1])
        // check if there's overlapping points
        CPs.forEach(el => {
          if (el.x == i && el.y == AoI[1]) {
            el.addIntersection()
            cp.addIntersection()
            if (cp.intersections == 1 && el.intersections == 1) {
              points++
            }
          }
        })
        CPs.push(cp)
      }
    } else if (AoI[1] != AoI[3] && AoI[0] == AoI[2]) {
       // y-coord changes
       let tempY1 = AoI[1]
       let tempY2 = AoI[3]
       if (AoI[1] > AoI[3]) {
         tempY1 = AoI[3]
         tempY2 = AoI[1]
       }
       for (let i=tempY1; i<=tempY2; i++) {
        // form coordpoints
        let cp = new coordPoint(AoI[0], i)
        // check if there's overlapping points
        CPs.forEach(el => {
          if (el.x == AoI[0] && el.y == i) {
            el.addIntersection()
            cp.addIntersection()
            if (cp.intersections == 1 && el.intersections == 1) {
              points++
            }
          }
        })
        CPs.push(cp)
      }
    }
  return points
}