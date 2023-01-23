import React from 'react'

import './Cell.css'

class Cell extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cell">
                <h4>Chat with {this.props.name}</h4>
                <input type='text' ref={this.props.ref1}></input>
                <button>SEND</button>
            </div>
        )
    }

}

export default Cell
