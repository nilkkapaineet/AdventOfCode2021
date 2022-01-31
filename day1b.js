// Advent of Code 2021
// Day 1.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const numbers = pin.split('\n')
for (let i=0; i<numbers.length; i++) {
  numbers[i] = parseInt(numbers[i], 10)
}

let windows = [0, 0, 0, 0] // four sliding windows
let numberOfIncs = 0
let previousWindows = [0, 0, 0, 0]
let counter = 0
let firstRound = true
// sliding windows are made up by sum of three incremental step
// each sliding window is compared to previous window
numbers.forEach(element => {
  if (counter == 0) {
    if (!firstRound) {
      windows[0] = element
      previousWindows[1] = windows[1]
      windows[2] += element
      windows[3] += element
      if (previousWindows[0] > previousWindows[3]) {
        numberOfIncs++
      }
    }
    firstRound = false
  } else if (counter == 1) {
    windows[0] += element
    windows[1] = element
    previousWindows[2] = windows[2]
    windows[3] += element
    if (previousWindows[1] > previousWindows[0]) {
      numberOfIncs++
    }
  } else if (counter == 2) {
    windows[0] += element
    windows[1] += element
    windows[2] = element
    previousWindows[3] = windows[3]
    if (previousWindows[2] > previousWindows[1]) {
      numberOfIncs++
    }
  } else if (counter == 3) {
    previousWindows[0] = windows[0]
    windows[1] += element
    windows[2] += element
    windows[3] = element
    if (previousWindows[3] > previousWindows[2]) {
      numberOfIncs++
    }
  }

  // set and reset counter for sliding windows
  counter++
  if (counter == 4) {
    counter = 0
  }
});

console.log("Depth increased " + numberOfIncs + " times.")