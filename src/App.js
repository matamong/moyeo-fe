import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import PartyList from './components/PartyList';
import CreatePartyForm from './components/CreatePartyForm';
//import UpdatePartyForm from './components/UpdatePartyForm';
import './App.css';


function App() {
  const UpdatePartyForm = lazy(() => import('./components/UpdatePartyForm'))
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/party" element={<PartyList />} />
          <Route path="/party/:partyId/edit" element={<UpdatePartyForm />} />
          <Route path="/party-form" element={<CreatePartyForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<Home />} />
        </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
