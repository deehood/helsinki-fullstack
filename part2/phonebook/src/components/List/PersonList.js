import React from "react";
import PersonLine from "./PersonLine";
const PersonList = ({ persons, filter, handleDelete }) => {
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
          />
        ))}
    </>
  );
};

export default PersonList;
