import React, { useRef, useState } from 'react'
import {
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';

import decorator from '../decorator';
import styles from '../style';

const LinkEditorExample = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator))
  const [showURLInput, setShowURLInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')

  const editorRef = useRef(null)
  const urlRef = useRef(null)

  const editorFocus = () => editorRef.current?.focus()
  const urlFocus = () => urlRef.current?.focus()

  const onChange = editorState => setEditorState(editorState)
  const logState = () => {
    const content = editorState.getCurrentContent();
    console.log(convertToRaw(content));
  }
  const onURLChange = event => setUrlValue(event.target.value)

  const promptForLink = (e) => {
    e.preventDefault();
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

      setShowURLInput(true)
      setUrlValue(url)
      urlFocus()
    }
  }

  const confirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ))
    setShowURLInput(false)
    setUrlValue('')
    editorFocus()
  }

  const onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      confirmLink(e);
    }
  }

  const removeLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null))
    }
  }

  const render = () => {
    let urlInput;
    if (showURLInput) {
      urlInput =
        <div style={styles.urlInputContainer}>
          <input
            onChange={onURLChange}
            ref={urlRef}
            style={styles.urlInput}
            type="text"
            value={urlValue}
            onKeyDown={onLinkInputKeyDown}
          />
          <button onMouseDown={confirmLink}>
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
            onMouseDown={promptForLink}
            style={{ marginRight: 10 }}>
            Add Link
          </button>
          <button onMouseDown={removeLink}>
            Remove Link
          </button>
        </div>
        {urlInput}
        <div style={styles.editor} onClick={editorFocus}>
          <Editor
            editorState={editorState}
            onChange={onChange}
            placeholder="Enter some text..."
            ref={editorRef}
          />
        </div>
        <input
          onClick={logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    );
  }

  return render()
}




export default LinkEditorExample
