// Advent of Code 2021
// Day 2.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const orders = pin.split('\n')
let depth = 0
let horizontalPosition = 0
let aim = 0
for (let i=0; i<orders.length; i++) {
  const splitted = orders[i].split(" ")
  splitted[1] = parseInt(splitted[1], 10)
  switch(splitted[0]) {
    case "forward":
      horizontalPosition += splitted[1]
      depth += aim * splitted[1]
      break
    case "up":
      aim -= splitted[1]
      break
    case "down":
      aim += splitted[1]
      break
    default:
      console.log("There was an error.")
  }
}

console.log("Multiplication of depth and horizontal position: " + (depth * horizontalPosition))