import React from 'react';
import { useUserProfile, useLogout } from '../hooks/useAuth';


const UserProfile = () => {
    const userProfileQuery = useUserProfile();
    const logoutMutaion = useLogout();

    const handleLogout = async () => {
        await logoutMutaion.muteAsync();
    }
    if (userProfileQuery.isLoading) {
        return <div>Loading...</div>
    }
    
    if (userProfileQuery.isError) {
        console.log(userProfileQuery.error.message);
        return <div>Error Fetching user data.</div>
    }

    return (
        <div>
          <p>Nickname: {userProfileQuery.data.nickname}</p>
          <p>Email: {userProfileQuery.data.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
}

export default UserProfile;