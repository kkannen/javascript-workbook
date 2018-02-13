'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
CODE PLAN
------------------------
This game should
  --place a piece every turn -- either X or O
    --splice(column, row, playerTurn)
  --should alternate pieces between turns
    playerTurn = "o"
  --should check for different types of wins
    --diagonalWin
    EXAMPLE
    board = [
      ['X', ' ', ' '],
      [' ', 'X', ' '],
      [' ', ' ', 'X']
    ];
    or
    --board[0][0] && board[0][1] && [board[0][2]] are all the same

    --horizontalWin
    EXAMPLE
    board = [
      ['X', 'X', 'X'],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    if board[].every() === x or o

    --verticalWin
    EXAMPLE
    board = [
      ['X', ' ', ' '],
      ['X', ' ', ' '],
      ['X', ' ', ' ']
    ];

    if board[0][0] === board[0][1] === board[0][2] or
    board[1][0] === board[1][1] === board[1][2] or
    board[2][0] === board[2][1] === board[2][2]

*/


let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
  // Your code here
}

function verticalWin() {
  // Your code here
}

function diagonalWin() {
  // Your code here
}

function checkForWin() {
  // Your code here
}

function ticTacToe(row, column) {
  // Your code here
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
