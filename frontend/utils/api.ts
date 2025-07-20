import axios from 'axios';

export const fetchPrice = async (token: string, network: string, timestamp: number) => {
  const res = await axios.get('http://localhost:4000/price', {
    data: { token, network, timestamp }
  });
  return res.data;
};

export const scheduleHistory = async (token: string, network: string) => {
  await axios.post('http://localhost:4000/schedule', { token, network });
};
