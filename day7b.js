// Advent of Code 2021
// Day 7.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
let numbers = pin.split(',')
numbers = numbers.map(number => parseInt(number, 10))
const max = Math.max(...numbers)
const min = Math.min(...numbers)
console.log(max + " " + min)
let minFuel = 100000000000000000
for (let i=min; i<=max; i++) {
  let fuel = 0
  numbers.forEach(position => {
    Math.abs(i-position)
    fuel += countFuel(Math.abs(i-position))
  })
  if (fuel < minFuel) {
    minFuel = fuel
  }
}
console.log(minFuel)

function countFuel(diff) {
  let value = 0
  for (let i=1; i<=diff; i++) {
    value += i
  }
  return value
}
