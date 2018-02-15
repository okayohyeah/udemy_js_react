import React, { Component } from 'react';
import 'milligram';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

class App extends Component {
  constructor() {
    super();
    this.change = this.change.bind(this);
  }
  change() {
    console.log('changed!');
  }

  render() {
    return (
      <div className="App container">
        <h1>Mark It Down</h1>
        <h3>Your friendly Markdown Editor</h3>
        <div className="row">  
          <Sidebar />
          <Editor change={this.change} />
        </div>
      </div>
    );
  }
}

export default App;
