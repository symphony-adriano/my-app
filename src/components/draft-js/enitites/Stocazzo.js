import {
    RichUtils,
} from 'draft-js';
import React from 'react';

export class Stocazzo extends React.Component {

    constructor(props) {
        super(props);
    }

    handleStocazzo = () => {
        const selection = this.props.editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.props.setStocazzo(RichUtils.toggleLink(this.props.editorState, selection, null))
        }
    }

    render() {
        return <button onClick={this.handleStocazzo}>Remove Link</button>
    }
}

//   = (editorState, setState) => {

//     const handleStocazzo = (e) => {

//         const selection = editorState.getSelection();
//         if (!selection.isCollapsed()) {
//             setState({
//                 editorState: RichUtils.toggleLink(editorState, selection, null),
//             });
//         }

//     }

//     return <button onClick={handleStocazzo}>Remove Link</button>
// }