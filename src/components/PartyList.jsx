import React from 'react';
import { useMyParties } from '../hooks/useParty';
import { useNavigate } from 'react-router-dom';

const PartyList = () => {
    const myParties = useMyParties();
    const navigate = useNavigate();

    const { data: myPartiesData, isLoading, isError } = myParties;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error!!</div>;
    }

    const handleEditParty = (partyId) => {
        console.log(partyId)
        navigate(`/party/${partyId}/edit`);
    }

    return (
        <div>
            <h1>내 파티 목록</h1>
            {myPartiesData.map((party) => (
                <div key={party.id}>
                    <h3>{party.name}</h3>
                    <button onClick={() => handleEditParty(party.id)}>Edit</button>
                </div>
            ))}
        </div>
    );
};


export default PartyList;