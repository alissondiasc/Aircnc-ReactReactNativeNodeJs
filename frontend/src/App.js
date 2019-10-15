import React from 'react';
import logo from './assets/logo.svg'
import './App.css';

import Route from './routes'

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnc" />
      <div className="content">
      <Route />
       
       </div>
      
   </div>
  );
}

export default App;
