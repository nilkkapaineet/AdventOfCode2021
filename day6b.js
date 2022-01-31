// Advent of Code 2021
// Day 6.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
let numbers = pin.split(',')
numbers = numbers.map(number => parseInt(number, 10))
let state = [0, 0, 0, 0, 0, 0, 0, 0, 0]  // how many fish there are for each timer state
// init state
numbers.forEach(number => {
  state[number]++
})

for (let i=0; i<256; i++) {
  const newFish = state.shift()
  state.push(newFish)
  state[6] += newFish
}

let NumberOfFish = 0
state.forEach(el => {
  NumberOfFish += el
})
console.log("Number of lanternfish: " + NumberOfFish)
