import React from 'react'
import { Editor, EditorState, Modifier, RichUtils, convertToRaw } from 'draft-js'

import { ColorControls as MyControls } from './Color';

export class ColorfulEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
  }

  toggleColor = (toggledColor) => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const currentInlineStyles = editorState.getCurrentInlineStyle();

    // Let's just allow one color at a time. Turn off all active colors.

    const removeAllActiveColors = (contentState, color) =>
      Modifier.removeInlineStyle(contentState, selection, color)

    const nextContentState = Object.keys(colorStyleMap)
      .reduce(removeAllActiveColors, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    // Unset style override for current color.
    const unsetStyleOverride = (state, color) =>
      RichUtils.toggleInlineStyle(state, color)

    if (selection.isCollapsed()) {
      nextEditorState = currentInlineStyles.reduce(unsetStyleOverride, nextEditorState);
    }

    // Apply selected color
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      toggledColor
    );

    this.onChange(nextEditorState);
  }

  onAutomatic = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const currentInlineStyles = editorState.getCurrentInlineStyle();

    // Let's just allow one color at a time. Turn off all active colors.

    const removeAllActiveColors = (contentState, color) =>
      Modifier.removeInlineStyle(contentState, selection, color)

    const nextContentState = Object.keys(colorStyleMap)
      .reduce(removeAllActiveColors, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentColor = currentInlineStyles.filter((style) => Object.keys(colorStyleMap).includes(style)).first()

    if (selection.isCollapsed()) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        currentColor
      );
    }

    this.onChange(nextEditorState);
  }

  getRawEditorState = () => convertToRaw(this.state.editorState.getCurrentContent())

  render() {
    const { editorState } = this.state;
    return (
      <div style={styles.root}>
        <div className='container'>
          <div className='split right'>
            <MyControls
              editorState={editorState}
              onToggle={this.toggleColor}
              onAuto={this.onAutomatic}
            />
            <br />
            <ColorControls
              editorState={editorState}
              onToggle={this.toggleColor}
            />

            <div style={styles.editor} onClick={this.focus}>
              <Editor
                customStyleMap={colorStyleMap}
                editorState={editorState}
                onChange={this.onChange}
                placeholder="Write something colorful..."
                ref="editor"
              />
            </div>
          </div>
          <div className='split left'>
            <pre>{JSON.stringify(this.getRawEditorState(), null, 2)}</pre>
            <p>getCurrentInlineStyle:</p>
            <pre>{JSON.stringify(editorState.getCurrentInlineStyle())}</pre>
            <pre>{JSON.stringify(editorState.getSelection(), null, 2)}</pre>

          </div>

        </div>

      </div>
    );
  }
}

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let style;
    if (this.props.active) {
      style = { ...styles.styleButton, ...colorStyleMap[this.props.style] };
    } else {
      style = styles.styleButton;
    }

    return (
      <span style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

var COLORS = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Yellow', style: 'yellow' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Indigo', style: 'indigo' },
  { label: 'Violet', style: 'violet' },
];

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div style={styles.controls}>
      {COLORS.map(type =>
        <StyleButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

// This object provides the styling information for our custom color
// styles.
const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  lightgreen: {
    color: 'lightgreen',
  },
  darkgreen: {
    color: 'darkgreen',
  },
  magenta: {
    color: 'magenta',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    fontSize: 14,
    padding: 20,
    width: 600,
  },
  editor: {
    borderTop: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20,
  },
  controls: {
    fontFamily: '\'Helvetica\', sans-serif',
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
};
