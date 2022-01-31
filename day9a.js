// Advent of Code 2021
// Day 9.1
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
for (let j=0; j<rows.length; j++) {
  for (let i=0; i<rows[j].length; i++) {
    let isLower = 0
    if (compSouth(rows, i, j)) { isLower++ }  
    if (compEast(rows, i, j)) { isLower++ }
    if (compNorth(rows, i , j)) { isLower++ }
    if (compWest(rows, i, j)) { isLower++ }
    if (isLower == 4) {
      riskLevel += parseInt(rows[j].substr(i, 1)) + 1
    }
  }
}
console.log("Sum of risk levels: " + riskLevel)

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
