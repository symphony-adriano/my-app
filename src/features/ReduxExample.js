import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { NavBar } from '../app/NavBar';

import { PostList } from './posts/PostList';
import { AddPostForm } from './posts/AddPostForm';

import { SinglePostPage } from './posts/SinglePostPage';
import { EditPostForm } from './posts/EditPostForm';

const ReduxExample = () =>
  <BrowserRouter>
    <NavBar />
    <div className='App'>
      <Routes>
        <Route
          exact
          path="/posts"
          element={
            <React.Fragment>
              <PostList />
            </React.Fragment>}
        >
        </Route>
        <Route exact path="/posts/:postId" element={<SinglePostPage />} />
        <Route exact path="/posts/add" element={<AddPostForm />} />
        <Route exact path="/editPost/:postId" element={<EditPostForm />} />
        <Route exact path="/" element={<Navigate replace to="/posts" />} />
      </Routes>
    </div>
  </BrowserRouter>

export default ReduxExample