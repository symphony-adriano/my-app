import { Editor, EditorState, RichUtils } from 'draft-js';
import { useState } from "react"

const MyEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onChange = editorState => setEditorState(editorState)

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    return <Editor editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={onChange} />
}

export default MyEditor
