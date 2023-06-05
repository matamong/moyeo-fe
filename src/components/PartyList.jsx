import React from 'react';
import { useMyParties } from '../hooks/useParty';

const PartyList = () => {
    const myParties = useMyParties();

    const { data: myPartiesData, isLoading, isError } = myParties;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error!!</div>;
    }

    return (
        <div>
            <h1>내 파티 목록</h1>
            {myPartiesData.map((party) => (
                <div key={party.id}>
                    <h3>{party.name}</h3>
                </div>
            ))}
        </div>
    );
};


export default PartyList;