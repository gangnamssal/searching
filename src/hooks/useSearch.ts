import { useState, useEffect, useCallback } from 'react';

import getSearchingData from '@apis/getSearchData';
import { cacheStorage } from '@utils/cacheStorage';

export default function useSearch(endPoint: string, { expired = 0 }) {
  const [data, setData] = useState<IData>({ data: [], expired: Date.now() });
  const [query, setQuery] = useState<string>('');

  const fetchSearchingData = useCallback(
    async function () {
      const res = await getSearchingData(endPoint, query);
      const newData = { data: await res.data, expired: Date.now() + expired };
      setData(() => newData);
      cacheStorage.add(query, newData);
    },
    [expired, endPoint, query, setData]
  );

  const removeCacheAndFetchSearchingData = useCallback(() => {
    cacheStorage.remove(query);
    fetchSearchingData();
  }, [query, fetchSearchingData]);

  const getCacheData = useCallback(() => {
    setData(() => cacheStorage.get(query) as IData);
  }, [setData, query]);

  useEffect(() => {
    if (query === '') setData((data) => ({ ...data, data: [] }));
    else if (!cacheStorage.find(query)) fetchSearchingData();
    else if ((cacheStorage.get(query)?.expired as number) < Date.now()) removeCacheAndFetchSearchingData();
    else getCacheData();
  }, [query, setData, fetchSearchingData, removeCacheAndFetchSearchingData, getCacheData]);

  return { data, query, setQuery };
}
