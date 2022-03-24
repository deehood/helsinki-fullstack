import { useEffect, useState } from "react";
import axios from "axios";
import { renderIntoDocument } from "react-dom/test-utils";

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

const Country = ({ country }) => {
  console.log(country);
  console.log(country[0].languages);
  const languageArray = [];

  for (let [key, value] of Object.entries(country[0].languages))
    languageArray.push(value);

  return (
    <>
      <h2>{country[0].name.common}</h2>

      <p>capital {country[0].capital[0]}</p>
      <p>area {country[0].area}</p>
      <br />
      <p>languages :</p>
      <ul>
        {languageArray.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src=""></img>
    </>
  );
};

const FoundCountries = ({ countries, search }) => {
  const found = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Length", found.length, "found", found);

  if (found.length > 10) return <p>Too many matches</p>;
  else if (found.length === 1) return <Country country={found} />;
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
