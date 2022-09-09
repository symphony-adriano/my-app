import React from 'react'

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  focusTextInput = () => {
    this.textInput.current.focus()
  }

  render = () => (
    <div>
      <input
        type="text"
        ref={this.textInput} />
      <input
        type="button"
        value="Focus on the text input"
        onClick={this.focusTextInput} />
    </div>
  )
}

export default CustomTextInput
