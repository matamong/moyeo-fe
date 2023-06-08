import React from "react";
import { useGetPartyById, usePartySchedule } from '../hooks/useParty';


const PartyDetail = ({ partyId }) => {
    const selectedParty = useGetPartyById(partyId);
    const schedule = usePartySchedule(partyId);
    const { data: selectedPartyData, isLoading, isError } = selectedParty;

  
    if (isLoading) {
      return <div>Loading party information...</div>;
    }
  
    if (isError) {
      return <div>Error occurred while fetching party information.</div>;
    }
  
    if (!selectedPartyData) {
      return <div>Loading...</div>;
    }

    console.log(selectedPartyData)
  
    return (
      <div>
        <div>
            <h2>{selectedPartyData.name}</h2>
            <p>{selectedPartyData.desc}</p>
        </div>
        <div>
        {schedule.data && schedule.data.length > 0 ? (
          schedule.data.map((schedule) => (
            <div key={schedule.id}>
              <h3>{schedule.name}</h3>
            </div>
          ))
        ) : (
          <div>스케쥴이 없어요!!!</div>
        )}
        </div>
      </div>
    );
  };
  
  export default PartyDetail;