import {
    getEntityRange,
    getSelectionEntity,
} from 'draftjs-utils';
import {
    convertToRaw,
} from 'draft-js';

export const getEntityText1 = editorState => {
    const entityKey = getSelectionEntity(editorState)
    const entityRange = getEntityRange(editorState, entityKey);
    return entityRange?.text;
}

export const getEntityInText = (text, entityRange) => {
    const start = entityRange.offset
    const end = entityRange.offset + entityRange.length
    return text.substring(start, end)
}

const isContained = (selection, entityRange) =>
    entityRange.offset <= selection.getFocusOffset() &&
    selection.getFocusOffset() <= entityRange.offset + entityRange.length

export const getEntityText = editorState => {
    const currentContent = editorState.getCurrentContent()
    const selection = editorState.getSelection();

    const rawContent = convertToRaw(currentContent)
    const blocks = rawContent.blocks
    const selectedBlock = blocks.find(block => block.key === selection.getFocusKey())
    const entityRanges = selectedBlock.entityRanges
    const selectedEntityRange = entityRanges.find(entityRange => isContained(selection, entityRange))

    const realEntityText = getEntityInText(selectedBlock.text, selectedEntityRange)

    console.log(realEntityText)
}

