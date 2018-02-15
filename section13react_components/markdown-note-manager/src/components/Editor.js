import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor'

class Editor extends Component {
  render() {
    return (
      <div className="editor column column-75">
        <SimpleMDE
          onChange={this.props.change}
          value="Hi! Let's start writing."
          options={{
            autofocus: true,
            autosave: {
              enabled: true,
              uniqueID: 'md1&edit!n0w',
              delay: 2000
            },
            indentWithTabs: true,
            lineWrapping: true,
            spellChecker: true
          }} 

        />
      </div>
    );
  }
}

export default Editor;