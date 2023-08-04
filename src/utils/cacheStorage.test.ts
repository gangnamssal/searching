import { beforeEach, describe, expect, it, test } from 'vitest';
import { cacheStorage } from './cacheStorage';

describe('cacheStorage', () => {
  const key = '1';

  const value = { data: [{ sickCd: '1', sickNm: '1' }], expired: 123 };

  const testMap = new Map();

  beforeEach(() => {
    cacheStorage.getStorage().clear();
    testMap.clear();
  });

  it('is get storage', () => {
    expect(cacheStorage.getStorage()).toEqual(testMap);
  });

  it('is get cache', () => {
    cacheStorage.add(key, value);
    expect(cacheStorage.get(key)).toEqual(value);
  });

  it('is add cache', () => {
    expect(cacheStorage.add(key, value)).toEqual(testMap.set(key, value));
  });

  it('is remove cache', () => {
    cacheStorage.add(key, value);
    expect(cacheStorage.remove(key)).toBe(true);
    expect(cacheStorage.remove(key)).toBeNull();
  });

  it('is find cache', () => {
    expect(cacheStorage.find(key)).toBeFalsy();

    cacheStorage.add(key, value);

    expect(cacheStorage.find(key)).toBeTruthy();
  });

  it('is storage size', () => {
    expect(cacheStorage.size()).toBe(0);
  });

  it('is cache entries', () => {
    cacheStorage.add(key, value);
    testMap.set(key, value);
    expect(cacheStorage.entries()).toEqual(testMap.entries());
  });
});
