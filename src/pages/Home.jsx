import React, { useEffect, useState } from 'react';
import GuestMain from './Main/GuestMain';
import UserMain from './Main/UserMain';

const Home = () => {
  
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      setAuthUser(authUser);
    }
  }, []);

  return (
    <div className="home__container">
      {authUser ? <UserMain authUser={authUser} /> : <GuestMain />}
    </div>
  )
}

export default Home;
