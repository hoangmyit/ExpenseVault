import { FC, useEffect, useState } from 'react';

import { Forecast } from '../../app.const';
import { populateWeatherData } from '../../core/api/endpoints/weather-forecast.service';
import FacebookIcon from '../../icons/brand/facebook-icon';

const HomePage: FC = () => {
  const [forecasts, setForecasts] = useState<Forecast[]>();

  useEffect(() => {
    populateWeatherData().then((data) => setForecasts(data));
  }, []);

  const contents =
    forecasts === undefined ? (
      <p>
        <em>
          Loading... Please refresh once the ASP.NET backend has started. See{' '}
          <a href="https://aka.ms/jspsintegrationreact">
            https://aka.ms/jspsintegrationreact
          </a>{' '}
          for more details.
        </em>
      </p>
    ) : (
      <table className="table-striped table" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div>
      <h1 id="tableLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
      <div>
        {/* <ToastContainer toasts={[]} onClose={() => {}}>
          <div>
            <button className="btn btn-sm">Deny</button>
            <button className="btn btn-sm btn-primary">Accept</button>
          </div>
        </ToastContainer> */}
      </div>
      <h1 className="text-3xl font-bold underline">Hello world! - Tailwind</h1>
      <div>
        <button className="btn btn-primary">
          <FacebookIcon />
          Button
        </button>
      </div>
    </div>
  );
};

export default HomePage;
