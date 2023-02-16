import React from 'react'

import './Color.css'

const COLORS = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Yellow', style: 'yellow' },
  { label: 'Green', style: 'green' },
  { label: 'Lightgreen', style: 'lightgreen' },
  { label: 'Darkgreen', style: 'darkgreen' },
  { label: 'Blue', style: 'blue' },
  { label: 'Magenta', style: 'magenta' },
]

export const ColorControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  const onAuto = (event) => {
    event.preventDefault()
    props.onAuto()
  }
  return (
    <div className='colors'>
      {COLORS.map(color =>
        <ColorButton
          active={currentStyle.has(color.style)}
          label={color.label}
          onToggle={props.onToggle}
          style={color.style}
        />
      )}
      <button onMouseDown={onAuto}>AUTO</button>
    </div>
  )
}
class ColorButton extends React.Component {
  constructor(props) {
    super(props)
  }
  onToggle = (event) => {
    event.preventDefault()
    this.props.onToggle(this.props.style)
  }
  getClassName = () => {
    let className = 'box ' + this.props.style;
    if (this.props.active) {
      className += ' active'
    }
    return className
  }
  render() {

    return (
      <div
        className={this.getClassName()}
        onMouseDown={this.onToggle}
      />
    )
  }
}

class Color extends React.Component {
  render = () => (
    <>
      <div className='wrapper'>
        <div className='automatic'>Automatic</div>
        {/* <ColorControls /> */}
      </div>
    </>
  )
}

export default Color
