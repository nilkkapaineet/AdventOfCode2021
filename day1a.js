// Advent of Code 2021
// Day 1.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const numbers = pin.split('\n')
for (let i=0; i<numbers.length; i++) {
  numbers[i] = parseInt(numbers[i], 10)
}

let numberOfIncs = 0
let firstRound = true
let previousDepth = 0
numbers.forEach(element => {
  if (!firstRound) {
    if (element > previousDepth) {
      numberOfIncs++
    }  
  }
  previousDepth = element
  firstRound = false
});

console.log("Depth increased " + numberOfIncs + " times.")