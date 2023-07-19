

## # 실행방법

```
npm install
npm run start
```



## # 커밋 컨벤션

```
feat: 기능 추가, 삭제, 변경 (코드 수정)
fix: 버그 수정
type: 코드 형식 변경
design: UI 변경
refactor: 코드 리팩토링
docs: 코드 외 문서의 추가, 삭제, 변경
test: 테스트 코드 추가, 삭제, 변경
chore: 빌드 업무 수정, 패키지 매니저 수정
```



## # 구현 방법

### - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

1. axios interceptor를 통해 API 요청 시 delay 시간보다 일찍 API 요청하면 기존의 API요청을 취소

```

const delay = 100;

const CancelToken = axios.CancelToken;

let cancel: (() => void) | undefined;

const config: AxiosRequestConfig = {
  baseURL: `http://localhost:4000`,
  timeout: 5000,
};

const Axios = axios.create(config);

const error = (error: Error) => {
  return Promise.reject(error);
};

Axios.interceptors.request.use((config) => {
  if (cancel) {
    cancel();
  }
  config.cancelToken = new CancelToken((c) => {
    cancel = c;
  });

  return new Promise<InternalAxiosRequestConfig>((resolve) => setTimeout(() => resolve(config), delay));
}, error);

Axios.interceptors.response.use(
  (response) => {
    cancel = undefined;
    return response;
  },
  (error) => {
    cancel = undefined;
    return Promise.reject(error);
  }
);
```

2. 검색어를 입력했을 때 일정 시간 동안 입력이 이루어지지 않으면 검색어를 api 요청하게 함, 만약 일정 시간 이전에 입력이 이루어지면 이전 입력은 취소 

```
 let keyboardInputTime: number;
 
 const keyboardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    
    if (keyboardInputTime) clearTimeout(keyboardInputTime);
    
    keyboardInputTime = setTimeout(() => {
      if (setQuery) setQuery(() => inputValue);
    }, 400);
  };
```



### - API 호출별로 로컬 캐싱 구현

class와 Map 자료구조를 이용해서 캐싱 기능을 구현

```
class CacheStorage<K, V> {
  #storage: Map<K, V> = new Map();

  get(key: K) {
    return this.#storage.get(key);
  }

  add(key: K, value: V) {
    this.#storage.set(key, value);
    return this.#storage;
  }

  remove(key: K) {
    return this.#storage.has(key) ? this.#storage.delete(key) : null;
  }

  find(key: K) {
    return this.#storage.has(key);
  }

  size() {
    return this.#storage.size;
  }

  entries() {
    return this.#storage.entries();
  }
}

export const cacheStorage = new CacheStorage<string, IData>();

```

API 요청이 이루어지기 전에 먼저 캐시에 값이 있는지 확인하고 없으면 API 요청, 있으면 Map에서 가져와서 데이터를 보여줌

만약 expired 시간이 지난 캐시 값이면 기존의 캐시 값을 삭제한 뒤 API 요청을 하도록 했음.

```
 // 사용시
 const {
    data: { data },
    query,
    setQuery,
  } = useSearch('/sick', { expired: 10000 });

// useSearch hook 코드 
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

```



### - 키보드만으로 추천 검색어들로 이동 가능하도록 구현

input에서 keyUp 이벤트가 발생했을 때 방향키 위, 아래를 감지하여 number를 -1부터 증가시키거나 감소시킨다. 

```
const plus = (num: number) => {
    return data && num >= data?.length - 1 ? (num = data.length) : ++num;
};

const minus = (num: number) => {
	return num < 1 ? (num = 0) : --num;
};

const handleKeyboardMove = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const code = e.code;

    switch (code) {
      case KeyCode.ArrowDown:
        if (setKeyboardMove) setKeyboardMove(plus);
        break;
      case KeyCode.ArrowUp:
        if (setKeyboardMove) setKeyboardMove(minus);
        break;
    }
};
  
enum KeyCode {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
}

```

검색어 리스트에서 number값과 같은 인덱스를 가진 검색어면 backgroundColor를 변경.
