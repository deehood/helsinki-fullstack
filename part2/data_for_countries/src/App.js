import { useEffect, useState } from "react";
import axios from "axios";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const Search = ({ search, handleSearch }) => {
  return (
    <div>
      Find countries{" "}
      <input
        type="text"
        placeholder="filter"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

const Flag = ({ country }) => {
  const FLAG_URL = country.flags.png;
  // console.log(FLAG_URL);

  return <img src={FLAG_URL} alt="flag" />;
};

const WeatherIcon = (icon) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon.icon}@2x.png`;

  return <img src={iconUrl} />;
};

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY;
  const capital = country.capital;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`;

  useEffect(
    () =>
      axios.get(weatherUrl).then((response) => {
        console.log("promise fulfilled");
        setWeather(response.data);
      }),
    []
  );

  console.log(URL);
  console.log(weather);

  return (
    <>
      {weather.main && (
        <>
          <p>temperature {(weather.main.temp - 273.15).toFixed(2)}º c</p>
          <WeatherIcon icon={weather.weather[0].icon} />
          <p>wind {weather.wind.speed.toFixed(2)} m/s</p>
        </>
      )}
    </>
  );
};

const Country = ({ country }) => {
  const languageArray = [];

  //create iterable array with languages
  for (let key in country.languages) languageArray.push(country.languages[key]);

  return (
    <>
      <h2>{country.name.common}</h2>

      <p>capital {country.capital[0]}</p>
      <p>area {country.area} km² </p>
      <br />

      <p>languages :</p>
      <ul>
        {languageArray.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <Flag country={country} />
      <Weather country={country} />
    </>
  );
};

const FoundCountries = ({ countries, search, searchSetter }) => {
  const found = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (found.length > 10) return <p>Too many matches</p>;
  else if (found.length === 1) return <Country country={found[0]} />;
  else
    return (
      <>
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <p key={country.name.common}>
              {country.name.common}{" "}
              {/* button uses setter function in APP to setState   */}
              <button onClick={() => searchSetter(country.name.common)}>
                show {country.name.common}
              </button>
            </p>
          ))}
      </>
    );
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const searchSetter = (choice) => setSearch(choice);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(
    () =>
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        setCountries(response.data);
        // console.log(response.data);
      }),
    []
  );

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <FoundCountries
        search={search}
        countries={countries}
        searchSetter={searchSetter}
      />
    </div>
  );
}

export default App;
