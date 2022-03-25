import React from "react";
import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonList from "./components/List/PersonList";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons.js";

const App = () => {
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleDelete = (id) => {
    const temp = persons.filter((person) => person.id !== id);
    setPersons(temp);
  };

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

    const personObj = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((x) => x.name === personObj.name))
      alert(`${personObj.name} is already added to the phonebook`);
    else
      personService.create(personObj).then((returnedPerson) => {
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
      <PersonList
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
