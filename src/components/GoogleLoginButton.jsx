import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from 'semantic-ui-react'
import { toast } from 'react-toastify';


const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post(
        'http://localhost:8000/api/v1/auth/google/callback', {
        code: codeResponse.code,
      });

      console.log(tokens);
      toast.success('Login Successful', { autoClose: 5000 });
    },
    onError: errorResponse => {
      console.log(errorResponse);
      toast.error('An error occurred during login. Please try again.', { autoClose: 5000 });
    }, 
    onNonOAuthError: errorResponse => {
      console.log(errorResponse);
      toast.error('An error occurred during login. Please try again.', { autoClose: 5000 });
    }
  });

  return (
    <div>
      <Button onClick={() => googleLogin()}>Google Login</Button>
    </div>
  );
};

export default GoogleLoginButton;