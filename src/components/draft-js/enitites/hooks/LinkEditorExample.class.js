import {
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import React, { createRef } from 'react'

import decorator from './decorator';
import styles from './style';

class LinkEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showURLInput: false,
      urlValue: '',
    };

    this.editorRef = createRef();
    this.urlRef = createRef();

    this.focus = () => this.editorRef.current.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };

    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
  }

  promptForLink = (e) => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState({
        showURLInput: true,
        urlValue: url,
      }, () => {
        setTimeout(() => this.urlRef.current.focus(), 0);
      });
    }
  }

  confirmLink = (e) => {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.editorRef.current.focus(), 0);
    });
  }

  onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  }

  removeLink = (e) => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref={this.urlRef}
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onMouseDown={this.confirmLink}>
            Confirm
          </button>
        </div>;
    }

    return (
      <div style={styles.root}>
        <div style={{ marginBottom: 10 }}>
          Select some text, then use the buttons to add or remove links
          on the selected text.
        </div>
        <div style={styles.buttons}>
          <button
            onMouseDown={this.promptForLink}
            style={{ marginRight: 10 }}>
            Add Link
          </button>
          <button onMouseDown={this.removeLink}>
            Remove Link
          </button>
        </div>
        {urlInput}
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Enter some text..."
            ref={this.editorRef}
          />
        </div>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}

export default LinkEditorExample
