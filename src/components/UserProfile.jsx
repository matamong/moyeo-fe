import { useUserProfile, useLogout } from '../hooks/useAuth';
import React from 'react';
import useStore from '../stores/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const userProfileQuery = useUserProfile();
    const logoutMutaiton = useLogout();    
    const { authUser } = useStore();
    const navigate = useNavigate();

    console.log(authUser);


    const handleLogout = async () => {
        await logoutMutaiton.mutateAsync();
        toast.success('Logout Successful', { autoClose: 5000 });
        navigate('/');
    }


    if (userProfileQuery.isLoading) {
        return <div>Loading...</div>
    }
    
    if (userProfileQuery.isError) {
        console.log(userProfileQuery.error.message);
        return <div>Error Fetching user data.<button onClick={handleLogout}>Logout</button></div>
        
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