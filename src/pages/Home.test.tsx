import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Home from './Home';

describe('Home page', () => {
  it('is render', () => {
    render(<Home />);
  });
});
