import { useState, useEffect } from "react";

import personService from "./services/persons.js";

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
  <p key={person.id}>
    {person.name} {person.number}
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
          <Person person={person} />
        ))}
    </>
  );
};

const App = () => {
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log(initialPersons);
      setPersons(initialPersons);
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
      personService.create(personObj).then((returnedPerson) => {
        console.log(returnedPerson);
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
      <Persons key={persons.id} persons={persons} filter={filter} />
    </div>
  );
};

export default App;
