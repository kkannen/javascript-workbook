import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
  }

  handleSubmit = () => {
    console.log(this.state.inputValue)
    const list = this.state.list;
    this.setState({list: [...this.state.list, this.state.inputValue], inputValue: ''})
    
  }

  handleClear = () => {
    this.setState({inputValue: ''})
  }

  handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({inputValue: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <input value = {this.state.inputValue} onChange = {this.handleInputChange} type = 'text'/>
        <button onClick = {this.handleSubmit}>Add to List</button>
        <button onClick = {this.handleClear}>Clear</button>
        {this.state.list.map((item, k) => {
          return <p key = {k}>{item}</p>
        })}
      </div>
    );
  }
}

export default App;
