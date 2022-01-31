class Bingo {
  constructor (id) {
    this._id = id // number of a board
    this._board = [] // 5 arrays of int arrays
    this._markedBoard = []
    this.markFalse()
    this._bingoFound = false
  }

  markFalse () {
    for (let i=0; i<5; i++) {
      let initFalse = [false, false, false, false, false]
      this._markedBoard.push(initFalse)
    }
  }

  set bingoFound (bool) {
    this._bingoFound = bool
  }

  get bingoFound () {
    return this._bingoFound
  }

  sumOfunMarkedNumbers () {
    let sum = 0
    for (let i=0; i<5; i++) {
      for (let j=0; j<5; j++) {
        if (!this._markedBoard[j][i]) {
          sum += this._board[j][i]
        }
      }
    }
    return sum
  }

  get markedBoard () {
    return this._markedBoard
  }

  get id () {
    return this._id
  }

  set id (myId) {
    this._id = myId
  }

  get board () {
    return this._board
  }

  set board (myBoard) {
    // input is array of 5 strings of numbers separated by a space or spaces
    // parse arrays for board
    myBoard.forEach(element => {
      const thenums = element.match(/\d+/g)
      const toNumbers = thenums.map((i) => Number(i));
      this._board.push(toNumbers)
    })
  }

  markNumber (number) {
    // mark given number to a board
//    console.log("bingoboard" + this._id + " works: " + number)
    for (let i=0; i<5; i++) {
      for (let j=0; j<5; j++) {
        if (this._board[j][i] == number) {
          this._markedBoard[j][i] = true
          //console.log("marked: " + number)
        }
      }
    }

  }

  checkRows () {
    // returns true if bingo
    for (let i=0; i<5; i++) {
      let bingo = 0
      for (let j=0; j<5; j++) {
        if (this._markedBoard[j][i]) {
          bingo++
        }
      }
      if (bingo == 5) {
        return true
      }
    }
    return false
  }

  checkColumns () {
    // returns true if bingo
    for (let i=0; i<5; i++) {
      let bingo = 0
      for (let j=0; j<5; j++) {
        if (this._markedBoard[i][j]) {
          bingo++
        }
      }
      if (bingo == 5) {
        return true
      }
    }
    return false
  }

}

module.exports = Bingo
