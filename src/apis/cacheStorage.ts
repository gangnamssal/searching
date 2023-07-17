class CacheStorage {
  storage: Map<string, IMap[]> = new Map();

  print() {
    console.log(this.storage);
  }

  add(key: string, value: IMap[]) {
    this.storage.set(key, value);
    return this.storage;
  }

  remove(key: string) {
    return this.storage.has(key) ? this.storage.delete(key) : null;
  }

  find(key: string) {
    return this.storage.has(key);
  }
}

interface IMap {
  sickCd: string;
  sickNm: string;
  expired: number;
}

export const cacheStorage = new CacheStorage();
