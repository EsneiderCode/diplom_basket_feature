import React from 'react';
import {Routes, Route} from 'react-router-dom';

//Pages
import Login from './assets/Pages/Login';
import SignUp from './assets/Pages/SignUp';
import PageNotFound from './assets/Pages/404';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/'  element={<Login/>} />
          <Route path='/sign-up'  element={<SignUp/>} />
          <Route path='*'  element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
