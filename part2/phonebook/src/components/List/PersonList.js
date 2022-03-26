import React from "react";
import PersonLine from "./PersonLine";
const PersonList = ({
  persons,
  filter,
  handleDelete,
  handleNotification,
  refreshPersons,
}) => {
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

export default PersonList;
