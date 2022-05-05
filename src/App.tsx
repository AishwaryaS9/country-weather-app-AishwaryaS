import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Country from './pages/Country/Country';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/:countryName' element={<Country />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
