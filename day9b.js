// Advent of Code 2021
// Day 9.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
let rows = pin.split('\n')
// remove linebreaks
let str = rows.toString()
str = str.replace(/\r/g, "")
rows = str.split(",")

// pos by pos compare to adjacent pos
// if lower than any adjacent --> low point found
let riskLevel = 0
let localMins = [] // [value, x, y]
for (let j=0; j<rows.length; j++) {
  for (let i=0; i<rows[j].length; i++) {
    let isLower = 0
    if (compSouth(rows, i, j)) { isLower++ }  
    if (compEast(rows, i, j)) { isLower++ }
    if (compNorth(rows, i , j)) { isLower++ }
    if (compWest(rows, i, j)) { isLower++ }
    if (isLower == 4) {
      riskLevel += parseInt(rows[j].substr(i, 1)) + 1
      localMins.push([parseInt(rows[j].substr(i, 1)), i, j])
    }
  }
}
console.log("Sum of risk levels: " + riskLevel)
console.log(rows)

let basinSize = []
localMins.forEach(point => {
  basinSize.push(lowerPoints(point[0], point[1], point[2], rows, 0))
})
console.log(basinSize)

//console.log(sumOfDigits(324))
// recursive search of lower positions
function lowerPoints(value, x, y, rows, sum) {
  sum++
  console.log(value + " at " + x + "," + y + " sum: " + sum) 
  // check adjacent points if they are higher but not nine
  // up
  if (y != 0) {
//    console.log(y + " : " + rows)
    if (rows[y-1].substr(x, 1) > value && rows[y-1].substr(x, 1) != 9) {
      console.log("y-1? " + rows[y-1].substr(x, 1))
      return (sum + lowerPoints(parseInt(rows[y-1].substr(x, 1)), x, (y-1), rows, sum))
    }
  }

  // down
  if (y != (rows.length-1)) {
    if (rows[y+1].substr(x, 1) > value && rows[y+1].substr(x, 1) != 9) {
      console.log("y+1? " + rows[y+1].substr(x, 1))
      return (sum + lowerPoints(parseInt(rows[y+1].substr(x, 1)), x, (y+1), rows, sum))
    }
  }

  // left 
  if (x != (rows.length-1)) {
    if (rows[y].substr((x+1), 1) > value && rows[y].substr((x+1), 1) != 9) {
      console.log(" x+1? " + rows[y].substr((x+1), 1))
      return (sum + lowerPoints(parseInt(rows[y].substr((x+1), 1)), (x+1), y, rows, sum))
    }
  }

    // right 
    if (x != 0) {
      if (rows[y].substr((x-1), 1) > value && rows[y].substr((x-1), 1) != 9) {
        console.log(" x-1? " + rows[y].substr((x-1), 1))
        return (sum + lowerPoints(parseInt(rows[y].substr((x-1), 1)), (x-1), y, rows, sum))
      }
    }
    console.log("returning: " + value + " at " + x + "," + y + " sum: " + sum) 
    return 0
  // left
  // right
  // down
}

function sumOfDigits(num) {
  if (num == 0) {
      return 0;
  }
  return num % 10 + sumOfDigits(Math.floor(num / 10));
}
// return true if on the edge or lower than adjacent

function compSouth(rows, i, j) {
  if (j == (rows.length-1)) {
    // bottom line
    return true
  } else {
    // lower than below
    if (rows[j].substr(i, 1) < rows[j+1].substr(i, 1)) {
      return true
    } else {
      return false
    }
  }
}

function compEast(rows, i , j) {
  // far right position
  if (i == (rows[j].length-1)) {
    return true
  } else {
    // lower than left
    if (rows[j].substr(i, 1) < rows[j].substr((i+1), 1)) {
      return true
    } else {
      return false
    }
  }
}

function compWest(rows, i , j) {
// far left position
if (i == 0) {
    return true
  } else {
    // lower than left
    if (rows[j].substr(i, 1) < rows[j].substr((i-1), 1)) {
      return true
    } else {
      return false
    }
  }
}

function compNorth(rows, i , j) {
  if (j == 0) {
    // top line
    return true
  } else {
    // lower than above
    if (rows[j].substr(i, 1) < rows[j-1].substr(i, 1)) {
      return true
    } else {
      return false
    }
  }
}
