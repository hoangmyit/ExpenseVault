import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from './App';
import * as weatherService from './services/weather-forecast.service';

const populateWeatherDataSpy = vi.spyOn(weatherService, 'populateWeatherData');

vi.mock('./services/weather-forecast.service');

describe('App', () => {
  it('renders weather forecast heading', () => {
    populateWeatherDataSpy.mockResolvedValueOnce(null);

    render(<App />);
    expect(screen.getByText('Weather forecast')).toBeInTheDocument();
  });

  it('displays loading message initially', () => {
    populateWeatherDataSpy.mockResolvedValueOnce(undefined);

    render(<App />);
    expect(screen.getByText(/Loading... Please refresh/)).toBeInTheDocument();
  });

  it('renders weather data after loading', async () => {
    const mockData = [
      {
        date: '2023-10-01',
        temperatureC: 20,
        temperatureF: 68,
        summary: 'Sunny',
      },
    ];
    populateWeatherDataSpy.mockResolvedValueOnce(mockData);

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText('2023-10-01')).toBeInTheDocument(),
    );
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('68')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });
});
