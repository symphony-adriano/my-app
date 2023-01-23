import React from "react"

class Hello extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <p>Helio, {this.props.name || 'stranger'}!</p>
    }
}

export default Hello
