const editorState = {
  blocks: [
    {
      key: "2inns",
      text: "asdf qwer",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 4,
          key: 0,
        },
        {
          offset: 5,
          length: 4,
          key: 1,
        },
      ],
      data: {},
    },
  ],
  entityMap: {
    0: {
      type: "LINK",
      mutability: "MUTABLE",
      data: {
        url: "www.house-of-cards.com",
        targetOption: "_blank",
      },
    },
    1: {
      type: "LINK",
      mutability: "MUTABLE",
      data: {
        url: "www.the-crown.uk",
        targetOption: "_blank",
      },
    },
  },
};


const getTarget = (rawEditorState, blockKey, start, end) => {
  const theRightBlock = (block) => block.key === blockKey
  const theRightRange = (range) =>
    range.offset === start && range.length === start + end;

  const entityKey = rawEditorState.
    blocks.find(theRightBlock)
    .entityRanges.find(theRightRange).key;
  return rawEditorState.entityMap[entityKey].data.url
};

const start = 0;
const end = 4;
const blockKey = '2inns'

const stocazzo = getTarget(editorState, blockKey, start, end);


console.log(stocazzo)
