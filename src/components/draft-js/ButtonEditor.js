import { Editor, EditorState, RichUtils } from 'draft-js'
import { useState } from 'react'

const ButtonEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onChange = editorState => setEditorState(editorState)

    const onBoldClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    return (
        <div>
            <button onClick={onBoldClick}>Bold</button>
            <Editor editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={onChange} />
        </div>
    )
}

export default ButtonEditor
