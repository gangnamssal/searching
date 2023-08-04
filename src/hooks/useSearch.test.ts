import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useSearch from './useSearch';

describe('useSearch', () => {
  it('is called', () => {
    const {
      result: { current },
    } = renderHook(() => useSearch('/query', { expired: 0 }));
    const { data, query, setQuery } = current;

    expect(data).toEqual({ data: [], expired: data.expired });
    expect(query).toBe('');
    expect(setQuery).toBeInstanceOf(Function);
  });
});
