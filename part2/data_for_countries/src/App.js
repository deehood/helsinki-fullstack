import { useEffect, useState } from "react";
import axios from "axios";

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
  console.log(FLAG_URL);

  return <img src={FLAG_URL} alt="" />;
};

const Country = ({ country }) => {
  const languageArray = [];

  //create iterable array with languages
  for (let key in country.languages) languageArray.push(country.languages[key]);

  console.log(languageArray);

  // flags

  return (
    <>
      <h2>{country.name.common}</h2>

      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <br />

      <p>languages :</p>
      <ul>
        {languageArray.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <Flag country={country} />
    </>
  );
};

const FoundCountries = ({ countries, search }) => {
  const found = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Length", found.length, "found", found);

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
            <p key={country.name.common}>{country.name.common}</p>
          ))}
      </>
    );
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(
    () =>
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        setCountries(response.data);
        console.log(response.data);
      }),
    []
  );

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <FoundCountries search={search} countries={countries} />
    </div>
  );
}

export default App;
