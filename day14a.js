// Advent of Code 2021
// Day 14.1
const steps = 40
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const input = pin.split('\n')
input.forEach(row => {
  row = row.replace(/(\r\n|\n|\r)/gm, "");
})

// first row is a starting polymer
let str = input[0]
// second row is empty and rest are the rules
let rules = readRules(input)

for (let i=0; i<steps; i++) {
  // take two letters at the time and move string from beginning to end inserting rules
  for (let j=0; j<(str.length-2); j++) {
    const two = str.substring(j, (j+2))
    for (let k=0; k<rules.length; k++) {
      if (rules[k][0] == two) {
        str = insertCharAt(str, (j+1), rules[k][1])   
        j++
        break
      }      
    }
  }  
}

str = str.replace(/(\r\n|\n|\r)/gm, "");

const greatest = mostCommonLetter(str)[0][1]
const smallest = getLowestFreq(getFrequency(str))
console.log("Quantity difference: " + (greatest - smallest))

function mostCommonLetter(str) {
  const {max, ...counts} = (str || "").split("").reduce(
    (a, c) => {
        a[c] = a[c] ? a[c] + 1 : 1;
        a.max = a.max < a[c] ? a[c] : a.max;
        return a;
    },
    { max: 0 }
    );
    return Object.entries(counts).filter(([k, v]) => v === max);
}

function getLowestFreq(freq) {
  const nums = Object.values(freq)
  return Math.min.apply(Math, nums)
}

function getFrequency(string) {
  var freq = {};
  for (var i=0; i<string.length;i++) {
      var character = string.charAt(i);
      if (freq[character]) {
         freq[character]++;
      } else {
         freq[character] = 1;
      }
  }
  return freq;
}

function readRules(input) {
  let rules = []
  for (let i=2; i<input.length; i++) {
    // first two chars are rules for letters which are inserted between to
    // last char is the one that is inserted
    // go string as pairs of two, always jump inserted char
    const rule = input[i].substring(0,2)
    const result = input[i].substring((input[i].length-2), (input[i].length-1))
  //  console.log(result + "-" + (input[i].length-1))
    rules.push([rule, result])
  }
  return rules
}

function insertCharAt(str,index,chr) {
  if(index > str.length) return str;
  return str.substring(0,index) + chr + str.substring(index);
}

