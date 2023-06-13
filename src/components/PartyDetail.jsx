import React from "react";
import { useGetMyPartyById } from '../hooks/useParty';
import VoteSchduleList from './VoteScheduleList';
import VoteScheduleCalendar from "./VoteScheduleCalendar";

const PartyDetail = ({ partyId }) => {
  const selectedParty = useGetMyPartyById(partyId);
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
        <h2>{selectedPartyData.party_user_set[0].is_manager ? `${selectedPartyData.name} 👑` : selectedPartyData.name}</h2>
        <p>{selectedPartyData.desc}</p>
      </div>
      <div>
        <h3>Schedule Calendar</h3>
        <VoteScheduleCalendar partyId={partyId} />
      </div>
      <div>
        <VoteSchduleList partyId={partyId} isManager={selectedPartyData.party_user_set[0].is_manager} />
      </div>
    </div>
  );
};

export default PartyDetail;