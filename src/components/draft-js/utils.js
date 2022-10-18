import { convertToRaw } from "draft-js"

const logState = editorState => {
    console.log(convertToRaw(editorState.getCurrentContent()))
}

const logSelection = editorState => {
    console.log(JSON.stringify(editorState.getSelection().toJS(), null, 4))
}

export {
    logState,
    logSelection,
}
