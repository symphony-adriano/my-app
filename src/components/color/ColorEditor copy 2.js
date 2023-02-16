import React from 'react'
import { Editor, EditorState, Modifier, RichUtils, convertToRaw, CompositeDecorator, convertFromRaw } from 'draft-js'

import { ColorControls as MyControls } from './Color';


function getDecoratedStyle(mutability) {
  switch (mutability) {
    case 'IMMUTABLE': return styles.immutable;
    case 'MUTABLE': return styles.mutable;
    case 'SEGMENTED': return styles.segmented;
    default: return null;
  }
}

const rawContent = {
  blocks: [
    {
      text: ('STOCAZZO'),
      type: 'LINK',
      entityRanges: [{ offset: 0, length: 8, key: 'first' }],
    },
    {
      text: ' blah ',
      type: 'unstyled',
    },
    {
      text: (
        'FUCK'
      ),
      type: 'LINK',
      entityRanges: [{ offset: 15, length: 4, key: 'second' }],
    },
  ],

  entityMap: {
    first: {
      type: 'TOKEN',
      mutability: 'IMMUTABLE',
    },
    second: {
      type: 'TOKEN',
      mutability: 'MUTABLE',
    },
    third: {
      type: 'TOKEN',
      mutability: 'SEGMENTED',
    },
  },
}

function getEntityStrategy(mutability) {
  return function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        if (entityKey === null) {
          return false;
        }
        return contentState.getEntity(entityKey).getMutability() === mutability;
      },
      callback
    );
  };
}

const TokenSpan = (props) => {
  const style = getDecoratedStyle(
    props.contentState.getEntity(props.entityKey).getMutability()
  );
  return (
    <span data-offset-key={props.offsetkey} style={style}>
      {props.children}
    </span>
  );
};

export class ColorfulEditorExample extends React.Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy('IMMUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('SEGMENTED'),
        component: TokenSpan,
      },
    ]);

    const blocks = convertFromRaw(rawContent);
    this.state = { editorState: EditorState.createWithContent(blocks, decorator), };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
  }

  applyColor = (toggledColor) => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const currentInlineStyles = editorState.getCurrentInlineStyle();

    let nextEditorState = this.removeAllActiveColors(editorState)

    // Unset style override for current color.
    const unsetStyleOverride = (state, color) =>
      RichUtils.toggleInlineStyle(state, color)

    if (selection.isCollapsed()) {
      nextEditorState = currentInlineStyles.reduce(unsetStyleOverride, nextEditorState)
    }

    // Apply selected color
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      toggledColor
    )

    this.onChange(nextEditorState)
  }

  onAutomatic = () => {
    const { editorState } = this.state
    const selection = editorState.getSelection()

    let nextEditorState = this.removeAllActiveColors(editorState)

    const currentColor = this.getCurrentColor(editorState)

    // Remove current color
    if (selection.isCollapsed() && currentColor) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        currentColor
      );
    }

    this.onChange(nextEditorState)
  }

  removeAllActiveColors = (editorState) => {
    const removeAllActiveColors = (contentState, color) =>
      Modifier.removeInlineStyle(contentState, editorState.getSelection(), color)

    const nextContentState = Object.keys(colorStyleMap)
      .reduce(removeAllActiveColors, editorState.getCurrentContent())

    return EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    )
  }

  getCurrentColor = (editorState) => {
    const currentInlineStyles = editorState.getCurrentInlineStyle();
    return currentInlineStyles.filter((style) => Object.keys(colorStyleMap).includes(style)).first()
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
              onToggle={this.applyColor}
              onAuto={this.onAutomatic}
            />
            <br />
            <ColorControls
              editorState={editorState}
              onToggle={this.applyColor}
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
