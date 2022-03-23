import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "9999-022", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
      id: persons.length + 1,
    };
    console.log(personObj);
    persons.some((x) => x.name === personObj.name)
      ? alert(`${personObj.name} is already added to the phonebook`)
      : setPersons(persons.concat(personObj));

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.id} {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
