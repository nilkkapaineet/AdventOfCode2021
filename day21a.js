// Advent of Code 2021
// Day 21.1
const fs = require('fs')
let pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
pin = pin.split("\n")
const p1 = pin[0].match(/\d/gm)
const p2 = pin[1].match(/\d/gm)

let Player = function(pos) {
  this.score = 0;
  this.position = pos
}
Player.prototype.move = function(steps) {
  this.position = (this.position + steps) % 10
  if (this.position == 0) {this.position = 10}
  this.score += this.position
}

let dice = {
  number: 1,
  roll: function() {
    const tempNumber = this.number
    if (this.number < 100) {
      this.number++
    } else { 
      this.number = 1
    }
    return tempNumber
  }
}

let player1 = new Player(parseInt(p1[1], 10))
let player2 = new Player(parseInt(p2[1], 10))

let rounds = 0
let playerInTurn = 1

while (player1.score < 1000 && player2.score < 1000) {
  rounds++
  // roll three times
  let sum = dice.roll() + dice.roll() + dice.roll()
  if (playerInTurn == 1) {
    player1.move(sum)    
    playerInTurn = 2
  } else {
    player2.move(sum)
    playerInTurn = 1
  }
}

console.log("p1: " + player1.score + " p2: " + player2.score + " rolls: " + rounds*3)
if (playerInTurn == 1) {
  console.log(player1.score * rounds * 3)
} else {
  console.log((player2.score * rounds * 3))
}
