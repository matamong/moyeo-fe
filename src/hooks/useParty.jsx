import { useMutation, useQuery } from 'react-query';
import api from '../api/api';

const getMyParties = async () => {
    const response = await api.get('/party/me');
    return response.data;
};

const getMyPartyById = async (partyId) => {
    const response = await api.get(`/party/me/${partyId}`);
    return response.data;
};

const createParty = async (partyData) => {
    const response = await api.post('/party', partyData);
    return response.data;
};

const updateParty = async (partyId, partyData) => {
    console.log(partyId)
    console.log(partyData)
    const response = await api.put(`/party/${partyId}`, partyData);
    return response.data;
};


const getPartySchedule = async (partyId) => {
    const response = await api.get(`/vote_schedule/party/${partyId}`);
    return response.data;
}

const createVoteSchedule = async (VoteScheduleData) => {
    const response = await api.post('/vote_schedule', VoteScheduleData);
    return response.data;
}

export const useMyParties = () => {
    return useQuery('myParties', getMyParties, { staleTime: Infinity });
};

export const useGetMyPartyById = (partyId) => {
    return useQuery(['partyById', partyId], () => getMyPartyById(partyId));
};

export const useCreateParty = () => {
    return useMutation(createParty);
};

export const useUpdateParty = () => {
    return useMutation(updateParty);
  };


export const usePartySchedule = (partyId) => {
    return useQuery(['partySchedule', partyId], () => getPartySchedule(partyId));
}

export const useCreateVoteSchedule = () => {
    return useMutation(createVoteSchedule);
}