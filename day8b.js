// Advent of Code 2021
// Day 8.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const input = pin.split('\n')
let sumOfOutputs = 0

input.forEach(element => {
  element = element.replace(/(\r\n|\n|\r)/gm, "");
  let outputElement = element.split('|')[1].split(' ')
  outputElement.shift() // trim outputs
  const inputElement = element.split('|')[0].split(' ')
  inputElement.pop() // trim inputs
  // returns corresponding order
  const signal = figureSignal(inputElement)
  // find output from ordered signal
  const outputValue = outputSignal(signal, outputElement)
  sumOfOutputs += outputValue
})
console.log("sum of outputvalues: " + sumOfOutputs)

// ------- methods --------------------

function outputSignal(sin, ope) {
  ope = sortStrings(ope)
  let returnValue = ""
  ope.forEach(el => {
    for (let i=0; i<10; i++) {
      if (sin[i] == el) {
        returnValue = returnValue.concat(i)        
        break
      }
    } 
  })
  return parseInt(returnValue, 10)
}

function figureSignal(signalIn) {
  signalIn = signalIn.sort(function(a, b){
    return a.length - b.length;
  });
  signalIn = sortStrings(signalIn)   // sort elements by length and sort alphabetically
  const one = signalIn[0]
  const four = signalIn[2]
  const seven = signalIn[1]
  const eight = signalIn[9]
  const three = findThree(signalIn[0], signalIn[3], signalIn[4], signalIn[5])
  const six = findSix(signalIn[0], signalIn[6], signalIn[7], signalIn[8])
  const fiveAndTwo = findFiveAndTwo(signalIn[six[1]], signalIn[3], signalIn[4], signalIn[5], three)
  const nineAndZero = findNineAndZero(signalIn[2], signalIn[6], signalIn[7], signalIn[8], six)
  return [nineAndZero[2], one, fiveAndTwo[2], three[0], four, fiveAndTwo[0], six[0], seven, eight, nineAndZero[0]]
}

function findNineAndZero(four, b, c, d, six) {
  // exclude six first
  if (b == six[0]) {
    b = [c, 7, d, 8]
    c = [d, 8, c, 7]
  } else if (c == six[0]) {
    c = [d, 8, b, 6]
    b = [b, 6, d, 8]
  } else {
    let tempB = b
    b = [b, 6, c, 7]
    c = [c, 7, tempB, 6]
  }
  // if (bc) has four in common with four, it is a nine
  let common = 0
  for (let i=0; i<b[0].length; i++) {
    for (let j=0; j<four.length; j++) {
      if (four.substring(j, (j+1)) == b[0].substring(i, (i+1))) {
        common++
      }  
    }
  }
  if (common == 4) {
    return b
  } else {
    return c
  }
}

function findFiveAndTwo(six, b, c, d, three) {
  // exclude three first
  if (b == three[0]) { 
    b = [c, 4, d, 5]
    c = [d, 5, c, 4]
  } else if (c == three[0]) {
    c = [d, 5, b, 3]
    b = [b, 3, d, 5]
  } else {
    let tempB = b
    b = [b, 3, c, 4]
    c = [c, 4, tempB, 3]
  }

  // if (bcd) has all but one in common with a -> it is a five
  let common = 0
  for (let i=0; i<b[0].length; i++) {
    for (let j=0; j<six.length; j++) {
      if (six.substring(j, (j+1)) == b[0].substring(i, (i+1))) {
        common++
      }  
    }
  }
  if (common == (b[0].length)) {
    return b
  } else {
    return c
  }
}

function findSix(a, b, c, d) {
  // which (bcd) one has only one common letter with a is a six
  if (!b.includes(a.substring(0, 1)) || !b.includes(a.substring(1, 2))) {
    return [b, 6]
  } else if (!c.includes(a.substring(0, 1)) || !c.includes(a.substring(1, 2))) {
    return [c, 7]
  } else {
    return [d, 8]
  }
}

function findThree(a, b, c, d) {
  // which (bcd) one includes a (both letters) is a three
  if (b.includes(a.substring(0, 1)) && b.includes(a.substring(1, 2))) {
    return [b, 3]
  } else if (c.includes(a.substring(0, 1)) && c.includes(a.substring(1, 2))) {
    return [c, 4]
  } else {
    return [d, 5]
  }
}

function sortStrings(arrayIn) {
  for (let i=0; i<arrayIn.length; i++) {
    arrayIn[i] = arrayIn[i].split('').sort().join('')
  }
  return arrayIn
}
