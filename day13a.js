// Advent of Code 2021
// Day 13.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const input = pin.split('\n')

let coords = []
let folds = []
input.forEach(row => {
  row = row.replace(/(\r\n|\n|\r)/gm, "");
  if (!row.match(/fold/g)) {
    row = row.split(",")
    if (row.length != 1) {
      row[0] = parseInt(row[0])
      row[1] = parseInt(row[1])
      coords.push([row[0], row[1]])
    }
  } else {
    const tempInt = "" + row.match(/\d+/)
    let fold = []
    fold[1] = parseInt(tempInt)
    let xy = ""
    if (row.match(/x/)) {
      xy = "x"
    } else {
      xy = "y"
    }
    fold[0] = xy
    folds.push(fold)
  }
})

coords.forEach(coord => {
  if (folds[0][0] == "x") {
    if (coord[0] > folds[0][1]) {
      coord[0] = 2 * folds[0][1] - coord[0] 
    }
  } else {
    if (coord[1] > folds[0][1]) {
      coord[1] = 2 * folds[0][1] - coord[1]
    }
  }
})

let uniqueCoords = coords.filter((t={},a=>!(t[a]=a in t)));

console.log(uniqueCoords.length)