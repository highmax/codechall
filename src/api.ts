import axios from 'axios';

const baseURL = 'https://api.giphy.com/v1/gifs/';

// Insert API KEY HERE
const API_KEY = '';

export const LIMIT = 20;

const API = axios.create({
  baseURL: baseURL,
});

interface paramsProps {
  api_key: string;
  limit: number;
  offset?: number;
  q?: string | null | undefined;
}

export const requestData = async (q?: string, offset?: number) => {
  const params: paramsProps = {
    api_key: API_KEY,
    limit: LIMIT,
  };
  if (offset) params.offset = offset;
  if (q) params.q = q;

  return await API.get(`${q ? 'search' : 'trending'}`, {
    params: params,
  }).then((res) => {
    try {
      if (res.status == 200) return res.data;
    } catch (error) {
      console.error(error);
    }
  });
};
