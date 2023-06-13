import React from "react";
import { usePartySchedule } from '../hooks/useParty';
import { Link } from 'react-router-dom';


const VoteScheduleList = ({ partyId, isManager }) => {
    const { data: scheduleData, isLoading, isError } = usePartySchedule(partyId);

    
    if (isLoading) {
        return <div>Loading schedule information...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching schedule information.</div>;
    }

    if (!scheduleData || scheduleData.length === 0) {
        if (isManager) {
            return (
                <div>
                    <p>No schedule available.</p>
                    <Link to={`/vote-schedule-form/${partyId}`}>Create Schedule</Link>
                </div>
            );
        } else {
            return <div>No schedule available.</div>;
        }
    }

    return (
        <div>
            {scheduleData.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <h4>{item.desc}</h4>
                </div>
            ))}
        </div>
    );
};

export default VoteScheduleList;