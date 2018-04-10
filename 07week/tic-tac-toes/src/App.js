import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playerTurn: 'X',
      winState: false,
      board: [[null, null, null],
              [null, null, null],
              [null, null, null]],
      moves: 0,
      winMessage: ''
    }
  }

//checks if one of the rows in the board has all squares containing the same value
  horizontalWin = () => {
    return this.state.board.some((rowArr) => rowArr.every((square) => square === this.state.playerTurn))
  }

//checks every row to see if there is an instance where each row at a certain index has the same value
  verticalWin = () => {
    return (
      this.state.board.every((rowArr) => rowArr[0] === this.state.playerTurn) ||
      this.state.board.every((rowArr) => rowArr[1] === this.state.playerTurn) ||
      this.state.board.every((rowArr) => rowArr[2] === this.state.playerTurn)
    )
  }

  //checks for diagonal win
  diagonalWin = () => {
    return (
      (this.state.board.every((rowArr, index) => rowArr[rowArr[index]] === this.state.playerTurn)) ||
      (this.state.board[0][2] === this.state.playerTurn && this.state.board[1][1] === this.state.playerTurn && this.state.board[2][0] === this.state.playerTurn)
    )
  }

  //checks to see if the game is over, either because of a tie or because somone won, updates message
  gameEnd = () => {
    if (this.horizontalWin() || this.verticalWin() || this.diagonalWin()){
      this.setState({winState: true, winMessage: `Call your mom, player ${this.state.playerTurn} because you won.`})
    } else if (this.state.moves === 8) {
      this.setState({winState: true, winMessage: `You tied, losers.`})
    }
  }

  //handles players' moves (aka clicks)
  //allows player to place piece if the game is not won or tied and if the square theyre trying to play is empty.
  //crates copies of board and playerTurn
  //places piece on newBoard
  //checks for win/tie
  //switches players and adds one to the move counter
  handlePlayerClick = (row, column) => {
    if (!this.state.board[row][column] && !this.state.winState) {
      const piece = this.state.playerTurn
      const newBoard = this.state.board
      newBoard[row][column] = piece
      this.setState({board: newBoard})
      this.gameEnd()
      this.setState({playerTurn: piece === 'X' ? 'O' : 'X', moves: this.state.moves + 1 })
    }
  }

  //handles click of reset button (start new game)
  //returns board to original state, sets moves back to zero, winState back to false, and wipes the win or tie message
  handleResetBoard = () => {
    this.setState({board: [[null, null, null], [null, null, null], [null, null, null]], moves: 0, winState: false, winMessage: ''})
  }

  //printst the board creates a div for each row, and inide each row, three more divs
  //each square in board contains value of the corresponding array element in this.state.newBoard
  //when this.state.board changes, the rendering of the board on the screen does too
  renderRows = () => {
    return this.state.board.map((row, k) => {
      return (
        <div key = {k} className = 'row'>
          {this.state.board[k].map((box, i) => {
            return (
            <div key = {i} className = 'box' onClick = {() => this.handlePlayerClick(k, i)}>
              {this.state.board[k][i]}
            </div>)})}
        </div>)
    })
  }

  render() {
    return (
      <div className = 'ticTac'>
        <h1>Tic-Tac-Toe</h1>
        <div>{this.renderRows()}</div>
        <button className = 'reset' onClick = {this.handleResetBoard}>START NEW GAME</button>
        <div className = 'message'>{this.state.winMessage}</div>
      </div>
    );
  }
}

export default App;
