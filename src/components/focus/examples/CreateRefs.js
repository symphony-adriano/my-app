import React from 'react'
import Cell from '../Cell'

import "./styles/Container.css";

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
            <Cell name={'Adriano'} ref1={this.adrianoRef}/>
            <Cell name={'Bruna'} ref1={this.brunaRef} />
            <Cell name={'Carlo'} ref1={this.carloRef}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Container
