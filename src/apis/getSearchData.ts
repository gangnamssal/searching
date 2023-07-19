import { AxiosResponse } from 'axios';
import Axios from '@libs/axiosInstance';

export default async function getSearchingData(endPoint: string, query: string) {
  const res: AxiosResponse = await Axios.get(endPoint, {
    params: {
      q: query,
    },
  });
  console.info('calling api');
  return res;
}
