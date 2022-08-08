import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { NavBar } from './app/NavBar';

import { PostList } from './features/posts/PostList';
import { AddPostForm } from './features/posts/AddPostForm';

import './App.css';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';

const App = () =>
  <BrowserRouter>
    <NavBar />
    <div className='App'>
      <Routes>
        <Route
          exact
          path="/posts"
          element={
            <React.Fragment>
              {/* <AddPostForm /> */}
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

export default App;
