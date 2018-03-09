import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        playerTurn: 'X',
        moves: 0,
        board: [
          [null, null, null],
          [null, null, null],
          [null, null, null]],
    }
  }

  handlePlayerMove = () => {
    console.log('pooooo')
  }

  render() {
    return (
      <div>
        {this.state.board.map((row) => {
          return <div className = "square">poo</div>
        })}

      </div>
    );
  }
}

export default App;
