import React from 'react';
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';


export const useUser = () => {
    const { data: user, isLoading, isError } = useQuery(
        ['user'],
        async () => {

            try {
                const response = await axios.get('http://localhost:8000/api/v1/users/me', );
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch user data');
            }
        },
    );

    return { user, isLoading, isError };
};