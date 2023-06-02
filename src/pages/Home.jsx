import React from 'react';
import landingImg from '../GameduosBanner.png';
import GoogleLogin from './GoogleLogin'

const Home = () => {
    return (
      <div className="home__container">
        <div className='home__title__container'>
            <h1>Moyeo</h1>
            <GoogleLogin />
        </div>
        <div className="home__image__container">
          <img src={landingImg} alt="Moyeo" />
        </div>
      </div>
    )
}

export default Home;
