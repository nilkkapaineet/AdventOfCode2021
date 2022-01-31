const Bingo = require('./bingo.js')
// Advent of Code 2021
// Day 4.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const input = pin.split('\n')

// first line is drawn numbers
// next (5) lines are bingo boards separated by empty lines
const drawnNumbers = input[0].split`,`.map(x=>+x)

let tempArray = []
let bingos = []
for (let i=1; i<input.length; i++) {
  if(input[i] !== null && input[i] !== '\r') {
    tempArray.push(input[i])
  } 
  if(i%6 == 0) {
    let bingo = new Bingo(i/6-1)
    bingo.board = tempArray
    tempArray = []
    bingos.push(bingo)
  }
}

// go through drawn numbers and check if there's a bingo
let foundBingoBoard = 100000
let currentNumber = 0
drawnNumbers.some(number => {
  let foundBingo = false
  bingos.some(bingo => {
    bingo.markNumber(number)
    if (bingo.checkRows() ){
      foundBingo = true
      foundBingoBoard = bingo.id
      currentNumber = number
      return true
    }
    bingo.checkColumns()
    if (bingo.checkColumns() ){
      foundBingo = true
      foundBingoBoard = bingo.id
      currentNumber = number
      return true
    }
  })
  if (foundBingo) {
    return true
  }
})

console.log("Final score: " + (bingos[foundBingoBoard].sumOfunMarkedNumbers()*currentNumber))