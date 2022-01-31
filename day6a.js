// Advent of Code 2021
// Day 6.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
let numbers = pin.split(',')
numbers = numbers.map(number => parseInt(number, 10))
for (let day=1; day<81; day++) {
  let nl = numbers.length
  for (let i=0; i<nl; i++) {
    if (numbers[i] > 0) {
      numbers[i]--
    } else {
      numbers.push(8)
      numbers[i] = 6
    }
  }
}
console.log("Number of lanternfish: " + numbers.length)
