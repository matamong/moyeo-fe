import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import './App.css';


function App() {
  return (
   <BrowserRouter> 
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
