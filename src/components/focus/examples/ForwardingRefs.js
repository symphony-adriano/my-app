import React from 'react'

import "./styles/Container.css";

const names = [
  'Adriano',
  'Bruna',
  'Carlo',
]

const Cell = React.forwardRef((props, ref) =>
  <div className="cell">
    <h4>Chat with {props.name}</h4>
    <input type='text' ref={ref}></input>
    <button>SEND</button>
  </div>)

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.adrianoRef = React.createRef();
    this.brunaRef = React.createRef();
    this.carloRef = React.createRef();
  }

  handleListClick = (name) => {
    this.myRefs[name].focus()
  }

  names2list = () => names.map(name => (
    <div>
      <button onClick={() => this.handleListClick(name)}>
        {name}
      </button>
    </div>
  ))

  names2cell = () => names.map(name => (
    <Cell name={name} />))

  render() {
    return (
      <div>
        <h3>Container</h3>
        <div className="container">
          <div className='left-nav'>
            <p onClick={() => this.adrianoRef.current.focus()}>Adriano</p>
            <p onClick={() => this.brunaRef.current.focus()}>Bruna</p>
            <p onClick={() => this.carloRef.current.focus()}>Carlo</p>
          </div>
          <div className='cell-container'>
            <Cell name={'Adriano'} ref={this.adrianoRef} />
            <Cell name={'Bruna'} ref={this.brunaRef} />
            <Cell name={'Carlo'} ref={this.carloRef} />
          </div>
        </div>
      </div>
    )
  }
}

export default Container
