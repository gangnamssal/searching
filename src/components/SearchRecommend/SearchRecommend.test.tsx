import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import SearchRecommend from './SearchRecommend';

describe('SearchRecommend', () => {
  it('has 추천 검색어 sentence', () => {
    const data = [{ sickCd: '', sickNm: '' }];
    const query = '';
    const keyboardMove = 0;

    render(<SearchRecommend data={data} query={query} keyboardMove={keyboardMove} />);

    const pEl = screen.getByText(/추천 검색어/);

    expect(pEl).toBeInTheDocument();
  });

  it('has data length 0 and query exist', async () => {
    const data: IApiData[] = [];
    const query = 'test';
    const keyboardMove = 0;

    render(<SearchRecommend data={data} query={query} keyboardMove={keyboardMove} />);

    const pEl = await screen.findByText(/검색어 없음/);

    expect(pEl).toBeInTheDocument();
  });

  it('have not query', async () => {
    const data: IApiData[] = [];
    const query = '';
    const keyboardMove = 0;

    render(<SearchRecommend data={data} query={query} keyboardMove={keyboardMove} />);

    const divEl = await screen.findByTestId('no-display-searchResult');

    expect(divEl).toBeInTheDocument();
  });

  it('has data', () => {
    const data: IApiData[] = [{ sickCd: '123', sickNm: '데이터 있음' }];
    const query = 'aaa';
    const keyboardMove = 0;

    render(<SearchRecommend data={data} query={query} keyboardMove={keyboardMove} />);

    const pEl = screen.getByText('데이터 있음');
    expect(pEl).toBeInTheDocument();
  });
});
