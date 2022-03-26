import React from "react";
import { useState, useEffect } from "react";

import "./styles.css";

import Filter from "./components/Filter";
import Notification from "./components/Notification.js";
import PersonList from "./components/List/PersonList";
import PersonForm from "./components/PersonForm";

import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  // Page loading ...
  useEffect(() => {
    refreshPersons();
  }, []);

  const refreshPersons = () =>
    personService.getAll().then((initialPersons) => setPersons(initialPersons));

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNotification = (text, isError) => {
    setMessage(`${text}`);
    setTimeout(() => setMessage(null), 2000);
    isErrorSetter(isError);
  };

  const isErrorSetter = (error) => setIsError(error);

  const handleDelete = (id, name) => {
    const temp = persons.filter((person) => person.id !== id);
    handleNotification(`Deleted ${name} from phonebook`, false);
    setPersons(temp);
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
      // Person not found - create new record  - then get new id from axios returnPerson and send to state
      personService.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        handleNotification(`Added ${personObj.name}`, false);
      });

      setNewName("");
      setNewNumber("");
    } else {
      // modal to update record
      const confirmed =
        window.confirm(
          `${personObj.name} is already added to the phonebook. Update the old number ?`
        ) &&
        // yes - so update
        personService
          .update(persons[index].id, personObj)
          .then((response) => {
            console.log(response);
            const temp = [...persons];
            temp[index].number = personObj.number;
            setPersons(temp);
            handleNotification(`Updated ${personObj.name}'s number`, false);
          })
          .catch((error) => {
            handleNotification(
              `Information of ${persons[index].name} has already been removed from server`,
              true
            );

            refreshPersons();
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

      {message !== null ? (
        <Notification message={message} isError={isError} />
      ) : null}

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
        handleNotification={handleNotification}
        refreshPersons={refreshPersons}
      />
    </div>
  );
};

export default App;
