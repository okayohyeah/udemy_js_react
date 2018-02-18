import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor'

class Editor extends Component {
  render() {
    return (
      <div className="editor column column-75">
        <SimpleMDE 
          options={{
            autofocus: true,
            indentWithTabs: true,
            lineWrapping: true,
            placeholder: "Ready, get set...markdown!",
            spellChecker: true,
            toolbar: ["bold", "italic", "strikethrough", "|", "heading-1", "heading-2", "heading-3", "|", "quote", "code", "unordered-list", "ordered-list", "|", "link", "image", "|", "table", "horizontal-rule", "|", "preview", "side-by-side", "fullscreen", "|", "guide"]
          }}
          onChange={this.props.change}
        />
      </div>
    );
  }
}

export default Editor;