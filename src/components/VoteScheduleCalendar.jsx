import React from "react";
import { usePartySchedule } from '../hooks/useParty';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const VoteScheduleCalendar = ({ partyId }) => {
    const { data: scheduleData, isLoading, isError } = usePartySchedule(partyId);

    if (isLoading) {
        return <div>Loading schedule information...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching schedule information.</div>;
    }

    const calendarSchedules = [];

    scheduleData.forEach((schedule) => {
        const periods = schedule.periods;

        if (periods && periods.start_datetime && periods.end_datetime) {
            const startDatetime = periods.start_datetime;
            const endDatetime = periods.end_datetime;

            for (let i = 0; i < startDatetime.length; i++) {
                const start = new Date(startDatetime[i]);
                const end = new Date(endDatetime[i]);

                calendarSchedules.push({
                    id: `${schedule.id}_${i}`,
                    calendarId: '0',
                    title: schedule.title,
                    category: 'time',
                    start,
                    end,
                });
            }
        }
    });

    console.log(calendarSchedules)

    // const calendarSchedules = scheduleData.map((schedule) => ({
    //     id: schedule.id,
    //     calendarId: '0',
    //     title: schedule.name,
    //     category: 'time',
    //     start: schedule.date, // Assuming the schedule date is available in the `date` field
    //     end: schedule.date, // Assuming the schedule date is available in the `date` field
    // }));

    return (
        <div>
            <Calendar
                calendars={[
                    {
                        id: '0',
                        name: 'Schedule Calendar',
                        bgColor: '#9e5fff',
                        borderColor: '#9e5fff',
                    },
                ]}
                view="month"
                isReadOnly={true}
                taskView={false}
                scheduleView={['time']}
                schedules={calendarSchedules}
                usageStatistics={false}
            />
        </div>
    );
};

export default VoteScheduleCalendar;