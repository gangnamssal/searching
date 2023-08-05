import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  const setKeyboardMove = vi.fn();
  const setQuery = vi.fn();
  const data = [{ sickCd: '', sickNm: '' }];

  beforeEach(() => {
    render(<SearchBar setKeyboardMove={setKeyboardMove} setQuery={setQuery} data={data} />);
  });

  it('is render', () => {
    const textInputEl = screen.getByLabelText('search-input');
    const submitInputEl = screen.getByLabelText('search-submit-input');

    expect(textInputEl).toBeInTheDocument();
    expect(submitInputEl).toBeInTheDocument();
  });

  it('is change action', () => {
    const textInputEl = screen.getByLabelText('search-input');

    fireEvent.change(textInputEl, {
      target: { value: 'new value' },
    });
    expect(textInputEl).toHaveValue('new value');
  });

  it('is keyUp action', () => {
    const textInputEl = screen.getByLabelText('search-input');

    fireEvent.keyUp(textInputEl, { code: 'ArrowUp' });
    expect(setKeyboardMove).toBeCalled();

    fireEvent.keyDown(textInputEl, { code: 'ArrowDown' });
    expect(setKeyboardMove).toBeCalled();
  });
});
