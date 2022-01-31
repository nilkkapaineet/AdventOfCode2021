// Advent of Code 2021
// Day 24.1
const { equal } = require('assert')
const fs = require('fs')
let operations = fs.readFileSync('puzzleinput.txt', 'utf-8')

operations = operations.split("\n")
for(var i = 0; i < operations.length; ++i)
    operations[i] = operations[i].replace(/(\r\n|\n|\r)/gm,"")

let rows = []
let wxyz = [0, 0, 0, 0]
let number = 99999999999999
let index = 13
for (var i=0; i<operations.length; i++) {
  let row = operations[i].split(" ")
  for (var j=0; j<row.length; j++) {
    if (isNumeric(row[j])) {
      row[j] = parseInt(row[j], 10)
    }
  }
  rows.push(row)
}

rows.forEach(row => {
  switch(row[0]) {
    case "inp":
      inp(row[1], number, index)
      break
    case "add":
      add(row[1], row[2])
      break
    case "mul":
      mul(row[1], row[2])
      break
    case "div":
      div(row[1], row[2])
      break
    case "mod":
      mod(row[1], row[2])
      break
    case "eql":
      eql(row[1], row[2])
      break
  }
})

console.log(wxyz)

function eql(a, b) {
  //eql a b - If the value of a and b are equal, then store the value 1 in variable a. 
  // Otherwise, store the value 0 in variable a.
  if (Number.isInteger(b)) {
    if (wxyz[findWXYZ(a)] == b) {
      wxyz[findWXYZ(a)] = 1
    } else {
      wxyz[findWXYZ(a)] = 0
    }
  } else {
    if (wxyz[findWXYZ(a)] == wxyz[findWXYZ(a)]) {
      wxyz[findWXYZ(a)] = 1
    } else {
      wxyz[findWXYZ(a)] = 0
    }
  }
}

function mod(a, b) {
  // mod a b - Divide the value of a by the value of b, then store the remainder in variable a.
  if (Number.isInteger(b)) {
    wxyz[findWXYZ(a)] = wxyz[findWXYZ(a)] % b
  } else {
    wxyz[findWXYZ(a)] = wxyz[findWXYZ(a)] % wxyz[findWXYZ(b)]
  }
}

function div(a, b) {
  //div a b - Divide the value of a by the value of b, truncate the result to an 
  // integer, then store the result in variable a. (Here, "truncate" means to round the value toward zero.
  if (Number.isInteger(b)) {
    wxyz[findWXYZ(a)] = Math.floor(wxyz[findWXYZ(a)] / b)
  } else {
    wxyz[findWXYZ(a)] = Math.floor(wxyz[findWXYZ(a)] / wxyz[findWXYZ(b)])
  }
}

function mul(a, b) {
// mul a b - Multiply the value of a by the value of b, then store the result in variable a.
  if (Number.isInteger(b)) {
    wxyz[findWXYZ(a)] = b * wxyz[findWXYZ(a)]
  } else {
    wxyz[findWXYZ(a)] = wxyz[findWXYZ(b)] * wxyz[findWXYZ(a)]
  }
}

function add(a, b) {
  //add a b - Add the value of a to the value of b, then store the result in variable a.
  if (Number.isInteger(b)) {
    wxyz[findWXYZ(a)] += b
  } else {
    wxyz[findWXYZ(a)] += wxyz[findWXYZ(b)]
  }
}

function inp(a, number, index) {
  // inp a - Read an input value and write it to variable a.
  var digits = number.toString().split('').map(iNum => parseInt(iNum, 10));
  wxyz[findWXYZ(a)] = digits[index]
}

function findWXYZ(letter) {
  let index = 0
  switch(letter) {
    case "w":
      index = 0
      break
    case "x":
      index = 1
      break
    case "y":
      index = 2
      break
    default:
      index = 3  
  }
  return index
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}