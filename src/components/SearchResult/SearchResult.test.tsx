import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import SearchResult from './SearchResult';

describe('SearchResult', () => {
  const size = 20;
  const hover = true;
  const arrowKey = true;

  it('has string keyword', () => {
    const keyword = 'test';

    render(<SearchResult keyword={keyword} size={size} hover={hover} arrowKey={arrowKey} />);

    const pEl = screen.getByText('test');

    expect(pEl).toBeInTheDocument();
  });

  it('has array keyword', () => {
    const keyword: IApiData = { sickCd: '123', sickNm: 'testSickNm' };

    render(<SearchResult keyword={keyword} size={size} hover={hover} arrowKey={arrowKey} />);

    const pEl = screen.getByText('testSickNm');

    expect(pEl).toBeInTheDocument();
  });
});
