import { useMutation, useQuery } from 'react-query';
import api from '../api/api';

const getMyParties = async () => {
    const response = await api.get('/party/me');
    return response.data;
};

const getPartyById = async (partyId) => {
    const response = await api.get(`/party/${partyId}`);
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

export const useMyParties = () => {
    return useQuery('myParties', getMyParties, { staleTime: Infinity });
};

export const useGetPartyById = (partyId) => {
    return useQuery(['partyById', partyId], () => getPartyById(partyId));
};

export const useCreateParty = () => {
    return useMutation(createParty);
};

export const useUpdateParty = () => {
    return useMutation(updateParty);
  };