import { CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js'
import { getSelectionText, getSelectionEntity } from 'draftjs-utils'
import { useEffect, useRef, useState } from 'react'
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
  const [isWriting, setIsWriting] = useState(false) // should not overwrite what the user typed
  const [urlValue, setUrlValue] = useState('')

  const inputRef = useRef(null)

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
    setIsWriting(false)
  }

  const getSelectedText = () => {
    const selectedText = getSelectionText(editorState)
    setUrlValue(selectedText)
  }

  const getTarget = () => {
    const contentState = editorState.getCurrentContent()
    const entityKey = getSelectionEntity(editorState)

    if (entityKey && contentState) {
      const entity = contentState.getEntity(entityKey)

      if (entity.get('type') === 'LINK') {
        const target = entity.get('data').url
        console.log(target)
        return target
      }
    }
    return ''
  }

  const onUrlChange = (event) => setUrlValue(event.target.value)

  const hasFocus = (ref) =>
    document.activeElement === ref.current;

  const shouldSetTarget = () => !isWriting && !hasFocus(inputRef)

  useEffect(() => {
    if (shouldSetTarget()) {
      setUrlValue(getTarget())
    }
  })

  return (
    <div style={styles.root}>
      <input
        ref={inputRef}
        onClick={() => setIsWriting(true)}
        onBlur={() => urlValue === '' &&  setIsWriting(false)}
        onChange={onUrlChange}
        type="text"
        value={urlValue}
      />
      {isWriting && <p>Is writing!</p>}
      <button onClick={confirmUrlChange}>Add Link</button>
      <button onClick={getSelectedText}>Get Selected Text</button>
      <button onClick={getTarget}>Get Entity</button>
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
