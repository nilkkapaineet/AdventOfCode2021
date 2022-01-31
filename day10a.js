// Advent of Code 2021
// Day 10.1
const { Console } = require('console')
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
let rows = pin.split('\n')
// remove linebreaks
let str = rows.toString()
str = str.replace(/\r/g, "")
rows = str.split(",")

// push open bracket into array
let brackets = []
let points = 0
rows.forEach(row => {
  for (let i=0; i<row.length; i++) {
    if (isOpenBracket(row.substr(i, 1))) {
      brackets.push(row.substr(i, 1))
    } else {
      // check if closing bracket is a pair with last one
      if (!checkPair(brackets.pop(), row.substr(i, 1))) {
        points += corruptBracketPoints(row.substr(i, 1))
      }
    }
  }
})
console.log("points: " + points)

function corruptBracketPoints(bracket) {
  if (bracket == ")") { return 3 } 
  if (bracket == "]") { return 57 }
  if (bracket == "}") { return 1197 }
  if (bracket == ">") { return 25137}
}

function checkPair(open, close) {
  const bracketTypes = [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
    ["<", ">"]   
  ]
  let isTrue = false
  bracketTypes.forEach(br => {
    if (br[0] == open && br[1] == close) {
      isTrue = true
    }
  })
  return isTrue
}

function isOpenBracket(letter) {
  if (letter == "{" || letter == "[" || letter == "(" || letter == "<") {
    return true
  } else {
    return false
  }
}