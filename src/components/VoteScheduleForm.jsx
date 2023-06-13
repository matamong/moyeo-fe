import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import dayjs from "dayjs";
import { useCreateVoteSchedule } from '../hooks/useParty';
import { useParams } from 'react-router-dom';


const VoteScheduleForm = () => {
    const { partyId } = useParams();
    const createVoteScheduleMutation = useCreateVoteSchedule();

    const [formData, setFormData] = useState(() => ({
        party_id: partyId || "",
        title: "",
        desc: "",
        periods: [
            { start_datetime: null, end_datetime: null },
            { start_datetime: null, end_datetime: null },
        ],
        notices: {
            warning: [],
            notice: [],
        },
    }));

    const handleDateChange = (date, index, field) => {
        setFormData((prevFormData) => {
            const updatedPeriods = [...prevFormData.periods];
            updatedPeriods[index][field] = date;
            return {
                ...prevFormData,
                periods: updatedPeriods,
            };
        });
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === "checkbox" ? checked : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: fieldValue,
        }));
    };

    const handleNoticeInputChange = (event, key, index) => {
        const { value } = event.target;

        setFormData((prevFormData) => {
            const updatedNotices = { ...prevFormData.notices };
            updatedNotices[key][index] = value.trim();
            return {
                ...prevFormData,
                notices: updatedNotices,
            };
        });
    };

    const handleAddNotice = (key) => {
        setFormData((prevFormData) => {
            const updatedNotices = { ...prevFormData.notices };
            updatedNotices[key].push("");
            return {
                ...prevFormData,
                notices: updatedNotices,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Format the datetime values to the desired string format
        const formattedPeriods = {
            start_datetime: formData.periods.map((period) =>
                period.start_datetime
                    ? dayjs(period.start_datetime).format("YYYY.MM.DD HH:mm")
                    : ""
            ),
            end_datetime: formData.periods.map((period) =>
                period.end_datetime
                    ? dayjs(period.end_datetime).format("YYYY.MM.DD HH:mm")
                    : ""
            ),
        };

        const periods = formattedPeriods.start_datetime.every((datetime) => datetime === "")
            ? null
            : formattedPeriods;

        const notices = Object.values(formData.notices).flat().every((value) => value === "")
            ? null
            : formData.notices;

        const voteScheduleData = {
            ...formData,
    periods,
    notices,
        };

        // Submit the form data
        console.log(voteScheduleData.periods);
        console.log(voteScheduleData);
        try {
            // Submit the form data to the API
            await createVoteScheduleMutation.mutateAsync(voteScheduleData);
            toast.success("Schedule created successfully");
        } catch (error) {
            toast.error("There was an error!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Other form fields */}
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                />
            </div>
            {formData.periods.map((period, index) => (
                <div key={index}>
                    <label>Period {index + 1}</label>
                    <div>
                        <label>Start Date</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                value={period.start_datetime}
                                onChange={(date) =>
                                    handleDateChange(date, index, "start_datetime")
                                }
                                renderInput={(props) => <TextField {...props} />}
                                label="Start Date"
                                fullWidth
                            />
                        </LocalizationProvider>
                    </div>
                    <div>
                        <label>End Date</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                value={period.end_datetime}
                                onChange={(date) =>
                                    handleDateChange(date, index, "end_datetime")
                                }
                                renderInput={(props) => <TextField {...props} />}
                                label="End Date"
                                fullWidth
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            ))}
            {/* Notices */}
            <div>
                <label>Notices</label>
                <div>
                    <label>Warning</label>
                    {formData.notices.warning.map((warning, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={warning}
                                onChange={(event) =>
                                    handleNoticeInputChange(event, "warning", index)
                                }
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddNotice("warning")}>
                        Add Warning
                    </button>
                </div>
                <div>
                    <label>Notice</label>
                    {formData.notices.notice.map((notice, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={notice}
                                onChange={(event) =>
                                    handleNoticeInputChange(event, "notice", index)
                                }
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddNotice("notice")}>
                        Add Notice
                    </button>
                </div>
            </div>
            {/* Other form fields */}
            <Button type="submit" variant="contained" color="primary">
                Create Schedule
            </Button>
        </form>
    );
};

export default VoteScheduleForm;