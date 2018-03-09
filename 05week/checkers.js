'use strict';

/*
code plan
-----------------
RULES:
pieces in every other square all pieces of each color as far to one side as possible
can move one piece at a time, one squre at a time
can jump over pieces on other team if they are in front of you and there is an empty square on other side
HOW TO WIN:
if you skip a checker, lose a point?
whoever has the most points when moves can no longer be made wins
move piece function
  check for legal moves before allowing moves
  if a player has legal moves, game continues,
  if no legal moves for player, end game and count taken checkers
  legal function
    --is a diagonal space empty?
      --yes => move
      --no => skip
        --yes => move
        --no = > game over
MAKING PEICES:
start 3 rows of 4 pieces per team two empty rows in middle
two different color pieces -- red and black--push symbol into array
array.length cannot be > 1
every other square cannot be played into--light--must move diagonally
cannot move backward
  --make board print pieces
[][x][][x][][x][][x]
[x][][x][][x][][x][]
[][x][][x][][x][][x]
[ ][][ ][][ ][][ ][]
[][ ][][ ][][ ][][ ]
[][o][][o][][o][][o]
[o][][o][][o][][o][]
[][o][][o][][o][][o]

NOTES FROM CLASS
prompt start, finsih === row and column in a string 'rowcolumn' '41' ===[4][1] --split string or access string at 0 and at 1
how to move -- move diagonally and forward and only to open space
  check valid input and move(splice and push)
need to track turns if move happens, change players
skipping over piece moves it off the Board
*/

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
    } else {
      this.symbol = 'B'
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
    // creates grid/gameboard adds numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      const rowOfCheckers = [row];
      for (let column = 0; column < 8; column++) {
        if (this.grid[row][column]) {
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          rowOfCheckers.push(' ');
        }
      }
      string += rowOfCheckers.join(' ');
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
  pickChecker(row, column) {//picks checker to play
    return this.grid[row][column];
  }
  jumpChecker(jumpedRow , jumpedColumn){/*removes piece from checkers array, removes jumped checker from the board*/
    this.checkers.pop();
    return this.grid[jumpedRow][jumpedColumn] = null;
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
    const checker = this.board.pickChecker(start[0], start[1]);
    const endSpace = this.board.grid[end[0]][end[1]];

    if (checker) {
      if (endSpace) {

        console.log('there is already a piece there');
      }
      else if(endSpace === null) {
        if (start[0] - end[0] === 2 || start[0] - end[0] === - 2) {
          if(checker.symbol === 'R') {
            const jumpedRow = end[0] - 1;
            const jumpedColumn = end[1] - 1;
            this.board.jumpChecker(jumpedRow, jumpedColumn)
          }
          if(checker.symbol === 'B') {
            const jumpedRow = start[0] - 1;
            const jumpedColumn = end[1] - 1;
            this.board.jumpChecker(jumpedRow , jumpedColumn)
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
