import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './containers/Home';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
   <BrowserRouter> 
    <div className="App">
    <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
