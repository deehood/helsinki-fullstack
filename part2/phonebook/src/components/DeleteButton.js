import React from "react";
import personService from "../services/persons.js";

const DeleteButton = ({ person, handleDelete }) => {
  const handleDeleteButton = () => {
    const confirmDelete = window.confirm(`Delete ${person.name} ?`);

    confirmDelete &&
      personService.remove(person.id).then((confirm) => {
        handleDelete(person.id);
      });
  };

  return <button onClick={handleDeleteButton}> delete</button>;
};

export default DeleteButton;
