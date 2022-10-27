import { Modifier, CharacterMetadata, Entity, CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js'
import { useState, useRef } from 'react'
import { logSelection, logState } from '../utils'
import Immutable from 'immutable'

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

const { OrderedMap } = Immutable;

const SelectText = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator))

  const myRef = useRef(null)

  const confirmUrlChange = (event, url) => {
    event.preventDefault()
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

    setEditorState(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey,
    ))
  }

  var BlockMapBuilder = {
    createFromArray: (blocks) => OrderedMap(blocks.map(block => [block.getKey(), block]))
  };

  function applyEntityToContentBlock(contentBlock, start, end, entityKey) {
    var characterList = contentBlock.getCharacterList();
    while (start < end) {
      characterList = characterList.set(
        start,
        CharacterMetadata.applyEntity(characterList.get(start), entityKey)
      );
      start++;
    }
    return contentBlock.set('characterList', characterList);
  };

  function insertFragment(editorState, fragment) {
    let newContent = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      fragment
    );
    return EditorState.push(
      editorState,
      newContent,
      'insert-fragment'
    );
  }

  const _onChange = editorState => {
    setEditorState(editorState)
  }

  const _handlePastedText = (text, styles, editorState) => {
    const clipboard = myRef.current.getClipboard()

    // console.log(JSON.stringify(clipboard, null, 2))

    if (clipboard) {
      const clonedClipboard = cloneEntitiesInFragment(clipboard)
      _onChange(insertFragment(editorState, clonedClipboard))
      return true
    }
    else {
      return false
    }
  }

  const cloneEntitiesInFragment = (fragment) => {

    const entities = {};
    fragment.forEach(block => {
      block.getCharacterList().forEach(character => {
        const key = character.getEntity();
        if (key) {
          entities[key] = Entity.get(key);
        }
      });
    });

    // Clone each entity that was referenced and
    // build a map from old entityKeys to new ones
    const newEntityKeys = {}
    Object.keys(entities).forEach((key) => {
      const entity = entities[key];
      const newEntityKey = Entity.create(
        entity.get('type'),
        entity.get('mutability'),
        entity.get('data')
      );
      newEntityKeys[key] = newEntityKey;
    })

    // Update all the entity references
    let newFragment = BlockMapBuilder.createFromArray([]);
    fragment.forEach((block, blockKey) => {
      let updatedBlock = block;
      block.findEntityRanges(
        character => character.getEntity() !== null,
        (start, end) => {
          const entityKey = block.getEntityAt(start);
          const newEntityKey = newEntityKeys[entityKey];
          updatedBlock = applyEntityToContentBlock(updatedBlock, start, end, newEntityKey);
          newFragment = newFragment.set(blockKey, updatedBlock);
        }
      );
    });
    // console.log(JSON.stringify(newFragment, null, 2))
    return newFragment;
  }

  return (
    <div style={styles.root}>
      <h1>CLONE</h1>
      <Editor
        ref={myRef}
        editorState={editorState}
        onChange={_onChange}
        handlePastedText={_handlePastedText}
        placeholder="Enter some text..." />
      <button onClick={(event) => confirmUrlChange(event, 'http://www.google.com')}>google</button>
      <button onClick={(event) => confirmUrlChange(event, 'http://www.repubblica.com')}>Repubblica</button>
      <br />
      <button onClick={() => logState(editorState)}>Log State</button>
      <button onClick={() => logSelection(editorState)}>Log Selection</button>
    </div>
  )
}

export default SelectText
