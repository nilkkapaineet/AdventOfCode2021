const Octopus = require('./octopus.js')
// Advent of Code 2021
// Day 11.2
const steps = 1000
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const input = pin.split('\n')

let grid = []
input.forEach(row => {
  let tempRow = [...row]
  if (tempRow[tempRow.length-1] == "\r") { tempRow.pop() }  
  grid.push(tempRow)
})

let flashed = initFalseGrid(grid[0].length, grid.length)
let countFlashes = 0
let round = 0

for (let i=0; i<steps; i++) {
  incEnergy(grid)
  let nulled = false
  for (let x=0; x<grid.length; x++) {
    for (let y=0; y<grid[x].length; y++) {
      // if energy > 9 --> flash
      // energy drops to zero
      if (grid[x][y] > 9) {
        flashed[x][y] = true
        grid[x][y] = 0
        nulled = true
        countFlashes++
        // adjacent octopuses gain energy
        checkNeighbours(x, y, grid, flashed)
      }
    }
    // do it again if last line and there was a flash
    if (x == (grid.length-1) && overNine(grid)) {
      nulled = false
      x = -1
    }
  }
  if (syncFlash(grid)) {
    round = i
    break
  }
  flashed = initFalseGrid(grid[0].length, grid.length)
}
console.log("sync: " + (1+round))

function syncFlash(grid) {
  for (let x=0; x<grid.length; x++) {
    for (let y=0; y<grid[x].length; y++) {
      if (grid[x][y] != 0) { 
        return false
      }
    }
  }
  return true
}

function overNine(grid) {
  for (let x=0; x<grid.length; x++) {
    for (let y=0; y<grid[x].length; y++) {
      if (grid[x][y] > 9) { 
        return true 
      }
    }
  }
  return false
}

function checkNeighbours(x, y, grid, flashed) {
  // check borders
  // upper row
  if (x != 0) {
    if (y != 0 && !flashed[x-1][y-1]) { grid[x-1][y-1]++ }
    if (!flashed[x-1][y]) { grid[x-1][y]++ }
    if (y < (grid[0].length-1) && !flashed[x-1][y+1]) { grid[x-1][y+1]++ }
  }
  // middle row
  if (y != 0 && !flashed[x][y-1]) { grid[x][y-1]++ }
  if (y != (grid[0].length-1) && !flashed[x][y+1]) { grid[x][y+1]++ }
  // lower row
  if (x != (grid.length-1)) {
    if (y != 0 && !flashed[x+1][y-1]) { grid[x+1][y-1]++ }
    if (!flashed[x+1][y]) { grid[x+1][y]++ }
    if (y < (grid[0].length-1) && !flashed[x+1][y+1]) { grid[x+1][y+1]++ }
  }
}

function incEnergy(grid) {
  for (let x=0; x<grid.length; x++) {
    for (let y=0; y<grid[x].length; y++) {
      // increase by one
      grid[x][y]++
    }
  }
}

function initFalseGrid(d1, d2) {
  let arr = []
  for (let x=0; x<d2; x++) {
    let tempRow = []
    for (let y=0; y<d1; y++) {
      tempRow.push(false)
    }
    arr.push(tempRow)
  }
  return arr;
}

function printGrid(grid) {
  for (let x=0; x<grid.length; x++) {
    let row = ""
    for (let y=0; y<grid[x].length; y++) {
      row = row.concat(grid[x][y])
    }
    console.log(row)
  }
  console.log("")
}