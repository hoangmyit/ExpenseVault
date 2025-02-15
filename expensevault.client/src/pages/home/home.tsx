import { FC, useEffect, useState } from "react";
import AlertComponent from "../../components/alert/alert-component";
import { populateWeatherData } from "../../services/weather-forecast.service";
import { Forecast } from "../../app.const";

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
        <AlertComponent
          type="success"
          message="This is a success alert"
          key="alert-success"
        >
          <div>
            <button className="btn btn-sm">Deny</button>
            <button className="btn btn-sm btn-primary">Accept</button>
          </div>
        </AlertComponent>
      </div>
      <h1 className="text-3xl font-bold underline">Hello world! - Tailwind</h1>
      <div>
        <button className="btn btn-primary">Button</button>
      </div>
    </div>
  );
};

export default HomePage;