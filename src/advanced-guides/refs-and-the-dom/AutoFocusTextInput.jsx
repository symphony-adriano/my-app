import React from 'react'
import CustomTextInput from './CustomTextInput'

class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.textInputCompRef = React.createRef()
    }
    componentDidMount() {
        this.textInputCompRef.current?.focusTextInput()
    }
    render() {
        return (
            <CustomTextInput ref={this.textInputCompRef} />
        )
    }
}

export default AutoFocusTextInput
