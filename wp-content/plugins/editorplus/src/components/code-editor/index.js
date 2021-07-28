import AceEditor from "react-ace";
import React, { Component } from "react";
import "brace/mode/css";
import "brace/mode/javascript";
import "brace/snippets/css";
import "brace/snippets/javascript";
import "brace/snippets/text";
import "brace/ext/language_tools";
import "brace/theme/monokai";

class CodeEditor extends Component {
  render() {
    return (
      <div
        style={{ height: 300 }}
        className="editor_plus-component-code-editor"
      >
        <AceEditor
          theme="monokai"
          onLoad={(editor) => {
            editor.renderer.setScrollMargin(16, 16, 16, 16);
          }}
          fontSize={12}
          showPrintMargin
          showGutter={true}
          highlightActiveLine={false}
          width="100%"
          height="100%"
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            printMargin: false,
            tabSize: 1,
          }}
          editorProps={{
            $blockScrolling: Infinity,
          }}
          {...this.props}
        />
      </div>
    );
  }
}

export default CodeEditor;
