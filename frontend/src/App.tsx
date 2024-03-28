import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className='pages'>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/home" element={<Home />} />
              </Routes> 
          </div> 
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
