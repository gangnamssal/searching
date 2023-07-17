import { useState, useEffect } from 'react';

import getSearchingData from '@apis/getSearchData';

export default function useSearch(endPoint: string, expired = 0) {
  const [data, setData] = useState<IData>({ data: [], expired: Date.now() });
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    switch (query) {
      case '':
        setData((data) => ({ ...data, data: [] }));
        break;
      default:
        (async function () {
          const expiredTime = data.expired + expired;
          const res = await getSearchingData(endPoint, query);
          setData(() => ({ data: res.data, expired: expiredTime }));
        })();
    }
  }, [query, setData, getSearchingData]);

  return { data, query, setQuery };
}

export interface IApiData {
  sickCd: string;
  sickNm: string;
}

export interface IData {
  data: IApiData[];
  expired: number;
}
