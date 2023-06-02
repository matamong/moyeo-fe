import React from 'react';
import { toast } from 'react-toastify';
import { useLogin } from '../hooks/useAuth';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'semantic-ui-react'


const GoogleLoginButton = () => {

  const loginMutation = useLogin();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      await loginMutation.mutateAsync(codeResponse)
      console.log(codeResponse);
      toast.success('Login Successful', { autoClose: 5000 });
    },
    onError: errorResponse => {
      console.log(errorResponse);
      toast.error('An error occurred during login. Please try again.', { autoClose: 5000 });
    }, 
    onNonOAuthError: errorResponse => {
      console.log(errorResponse);
      toast.error('An error occurred during login. Please try again.', { autoClose: 5000 });

    },
    
  });


  return (
    <div>
      <Button onClick={googleLogin}>Google Login</Button>
    </div>
  );
};

export default GoogleLoginButton;