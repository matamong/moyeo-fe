import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import PartyList from './components/PartyList';
import CreatePartyForm from './components/CreatePartyForm';
import CreateVoteScheduleForm from './components/VoteScheduleForm';
import './App.css';


const App = () => {
  return (
    <Routes>
      <Route path="/party" element={<PartyList />} />
      <Route path="/party-form" element={<CreatePartyForm />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="vote-schedule-form/:partyId" element={<CreateVoteScheduleForm />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
