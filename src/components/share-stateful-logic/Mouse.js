import React from 'react'

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src='/logo192.png'
        width='100px'
        height='100px'
        style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    )
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  render() {
    return (
      <div style={{ height: '100vh', cursor: 'none' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around</h1>
        {this.props.render(this.state)}
      </div>
    )
  }
}

export class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <Mouse render={mouse => <Cat mouse={mouse} />} />
      </div>
    )
  }
}