import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, handleFilter }) => {
  return (
    <>
      filter shown with{" "}
      <input
        onChange={handleFilter}
        value={filter}
        type="text"
        placeholder="search ..."
      />
    </>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber,
  handleSubmitName,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleChangeName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleChangeNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmitName}>
          add
        </button>
      </div>
    </form>
  );
};

const Person = ({ person }) => (
  <p>
    {person.id} {person.name} {person.number}
  </p>
);

const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <Person key={person.id} person={person} />
        ))}
    </>
  );
};

const App = () => {
  useEffect(() => {
    const promise = axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log(response);
        setPersons(response.data);
      });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmitName = (event) => {
    event.preventDefault();
    console.log(persons.length);

    const personObj = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((x) => x.name === personObj.name))
      alert(`${personObj.name} is already added to the phonebook`);
    else
      axios
        .post("http://localhost:3001/persons", personObj)
        .then((response) => {
          console.log(response.data);
          setPersons(persons.concat(personObj));
        });

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmitName={handleSubmitName}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
