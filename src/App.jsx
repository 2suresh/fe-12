import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Menu from './Menu';
import ListVideos from './ListVideos';
import ViewVideo from './ViewVideo';
import StartBroadcast from './StartBroadcast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Menu />}
        />
        <Route
          path='/list'
          element={<ListVideos />}
        />
        <Route
          path='/view/:id'
          element={<ViewVideo />}
        />
        <Route
          path='/start'
          element={<StartBroadcast />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
