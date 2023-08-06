import { describe, it } from 'vitest';
import getSearchingData from './getSearchData';

describe('getSearchData', () => {
  it('is called with endpoint', async () => {
    const res = await getSearchingData('/tests', 'test');
    expect(res.data).toEqual({
      sick: [
        {
          sickCd: 'A00',
          sickNm: '콜레라',
        },
        {
          sickCd: 'A01',
          sickNm: '장티푸스 및 파라티푸스',
        },
      ],
    });
  });
});
