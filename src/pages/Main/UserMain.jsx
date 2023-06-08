import React, { useState } from 'react';
import { useMyParties, useGetPartyById } from '../../hooks/useParty';
import PartyDetail from '../../components/PartyDetail';
import { Dropdown } from 'semantic-ui-react';

const UserMain = ({ authUser }) => {
  const [selectedPartyId, setSelectedPartyId] = useState(null);
  const myParties = useMyParties();
  const { data: myPartiesData, isLoading, isError } = myParties;

  const handlePartySelection = (event, { value }) => {
    setSelectedPartyId(value);
  };

  console.log(myPartiesData)

  return (
    <div className="home__container">
      <div className='home__title__container'>
        <h1>Moyeo</h1>
      </div>
      <div className="home__image__container">
        <Dropdown
          placeholder="Select a party"
          fluid
          selection
          options={myPartiesData && myPartiesData.map(party => ({
            key: party.id,
            value: party.id,
            text: party.party_user_set && party.party_user_set[0].is_manager
              ? `${party.name} 👑`
              : party.name
          }))}
          onChange={handlePartySelection}
        />
        {selectedPartyId && (
          <PartyDetail partyId={selectedPartyId} />
        )}
      </div>
    </div>
  );
};

export default UserMain;
