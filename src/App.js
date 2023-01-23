import React from 'react'

// import LinkEditorExample from './components/draft-js/enitites/LinkEditorExample.class';

import { CommentList } from './components/HOC/after/CommentList';
import { withSubscription } from './components/HOC/after/withSubscription';


const App = () => {

  const CommentListWithSubscription = withSubscription(CommentList)
  
  return <CommentListWithSubscription />

}

export default App
