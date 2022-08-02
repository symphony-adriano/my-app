import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { NavBar } from './app/NavBar';

import { PostList } from './features/posts/PostList';

import './App.css';

const App = () =>
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<PostList />} />
    </Routes>
  </BrowserRouter>

export default App;
