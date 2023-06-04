import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';

export const useAuthUser = () => {
    const authUser = useAuthStore.getState().authUser();

    useEffect(() => {
        // Subscribe to changes in the authUser value
        const unsubscribe = useAuthStore.subscribe(
            (newState) => {
                // Update the component state with the new value if needed,}
            }
        )

        return () => {
            // Unsubscribe from the store when the component unmounts
            unsubscribe();
        };
    }, []);

    return authUser;
}

// export const useUser = () => {
//     const { data: user, isLoading, isError } = useQuery(
//         ['user'],
//         async () => {

//             try {
//                 const response = await axios.get('http://localhost:8000/api/v1/users/me', );
//                 return response.data;
//             } catch (error) {
//                 throw new Error('Failed to fetch user data');
//             }
//         },
//     );

//     return { user, isLoading, isError };
// };