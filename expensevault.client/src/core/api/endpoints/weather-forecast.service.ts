import { Forecast } from '../../../app.const';
import { SETTING_ENV } from '../../../configs/environment';

const mockData: Forecast[] = [
  { date: '2025-02-13', temperatureC: 20, temperatureF: 68, summary: 'Sunny' },
  { date: '2025-02-14', temperatureC: 22, temperatureF: 72, summary: 'Cloudy' },
  { date: '2025-02-15', temperatureC: 18, temperatureF: 64, summary: 'Rainy' },
];

export async function populateWeatherData(): Promise<Forecast[]> {
  if (SETTING_ENV.mockData) {
    return Promise.resolve(mockData);
  }

  const response = await fetch('/weatherforecast');
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}
