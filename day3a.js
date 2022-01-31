// Advent of Code 2021
// Day 3.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const binary = pin.split('\n')

// find number of bits per position
let ratesZero = Array(binary[0].length-1).fill(0)
let ratesOne = Array(binary[0].length-1).fill(0)
binary.forEach(element => {
  for (i=0; i<element.length; i++) {
    if (element.charAt(i) == "0") {
      ratesZero[i]++
    } else if (element.charAt(i) == "1") {
      ratesOne[i]++
    }
  }
})

// find most common bit per position
let finalBits = []
let finalReverseBits = []
for (let i=0; i<binary[0].length-1; i++) {
  if (ratesOne[i] > ratesZero[i]) {
    finalBits[i] = 1
    finalReverseBits[i] = 0
  } else {
    finalBits[i] = 0
    finalReverseBits[i] = 1
  }
}

// convert array to string and then to number
let finalBinary = finalBits.join("")
let finalReverseBinary = finalReverseBits.join("")
let gammaRate = parseInt(finalBinary, 2)
let epsilonRate = parseInt(finalReverseBinary, 2)
console.log("Power consumption of submarine: " + (gammaRate * epsilonRate))
