'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  constructor(color){
    if (color === 'red'){
      this.symbol = 'R';
      this.color = 'red'
    } else {
      this.symbol = 'B'
      this.color = 'black'
    }
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  startingCheckersToBoard() {
    for (let row = 0; row < 8; row++){
      if (row === 3 || row === 4){
        continue;
      }
      for (let column = 0; column < 8; column++) {
        let color = (row < 3 ? 'red' : 'black');
        if (row % 2 === 0 && column % 2 === 1) {
          this.grid[row][column] = new Checker(color);
          this.checkers.push(new Checker(color))
        } else if (row % 2 === 1 && column % 2 === 0) {
          this.grid[row][column] = new Checker(color);
          this.checkers.push(new Checker(color))
        }
      }
    }
  }
  selectChecker(row, column) {
    return this.grid[row][column];
  }
  killChecker(killrow , killcol){
    this.checkers.pop();
    return this.grid[killrow][killcol] = null;
  }
}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.startingCheckersToBoard();
  };

  moveChecker(start, end) {
    const checker = this.board.selectChecker(start[0], start[1]);
    const endSpot = this.board.grid[end[0]][end[1]];

    if (checker) {
      if (endSpot) {

        console.log('there is already a piece there');
      }
      else if(endSpot === null) {
        if (start[0] - end[0] === 2 || start[0] - end[0] === - 2) {
          if(checker.symbol === 'R') {
            let killrow = end[0] - 1;
            let killcol = end[1] - 1;
            this.board.killChecker(killrow, killcol)
          }
          if(checker.symbol === 'B') {
            let killrow = start[0] - 1;
            let killcol = end[1] - 1;
            this.board.killChecker(killrow , killcol)
          }
        }
        this.board.grid[end[0]][end[1]] = checker;
        this.board.grid[start[0]][start[1]] = null;
      }
    } else {
      console.log('Please select a starting place with a checker')
    }
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
