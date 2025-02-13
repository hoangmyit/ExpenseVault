export const populateWeatherData = async () => {
  const response = await fetch('weatherforecast');
  return response.json();
};
