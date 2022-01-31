// Advent of Code 2021
// Day 18.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
console.log(pin)

reduce(pin)

let str = pin
let oneNumber = false
while(!oneNumber) {
  str = magnitude(str)
  if (isNumeric(str)) {
    oneNumber = true
    console.log(str) // print resulting magnitude
  }
}

function reduce(str) {
  // go through char by char, count +[ -] 
  // if 4 of [, explode
  let counter = 0
  for (let i=0; i<str.length; i++) {
    if (str.substring(i, (i+1)) == "[") {
      counter++
    } else if (str.substring(i, (i+1)) == "]") {
      counter--
    }
    if (counter == 5) {
      counter--
      console.log(str.substring(i, (i+5)))
      explode(i, str, str.substring(i, (i+5)))
      break
    }
  }
}

function explode(i, str, input) {
  let leftNumber = str.substring((i-2), (i-1))
  if (isNumeric(leftNumber)) {

  } else {
    const num1 = parseInt(str.substring((i+3), (i+4)))
    //console.log(num1) 
    str = replaceStr(str, i, (i+4), "0")
    // update number
  //  console.log(str)
    const num = parseInt(str.substring((i+2), (i+3)))
    const totNum = num1 + num
    const int2str = "" + totNum + "],"
    str = replaceStr(str, (i+2), (i+2), int2str)
//    console.log(num + "replace left: " + str)
  }
  let rightNumber = str.substring((i+6), (i+7))
  if (isNumeric(rightNumber)) {

  } else {
    const num1 = parseInt(str.substring((i+1), (i+2)))
    const num = parseInt(str.substring((i-2), (i-1)))
    str = replaceStr(str, i, (i+4), "0")
    // update number
    console.log("rr: " + str)
    const totNum = num1 + num
    console.log(num1 + " " + num)
    const int2str = "" + totNum + "],"
    str = replaceStr(str, (i-2), (i-2), int2str)
    console.log("replace right: " + str)
  }
  console.log(leftNumber + " expl: " + input + " right: " + rightNumber)
}

function replaceStr(str, startIndex, finIndex, replacement) {
  console.log("replacing: " + str)
  return str.substr(0, startIndex) + replacement + str.substr(finIndex + replacement.length);
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function magnitude(str) {
  const parethesis = /(?<=\[)[^\]\[\r\n]*(?=\])/gm
  const patternMatch = str.match(parethesis)
  for (let i=0; i<patternMatch.length; i++) {
    const nums = patternMatch[i].split`,`.map(x=>+x)
    const replacable = "[" + patternMatch[i] + "]"
    // count value and replace 
    const value = nums[0]*3 + nums[1]*2
    str = str.replace(replacable, value)
  }
  return str
}
