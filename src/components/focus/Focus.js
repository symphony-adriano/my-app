import React from "react"
import Hello from "../hello/Hello";
import './Focus.css'

class Focus extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.componentRef = React.createRef();
  }

  // componentDidMount() {
  //   console.log('onMount')
  //   this.focusTextInput()
  // }

  focusTextInput() {
    this.inputRef.current.focus()
  }

  handleFocus = () => {
    console.log('onFocus')
  }

  handleBlur = () => {
    console.log('onBlur')
  }

  checkRef = () => {
    console.log(this.componentRef)
  }

  render() {
    return (
      <div>
        <p className="error">ERROR</p>
        <button onClick={this.focusTextInput}>FOCUS</button>
        <input
          type="text"
          ref={this.inputRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur} />
        <br />
        <button onClick={this.checkRef}>Check Ref</button>
        <Hello ref={this.componentRef} name={'World'} />
      </div>
    )
  }
}

export default Focus
