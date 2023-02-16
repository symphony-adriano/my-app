import React from 'react'
import Color from './components/color/Color';
import { ColorfulEditorExample } from './components/color/ColorEditor';

import LinkEditorExample from './components/draft-js/enitites/LinkEditorExample.class';
import Border from './components/renderProp/Border';
import Child from './components/renderProp/Child';

import { CommentList } from './components/share-stateful-logic/custom-hooks/before/CommentList';
import { withSubscription } from './components/share-stateful-logic/HOC/after/withSubscription';


const App = () => {

  return <ColorfulEditorExample />

}

export default App
