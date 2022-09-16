import { CompositeDecorator, convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'
import { useState } from 'react'

const Link = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData()
  return (
    <a href={url} style={styles.link}>
      {children}
    </a>
  )
}

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    }
  )
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  }
])

const BasicLink = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator))
  const [urlValue, setUrlValue] = useState('www.google.com')

  const onChange = editorState => setEditorState(editorState)

  const logState = () => {
    const content = editorState.getCurrentContent();
    console.log(convertToRaw(content));
  };

  const confirmUrlChange = (event) => {
    event.preventDefault()
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
    setEditorState(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey,
    ))
    setUrlValue('')
  }

  const onUrlChange = (event) => setUrlValue(event.target.value)

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  return (
    <div style={styles.root}>
      <input
        onChange={onUrlChange}
        type="text"
        vlaue={urlValue}
      />
      <button onClick={confirmUrlChange}>Add Link</button>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        style={styles.editor} />
      <button onClick={logState}>Log State</button>
    </div>
  )
}

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};

export default BasicLink
