import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders weather forecast heading', () => {
    render(<App />);
    expect(screen.getByText('Weather forecast')).toBeInTheDocument();
  });
});
