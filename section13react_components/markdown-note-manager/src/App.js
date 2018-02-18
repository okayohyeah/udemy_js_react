import React, { Component } from 'react';
import 'milligram';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
    this.saveNote = this.saveNote.bind(this);
  }

  saveNote(notes) {
    console.log('saved!');
    var i = 0;
    i++;
    var note_key = "note" + i;
    localStorage.setItem(note_key, notes);
    console.log(note_key, notes)
  }

  render() {
    return (
      <div className="App container">
        <h1>Mark It Down</h1>
        <h3>Your friendly Markdown Editor</h3>
        <div className="row">  
          <Sidebar  />
          <Editor change={this.saveNote} />
        </div>
      </div>
    );
  }
}

export default App;
