/phonebook - after submission ...

Line  11 should be key={person.id} - give a warning on load and F5 (refresh) otherwise ...
 
 return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <PersonLine
            key={persons.id}
            person={person}
            handleDelete={handleDelete}
            handleNotification={handleNotification}
            refreshPersons={refreshPersons}
          />
        ))}
    </>
  );
};
