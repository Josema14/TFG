import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages';
function App() {

  
  return (
    /* Router Dom para moverse entre páginas*/
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" exact component={Home} />
      </Routes>
    </Router>
  )
      }

export default App;
