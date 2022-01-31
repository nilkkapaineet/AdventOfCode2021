// Advent of Code 2021
// Day 20.2
const padding = 100
const fs = require('fs')
let pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
pin = pin.split("\n")
const enhancement = pin[0]
//var str = new Array(pin[2].length+1).join("#");
for(var i = 0; i < pin.length; ++i)
    pin[i] = pin[i].replace(/(\r\n|\n|\r)/gm,"")

// remove unwanted lines and add padding
pin.shift()
pin.shift()
let tempRow = new Array(pin[2].length+1).join(".")
for (let i=0; i<padding; i++) {
  pin.unshift(tempRow)
  pin.push(tempRow)
}

let image = []
for (let i=0; (i<pin.length); i++) {
  // add padding
  let tempPadding = new Array(padding).join(".")
  pin[i] = tempPadding + pin[i] + tempPadding
  tempRow = pin[i].split("")
  image.push(tempRow)
}

for (let i=0; i<50; i++) {
  if (i%2 == 0) {
    image = enchance(image, enhancement, "#")
  } else {
    image = enchance(image, enhancement, ".")

  }
}
console.log(countLit(image))

function countLit(image) {
  let result = 0
  for (let x=0; x<image.length; x++) {
    for (let y=0; y<image[y].length; y++) {
      if (image[x][y] == "#") { result++ }
    }
  }
  return result
}

function enchance(image, enhancement, charPad) {
  let newImage = image.map( subarray => subarray.map( x => charPad ));
  // keep some padding
  for (let x=3; x<image.length-3; x++) {
    for (let y=3; y<image[y].length-3; y++) {
      let binary = image[x-1][y-1] + image[x-1][y] + image[x-1][y+1] + image[x][y-1] + image[x][y] + image[x][y+1] + image[x+1][y-1] + image[x+1][y] + image[x+1][y+1]
      binary = binary.replace(/\./g, 0)     
      binary = binary.replace(/#/g, 1)
      binary = parseInt(binary, 2)
      if (enhancement[binary] == "#") {
        newImage[x][y] = "#"
      } else {
        newImage[x][y] = "."
      }
    }
  }
  return newImage
}