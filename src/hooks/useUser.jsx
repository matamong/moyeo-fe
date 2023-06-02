import React from 'react';
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

// util
const getTokenFromCookie = () => {
    const cookie = document.cookie;
    const token = cookie
      .split(';')
      .map((item) => item.trim())
      .find((item) => item.startsWith('token='));
  
    if (token) {
      return token.split('=')[1];
    } else {
        console.log('There is no token in Cookie. :(')
    }
  
    return null;
  };

export const useUser = () => {
    const token = getTokenFromCookie();
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery(
        ['user', token],
        async () => {
            if (!token) {
                return null;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/v1/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch user data');
            }
        },
        {
            enabled: !token,
        }
    );

    React.useEffect(() => {
        queryClient.setQueryData('token', token);
      }, [queryClient, token]);

    return { user, isLoading, isError };
};