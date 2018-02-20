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

const pieceX = (playerPiece) => {
  return playerPiece === 'X';
}

const pieceO = (playerPiece) => {
  return playerPiece === 'O';
}

const horizontalWin = () => {
  if (board[0].every(pieceX) || board[1].every(pieceX) || board[2].every(pieceX)) {
    return true;
  } else if (board[0].every(pieceO) || board[1].every(pieceO) || board[2].every(pieceO)){
    return true;
  }
}


const verticalWin = () => {
  if (board[0][0] === board[1][0] && board[0][0] === board[2][0]) {
    return true;
  } else if (board[0][1] === board[1][1] && board[0][1] === board[2][1]) {
    return true;
  } else if (board[0][2] === board[1][2] && board[0][2] === board[2][2]) {
    return true;
  }
}

const diagonalWin = () => {
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return true;
  } else if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return true;
  }
}

const checkForWin = () => {
  if (horizontalWin()) {
    console.log('horizontal win');
    startNewGame();
    return true;
  } else if (verticalWin()) {
    console.log('vertical win')
    startNewGame();
    return true;
  } else if (diagonalWin()){
    console.log('diagonal win')
    startNewGame();
    return true;
  }
}

const startNewGame = () => {
  console.log('NEW GAME');
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
}

const switchPlayers = () => {
  if (playerTurn = 'X') {
    playerTurn = 'O'
  } else {
    playerTurn = 'X'
  }
}

const ticTacToe = (row, column) => {
  if(board[row][column] === ' '){
    board[row].splice(column, 1, playerTurn)
    switchPlayers();
    return board
  }
  checkForWin();
}

const getPrompt = () => {
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
