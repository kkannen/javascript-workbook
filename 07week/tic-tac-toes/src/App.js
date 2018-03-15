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

  horizontalWin = () => {
    return this.state.board.some((rowArr) => rowArr.every((square) => square === this.state.playerTurn))
  }

  verticalWin = () => {
    return (
      this.state.board.every((rowArr) => rowArr[0] === this.state.playerTurn) ||
      this.state.board.every((rowArr) => rowArr[1] === this.state.playerTurn) ||
      this.state.board.every((rowArr) => rowArr[2] === this.state.playerTurn)
    )
  }

  diagonalWin = () => {
    return (
      (this.state.board.every((rowArr, index) => rowArr[rowArr[index]] === this.state.playerTurn)) ||
      (this.state.board[0][2] === this.state.playerTurn && this.state.board[1][1] === this.state.playerTurn && this.state.board[2][0] === this.state.playerTurn)
    )
  }

  gameEnd = () => {
    if (this.horizontalWin() || this.verticalWin() || this.diagonalWin()){
      this.setState({winState: true, winMessage: `Call your mom, player ${this.state.playerTurn} because you won.`})
    } else if (this.state.moves === 8) {
      this.setState({winState: true, winMessage: `You tied, losers.`})
    }
  }

  handlePlayerClick = (row, column) => {
    if (!this.state.board[row][column] && !this.state.winState) {
      const piece = this.state.playerTurn
      const newBoard = this.state.board
      newBoard[row][column] = piece
      this.setState({board: newBoard, moves: this.state.moves + 1 })
      this.gameEnd()
      this.setState({playerTurn: piece === 'X' ? 'O' : 'X'})
    }
  }

  handleResetBoard = () => {
    this.setState({board: [[null, null, null], [null, null, null], [null, null, null]], moves: 0, winState: false, winMessage: ''})
  }

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
