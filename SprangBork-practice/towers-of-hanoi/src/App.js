import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    stacks: {
      A: [4, 3, 2, 1],
      B: [],
      C: [],
    },
    startStack: null,
    error: ''
  }

  renderRings(letter){
    const stack = this.state.stacks[letter]
    return stack.map((ringStack, k) => {
      return <p key = {k}>{ringStack}</p>
    })
  }

  isValidMove = (endStackLetter) => {
    const endStack = this.state.stacks[endStackLetter];
    if(endStack.length){
      const startStack = this.state.stacks[this.state.startStack]
      const startStackLastItem = startStack[startStack.length - 1]
      const endStackLastItem = endStack[endStack.length - 1];
      return startStackLastItem < endStackLastItem
    }
    return !endStack.length
  }

  handleUserClick = (stack) => {
    console.log("hereee", stack)
    if(!this.state.startStack){
      this.setState({startStack: stack})
    } else {
        if (this.isValidMove(stack)){
          const endStackLetter = stack;
          const newStartStack = [...this.state.stacks[this.state.startStack]]
          const poppedPiece = newStartStack.pop();
          const newEndStack = [...this.state.stacks[endStackLetter]]
          newEndStack.push(poppedPiece)
          const newStacks = this.state.stacks;
          newStacks[this.state.startStack] = newStartStack
          newStacks[endStackLetter] = newEndStack
          this.setState({stacks: newStacks, error: '', startStack: null})
        } else {
          this.setState({error: 'illegal move', startStack: null})
        }
    }
  }

  renderStacks = () => {
    const stackStyle = {margin: 40}
    return Object.keys(this.state.stacks).map((stack, index) => {
      return (
        <div key = {index} style = {stackStyle} onClick = {() => this.handleUserClick(stack)}>
          Stack {stack}
          {this.renderRings(stack)}
        </div>
      )
    })
  }

  render() {

    return (
      <div className="App" style = {{display: 'flex'}}>
        {this.renderStacks()}
        <div>
          {this.state.error}
        </div>
      </div>
    );
  }
}

export default App;
