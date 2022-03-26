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
      name: newName.trim(),
      number: newNumber.trim(),
    };
    //  if name already in db return index
    const index = persons.findIndex((x) => x.name === personObj.name);

    if (index === -1) {
      // Person not found - create new record
      personService
        .create(personObj)
        .then((returnedPerson) => setPersons(persons.concat(personObj)));
      setNewName("");
      setNewNumber("");
    } else {
      console.log(index);
      console.log(persons[index].id, persons[index].name);
      // modal to update record
      const confirmed =
        window.confirm(
          `${personObj.name} is already added to the phonebook. Update the old number ?`
        ) &&
        personService.update(persons[index].id, personObj).then((response) => {
          console.log(response);
          const temp = [...persons];
          temp[index].number = personObj.number;
          setPersons(temp);
        });

      if (confirmed) {
        setNewName("");
        setNewNumber("");
      }
    }
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
