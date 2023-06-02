import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from '../components/GoogleLoginButton';

const GoogleLogin = () => {
    return (
        <GoogleOAuthProvider clientId="555530589114-h3qhkifssgaq80u1esh3jsml9lmemmk3.apps.googleusercontent.com">
            <GoogleLoginButton></GoogleLoginButton>
        </GoogleOAuthProvider>
    )
}

export default GoogleLogin;