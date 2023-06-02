import { useMutation, useQuery } from 'react-query';
import AuthStore from '../stores/AuthStore';
import api from '../api/authApi';


const login = async (codeResponse) => {
  const response = await api.post('/auth/google/callback', {
    code: codeResponse.code,
  });
  const authUser = response.data.user;
  AuthStore.getState().setauthUser(authUser);
  return authUser;
};

const getUserProfile = async () => {
  // const authUser = AuthStore.getState().authUser;
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch user profile')
  }
}

const logout = () => {
  AuthStore.getState().clearAuth();
}


export const useLogin = () => {
  return useMutation(login);
}

export const useUserProfile = () => {
  return useQuery('userProfile', getUserProfile, {
    enabled: !AuthStore.getState().jwt,
  });
};


export const useLogout = () => {
  return useMutation(logout);
}

