import { useMutation, useQuery } from 'react-query';
import useStore from '../stores/store';
import api from '../api/api';

const login = async (codeResponse) => {
  const response = await api.post('/auth/google/callback', {
    code: codeResponse.code,
  });
  const authUser = response.data.user;
  // useAuthStore.getState().setAuthUser(authUser);
  localStorage.setItem('authUser', authUser)

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

// 서버 통신 안되면 로그아웃도 못하는거여?
const logout = async () => {
  await api.get('/auth/logout');
  
  localStorage.removeItem('authUser');
  useStore.getState().clearAuthUser();

}


export const useLogin = () => {
  return useMutation(login);
}

export const useUserProfile = () => {
  console.log('quertquery')
  return useQuery('userProfile', getUserProfile, {
    staleTime: Infinity
  });
};


export const useLogout = () => {
  return useMutation(logout);
}

