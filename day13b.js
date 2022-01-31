// Advent of Code 2021
// Day 13.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const input = pin.split('\n')

// parse coordinates and fold instructions
let coords = [] // x,y
let folds = []  // x/y, index
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

// do folding
for (let i=0; i<folds.length; i++) {
  coords.forEach(coord => {
    if (folds[i][0] == "x") {
      if (coord[0] > folds[i][1]) {
        coord[0] = 2 * folds[i][1] - coord[0] 
      }
    } else {
      if (coord[1] > folds[i][1]) {
        coord[1] = 2 * folds[i][1] - coord[1]
      }
    }
  })
  coords = coords.filter((t={},a=>!(t[a]=a in t)));  
}

printCoords(coords, folds)

function minXY(folds) {
  let xMin = 100000
  let yMin = 100000
  folds.forEach(fold => {
    if (fold[0] == "x") {
      if (fold[1] < xMin) {
        xMin = fold[1]
      }
    } else {
      if (fold[1] < yMin) {
        yMin = fold[1]
      }    
    }
  })
  return [xMin, yMin]
}

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

function printCoords(coords, folds) {
  const minX_Y = minXY(folds)
  let printable = []
  for (let i=0; i<minX_Y[1]; i++) {
    let row = ""
    for (j=0; j<minX_Y[0]; j++) {
      row = row.concat(".")
    }
    printable.push(row)
  }
  for (let i=0; i<coords.length; i++) {
    for (let j=0; j<printable.length; j++) {
      if (j == coords[i][1]) {
        printable[j] = setCharAt(printable[j], coords[i][0], "#")        
        break
      }
    }
  }
  for (let i=0; i<printable.length; i++) {
    console.log(printable[i])
  }
}
