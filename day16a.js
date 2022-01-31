// Advent of Code 2021
// Day 16.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const bin = hex2bin(pin)
const version = parseInt(bin.substring(0, 3), 2)
const id = parseInt(bin.substring(3, 6), 2)
let literalValue = false
if (id == 4) { literalValue = true }

let result = 0
if (literalValue) {
  result = countLiteralValue(bin)
} else {
  result = countOperator(bin)
}
console.log("result: " + result)

function countOperator(bin) {
  const lengthTypeID = parseInt(bin.substring(4, 5), 2)
  if (lengthTypeID == 0) {
    const TLiB =  parseInt(bin.substring(5, 20), 2) 
    console.log(TLiB + "#" + bin.substring(5, 20))
  } else {
    const TLiB = parseInt(bin.substring(7, 18), 2)
    console.log(TLiB + "+" + bin.substring(7, 18))
    for (let i=0; i<TLiB; i+=11) {
      
    }
  }
}

function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function countLiteralValue() {
    // add leading zeros if needed
    let binRest = bin.substring(6, bin.length)
//    console.log("adeed: " + binRest)
  /*
    if (binRest.length % 4) {
      console.log("not 4")
      for (let i=0; i<4; i++) {
        binRest = "0" + binRest
        if (binRest.length % 4 == 0) { break }
      }
    }
    */
  //  console.log(binRest.length/5 + " added: " + binRest)
    let bits = []
    for (let i=0; i<(binRest.length/5); i++) {
      bits[i] = binRest.substring((5*i+1), ((5*i)+5))
    }
    //console.log(bits)
    let finalBin = ""
    for (i=0; i<bits.length; i++) {
      if (bits[i].length == 4) {
        finalBin += bits[i]
      }
    }  
    return (parseInt(finalBin, 2))  
}