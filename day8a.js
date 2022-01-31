// Advent of Code 2021
// Day 8.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const input = pin.split('\n')
let outputs = []
let easyDigits = 0
input.forEach(element => {
  element = element.replace(/(\r\n|\n|\r)/gm, "");
  const outputElement = (element.split('|')[1].split(' '))
  outputElement.forEach(el => {
    if (el.length == 2 || el.length == 3 || el.length == 4 || el.length == 7) {
      easyDigits++
    }  
  })
})
console.log(easyDigits)