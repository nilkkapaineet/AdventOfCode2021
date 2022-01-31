// Advent of Code 2021
// Day 5.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const numbers = pin.split('\n')
let input = []
for (let i = 0; i < numbers.length; i++) {
  let thenums = numbers[i].match(/\d+/g)
  thenums = thenums.map(i => Number(i));
  input.push(thenums)
}

// populate coordinate points 
// go through input and make an array of coordinate objects

let coordPoint = function (myX, myY) {
  this.x = myX;
  this.y = myY;
  this.intersections = 0;
}
coordPoint.prototype.addIntersection = function () {
  this.intersections = this.intersections + 1
}

let CPs = [] // coordinatePoints
let overLappingPoints = 0
input.forEach(element => {
  overLappingPoints += parsePoints(element, CPs)
})

console.log("Overlapping points: " + overLappingPoints)

// ------------------- methods ------------------------------------------

function cpLoopD(cp, i, tempX1) {
  let points = 0
  CPs.forEach(el => {
    if (el.x == tempX1 && el.y == i) {
      el.addIntersection()
      cp.addIntersection()
      if (cp.intersections == 1 && el.intersections == 1) {
        points++
      }
    }
  })
  return points
}

function cpLoopY(cp, AoI, i) {
  let points = 0
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
  return points  
}

function cpLoop(cp, AoI, i) {
  let points = 0
  CPs.forEach(el => {
    if (el.x == i && el.y == AoI[1]) {
      el.addIntersection()
      cp.addIntersection()
      if (cp.intersections == 1 && el.intersections == 1) {
        points++
      }
    }
  })
  return points
}

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
    for (let i = tempX1; i <= tempX2; i++) {
      // form coordpoints
      let cp = new coordPoint(i, AoI[1])
      // check if there's overlapping points
      points += cpLoop(cp, AoI, i)
      CPs.push(cp)
    }
  } else if (AoI[1] != AoI[3] && AoI[0] == AoI[2]) {
    // y-coord changes
    // smaller coordinate first
    let tempY1 = AoI[1]
    let tempY2 = AoI[3]
    if (AoI[1] > AoI[3]) {
      tempY1 = AoI[3]
      tempY2 = AoI[1]
    }
    for (let i = tempY1; i <= tempY2; i++) {
      // form coordpoints
      let cp = new coordPoint(AoI[0], i)
      // check if there's overlapping points
      points += cpLoopY(cp, AoI, i)
    }
  } else {
    // diagonal lines
    // think how xy will change...
    let tempY1 = AoI[1]
    let tempY2 = AoI[3]
    let tempX1 = AoI[0]
  
    let toNorth = true
    let toWest = true
    if (AoI[1] > AoI[3]) {
      if (AoI[0] > AoI[2]) {
        // to northwest
      } else {
        // northeast
        toWest = false
      }
    } else {
      toNorth = false
      if (AoI[0] > AoI[2]) {
        // southwest
      } else {
        // southeast
        toWest = false
      }
    }

    if (toNorth) {
//      console.log("N diagonal: " + tempX1 + "," + tempY1)
      for (let i = tempY1; i >= tempY2; i--) {
        // form coordpoints
        let cp = new coordPoint(tempX1, i)
        // check if there's overlapping points
        points += cpLoopD(cp, i, tempX1)
        if (toWest) {
          tempX1--
        } else {
          tempX1++
        }
        CPs.push(cp)
      }  
    } else {
      for (let i = tempY1; i <= tempY2; i++) {
        // form coordpoints
        let cp = new coordPoint(tempX1, i)
        // check if there's overlapping points
        points += cpLoopD(cp, i, tempX1)
  
        if (toWest) {
          tempX1--
        } else {
          tempX1++
        }
        CPs.push(cp)
      }
    }

  }
  return points
}

