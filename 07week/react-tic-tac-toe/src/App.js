import React, { Component } from 'react';
import './App.css';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div data-cell="0"></div>
          <div data-cell="1"></div>
          <div data-cell="2"></div>
        </div>
        <div className="row">
          <div data-cell="3"></div>
          <div data-cell="4"></div>
          <div data-cell="5"></div>
        </div>
        <div className="row">
          <div data-cell="6"></div>
          <div data-cell="7"></div>
          <div data-cell="8"></div>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
