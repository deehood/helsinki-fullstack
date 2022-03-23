import { useState } from "react";

const Filter = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

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

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1,
    },
    { name: "Ada", number: "39-44-5323523", id: 2 },
    { name: "Dan", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

    persons.some((x) => x.name === personObj.name)
      ? alert(`${personObj.name} is already added to the phonebook`)
      : setPersons(persons.concat(personObj));

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

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
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <p key={person.id}>
            {person.id} {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default App;
