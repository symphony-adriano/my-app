import { CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js'
import { useState } from 'react'
import { logSelection, logState } from '../utils'

import { styles } from './styles'

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
    },
    callback
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
  const [urlValue, setUrlValue] = useState('')

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

  return (
    <div style={styles.root}>
      <input
        onChange={onUrlChange}
        type="text"
        value={urlValue}
      />
      <button onClick={confirmUrlChange}>Add Link</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Enter some text..." />
      <button onClick={() => logState(editorState)}>Log State</button>
      <br />
      <button onClick={() => logSelection(editorState)}>Log Selection</button>
    </div>
  )
}

export default BasicLink
