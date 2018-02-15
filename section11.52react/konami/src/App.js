import React, { Component } from 'react';
import Konami from './components/Konami';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activated: false,
      name: ''
    };
    this.toggleActivation = this.toggleActivation.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  toggleActivation() {
    if (this.state.activated === true) {
      this.setState({activated: false});
    } else {
      this.setState({activated: true});
    }
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Konami Time {this.state.name}</h1>
        </header>

        Enter name: <br/>
        <input type="text" onChange={this.changeName} /><br/>

        <button onClick={this.toggleActivation}>Toggle Konami Code</button>
        {this.state.activated ? <Konami name={this.state.name} /> : <div>Konami Code: Deactivated</div> }
      </div>
    );
  }
}

export default App;
