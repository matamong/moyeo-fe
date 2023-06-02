import React, { useEffect } from 'react';

const CallbackComponent = () => {
  useEffect(() => {
    const handleCallback = async () => {
      // Extract the authorization code from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      // Send the authorization code to the backend
      const response = await fetch('/api/google/callback?code=' + code);
      const data = await response.json();

      // Handle the JSON response from the backend
      const { access_token, refresh_token } = data;
      // Store the tokens in your frontend (e.g., in local storage, state management, etc.)

      // Redirect the user to a desired route in your app
      // e.g., using react-router-dom
      // history.push('/dashboard');
    };

    handleCallback();
  }, []);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default CallbackComponent;
