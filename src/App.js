import React from 'react';
import { BrowserRouter as Router, 
  Routes,
  Route } from 'react-router-dom';
import Register from './component/Register';
import OTPVerification from './component/OTPVerification'
import SpinWheelGame from './component/SpinWheelGame';
import './App.css';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/"  element={<Register/>} />
      <Route path="/OTPVerification" element={<OTPVerification/>} />
      <Route path="/spinWheel" element={<SpinWheelGame/>} />
    </Routes>
  </Router>
  );
}

export default App;
