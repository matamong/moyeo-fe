import { useMutation, useQuery } from 'react-query';
import api from '../api/api';

const getMyParties = async () => {
    const response = await api.get('/party/me');
    return response.data;
};

const createParty = async (partyData) => {
    const response = await api.post('/party', partyData);
    return response.data;
};

export const useMyParties = () => {
    return useQuery('myParties', getMyParties);
  };

export const useCreateParty = () => {
    return useMutation(createParty);
};

