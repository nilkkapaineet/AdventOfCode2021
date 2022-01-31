// Advent of Code 2021
// Day 15.1
const Graph = require('node-dijkstra')
const route = new Graph()

const fs = require('fs')
const path = require('path')
let input = fs.readFileSync('puzzleinput.txt', 'utf-8')
input = input.split("\n")
for(var i = 0; i < input.length; ++i)
    input[i] = input[i].replace(/(\r\n|\n|\r)/gm,"")


let grid = []
grid = createGrid(input, grid)

for(let i=1; i<(grid.length-1); i++) {
  for(let j=1; j<(grid[i].length-1); j++) {
    // add routes to adjacent nodes
    const gNode = "a" + i + "_" + j
    route.addNode(gNode, adjacents(i, j, grid))
  }
}

// find finish
const finish = "a" + (grid.length-2) + "_" + (grid[0].length-2)
const rt = route.path('a1_1', finish, { cost: true })
console.log("cost: " + rt.cost)

function adjacents(i, j, grid) {
  let a = "a" + (i-1) + "_" + j
  let b = "a" + i + "_" + (j-1)
  let c = "a" + (i+1) + "_" + j
  let d = "a" + i + "_" + (j+1)
  // find adjacent
  let result = { [a]:grid[i-1][j], [b]:grid[i][j-1], [c]:grid[i+1][j], [d]:grid[i][j+1] }
  return result
}

function createGrid(input, grid) {
  let rowLength = []
  input.forEach(row => {
    let tempRow = row.split("")
    tempRow.push("9")
    tempRow.unshift("9")
    grid.push(tempRow)
    rowLength = [...tempRow]
  })
  rowLength.fill("9")
  // added padding
  grid.push(rowLength)
  grid.unshift(rowLength)
 
  for(let i=0; i<grid.length; i++) {
    for(let j=0; j<grid[i].length; j++) {
      grid[i][j] = parseInt(grid[i][j], 10)
    }
  }
  
  return grid
}