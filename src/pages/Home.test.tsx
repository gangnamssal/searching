import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import Home from './Home';

describe('Home page', () => {
  it('has title', () => {
    render(<Home />);

    const firstTitleEl = screen.getByText(/국내 모든 임상시험 검색하고/);
    const secondTitleEl = screen.getByText(/온라인으로 참여하기/);

    expect(firstTitleEl).toBeInTheDocument();
    expect(secondTitleEl).toBeInTheDocument();
  });
});
