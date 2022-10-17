import { CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js'
import { getEntityRange, getSelectionText, getSelectionEntity } from 'draftjs-utils'
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
  const [title, setTitle] = useState('')
  const [urlValue, setUrlValue] = useState('www.google.com')
  const [target, setTarget] = useState('')
  const [text, setText] = useState('')

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

  const getTarget = () => {
    const contentState = editorState.getCurrentContent()
    const entityKey = getSelectionEntity(editorState)

    const entity = getEntity(contentState, entityKey)

    if (isLink(entity)) {
      return getUrl(entity)
    }

    return 'nada'
  }

  const getEntity = (contentState, entityKey) => contentState.getEntity(entityKey)

  const isLink = entity => entity.get('type') === 'LINK'

  const getUrl = entity => entity.get('data').url

  const getTitle = () => {
    const entityKey = getSelectionEntity(editorState)
    const entityRange = getEntityRange(editorState, entityKey)
    return entityRange?.text
  }

  const _getTitle = entityKey => {
    const entityRange = getEntityRange(editorState, entityKey)
    return entityRange?.text
  }

  const getText = () => getSelectionText(editorState)

  const superGet = () => {
    const contentState = editorState.getCurrentContent()
    const entityKey = getSelectionEntity(editorState)

    if (entityKey) {
      const entity = getEntity(contentState, entityKey)

      if (isLink(entity)) {
        const title = _getTitle(entityKey)
        const target = getUrl(entity)

        if (title === target) {
          console.log('raw link')

        } else {
          console.log('hyperlink')
        }
        return
      }
      return
    }
    console.log('raw text')
  }

  const equalsTrim = (string1, string2) => string1.trim() === string2.trim()

  return (
    <div style={styles.root}>
      <h1>TargetLink</h1>
      <p>text: {text}</p>
      <p>title: {title}</p>
      <p>target: {target}</p>
      ---
      <Editor
        className='editor'
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Enter some text..." />
      <button onClick={confirmUrlChange}>Add Link</button>
      <br />
      <button onClick={() => logState(editorState)}>Log State</button>
      <button onClick={() => logSelection(editorState)}>Log Selection</button>
      <br />
      <button onClick={() => setText(getText())}>get text</button>
      <button onClick={() => setTarget(getTarget())}>get Target</button>
      <button onClick={() => setTitle(getTitle())}>get Title</button>
      <br />
      <button onClick={superGet}>super</button>

    </div>
  )
}

export default BasicLink
