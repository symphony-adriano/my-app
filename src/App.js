import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { NavBar } from './app/NavBar';

import { PostList } from './features/posts/PostList';
import { AddPostForm } from './features/posts/AddPostForm';

import './App.css';

const App = () =>
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/add" element={<AddPostForm />} />
    </Routes>
  </BrowserRouter>

export default App;
