// Advent of Code 2021
// Day 25.1
let steps = 10000
const fs = require('fs')
let rows = fs.readFileSync('puzzleinput.txt', 'utf-8')
rows = rows.split("\n")
let grid = []
rows.forEach(row => { 
  row = row.replace("\r", "")
  grid.push(row.split("")) 
}) 

let rounds = 0
for (let i=0; i<steps; i++) {
  const copyGrid = [...grid]
  rounds++
 // printGrid(grid)
  grid = moveRight(grid, createTempGrid(grid))
  //printGrid(grid)
  grid = moveDown(grid, createTempGrid(grid), i)
  //console.log("")
//  console.log(arraysEqual(grid, copyGrid))
  if (arraysEqual(grid, copyGrid)) { break }
}

printGrid(grid)
console.log(rounds)

function arraysEqual(a1,a2) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1)==JSON.stringify(a2);
}

function createTempGrid(grid) {
  let tempGrid = []
  for (let y=0; y<grid.length; y++) {
    let tempRow = grid[y].map(x => ".")
    tempGrid.push(tempRow)
//    console.log(tempRow.length + " y: " + y)
  }
  return tempGrid  
}

function printGrid(grid) {
  grid.forEach(row => {
    row = row.join("")
    console.log(row)
  })  
}

function moveDown(grid, tg, i) {
  for (let y=0; y<grid[0].length; y++) {
    for (let x=0; x<grid.length; x++) {
//      console.log(x + "," + y + " :xy: " + grid[x][y])
      if (grid[x][y] == "v"  && x < (grid.length - 1) && grid[x+1][y] == ".") {
        tg[x+1][y] = "v"
        tg[x][y] = "."
        x++ // skip next
      } else if (grid[x][y] == "v" && grid[0][y] == "." && x == (grid.length - 1)) {
  //      printGrid(grid)
    //    console.log(grid[0][y] + "?")
        tg[0][y] = "v"
        tg[x][y] = "."
      //  console.log(x + "," + y + " " + grid[x][y] + " step " + i)
      } else {
        tg[x][y] = grid[x][y]
        //console.log("sama " + tg[x][y] + " : " + x + "," + y)
      }
    }
  }
  return tg  
}

function moveRight(grid, tg) {
  for (let x=0; x<grid.length; x++) {
    for (let y=0; y<grid[x].length; y++) {
//      console.log("length: " + y + " l: " + grid[x].length)
      if (grid[x][y] == ">" && grid[x][y+1] == "." && y < grid[x].length) {
        tg[x][y+1] = ">"
        tg[x][y] = "."
        y++ // skip next
      } else if (grid[x][y] == ">" && grid[x][0] == "." && (y == grid[x].length - 1)) {
        tg[x][0] = ">"
        tg[x][y] = "."
      } else {
        tg[x][y] = grid[x][y]
      }
    }
  }
  return tg  
}