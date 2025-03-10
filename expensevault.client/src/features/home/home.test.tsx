import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as weatherService from '../../api/endpoints/weather-forecast.service';
import HomePage from './home';

vi.mock('./services/weather-forecast.service');

describe('App', () => {
  let populateWeatherDataSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    populateWeatherDataSpy = vi.spyOn(weatherService, 'populateWeatherData');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders weather forecast heading', () => {
    // Arrange
    populateWeatherDataSpy.mockResolvedValueOnce(null);

    // Act
    render(<HomePage />);

    // Assert
    expect(screen.getByText('Weather forecast')).toBeInTheDocument();
  });

  it('displays loading message initially', () => {
    // Arrange
    populateWeatherDataSpy.mockResolvedValueOnce(undefined);

    // Act
    render(<HomePage />);

    // Assert
    expect(screen.getByText(/Loading... Please refresh/)).toBeInTheDocument();
  });

  it('renders weather data after loading', async () => {
    // Arrange
    const mockData = [
      {
        date: '2023-10-01',
        temperatureC: 20,
        temperatureF: 68,
        summary: 'Sunny',
      },
    ];
    populateWeatherDataSpy.mockResolvedValueOnce(mockData);

    // Act
    render(<HomePage />);

    // Assert
    await waitFor(() =>
      expect(screen.getByText('2023-10-01')).toBeInTheDocument(),
    );
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('68')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });
});
