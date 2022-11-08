import { convertToRaw } from "draft-js"

export const DraftJsLogger = ({ editorState }) => {

    const logState = () => {
      const currentContent = editorState.getCurrentContent()
      const rawContent = convertToRaw(currentContent)
      console.log(JSON.stringify(rawContent, null, 2))
    }
  
    const logSelection = () => {
      const selection = editorState.getSelection()
      console.log(JSON.stringify(selection, null, 2))
    }
  
    return (
      <>
        <button onClick={logState} style={{ marginRight: 10 }}>LOG STATE</button>
        <button onClick={logSelection}>LOG SELECTION</button>
      </>
    )
  }