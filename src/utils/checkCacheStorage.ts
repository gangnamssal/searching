import { cacheStorage } from '@utils/cacheStorage';

export const checkCacheStorage =
  <C extends React.Dispatch<React.SetStateAction<any>>, A>(setState: C, query: string) =>
  (state: A) =>
    cacheStorage.find(query) ? setState(cacheStorage.get(query)) : setState(state);
