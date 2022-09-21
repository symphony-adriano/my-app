import { convertToRaw } from "draft-js"

const logState = editorState => {
    const content = editorState.getCurrentContent()
    console.log(convertToRaw(content))
}

const logSelection = editorState => {
    console.log(JSON.stringify(editorState.getSelection().toJS(), null, 4))
}

export {
    logState,
    logSelection,
}
