// Advent of Code 2021
// Day 3.2 with callbacks
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const binary = pin.split('\n')

let tempBin = binary
for (let i=0; i<binary[0].length-1; i++) {
  tempBin = findStringsWithGivenBitInPosition(tempBin, i, mostCommonBit)  
  if (tempBin.length == 1) {
    break
  }
}

let lcv = binary 
for (let i=0; i<binary[0].length-1; i++) {
  lcv = findStringsWithGivenBitInPosition(lcv, i, leastCommonBit)  
  if (lcv.length == 1) {
    break
  }
}

// find most common bit of position
function mostCommonBit(strs, position) {
  let findings = [0, 0]
  strs.forEach(element => {
    if (parseInt(element.charAt(position)) == 1) {
      findings[1]++
    } else {
      findings[0]++
    }
  }) 
  let returnValue = 1
  if (findings[0] > findings[1]) {
    returnValue = 0
  } 
  return returnValue
}

// find least common bit of position
function leastCommonBit(strs, position) {
  let findings = [0, 0]
  strs.forEach(element => {
    if (parseInt(element.charAt(position)) == 1) {
      findings[1]++
    } else {
      findings[0]++
    }
  }) 
  let returnValue = 0
  if (findings[0] > findings[1]) {
    returnValue = 1
  } 
  return returnValue
}

// return only string with given bit in given position
function findStringsWithGivenBitInPosition(strs, position, callback) {
  let returnArray = []
  strs.forEach(element => {
    if (parseInt(element[position]) == callback(strs, position)) {
      returnArray.push(element)
    }
  })
  return returnArray
}

// return array consisting only inputs with most common digit in given position
// if it goes even, return ones with 1 in the position
// function(inputs, position)
// repeat until returning array length is 1

// convert array to string and then to number
console.log("ogr: " + parseInt(tempBin, 2) + " lcv: " + parseInt(lcv, 2) + " giving life support rating: " + (parseInt(lcv, 2)*parseInt(tempBin, 2)))
