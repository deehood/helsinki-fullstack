import React from "react";
import personService from "../../services/persons.js";

const DeleteButton = ({
  person,
  handleDelete,
  handleNotification,
  refreshPersons,
}) => {
  const handleDeleteButton = () => {
    const confirmDelete = window.confirm(`Delete ${person.name} ?`);

    confirmDelete &&
      personService
        .remove(person.id)
        .then((confirm) => {
          handleDelete(person.id, person.name);
        })
        .catch((error) => {
          handleNotification(
            `Information of ${person.name} has already been removed from server`,
            true
          );
          refreshPersons();
        });
  };

  return <button onClick={handleDeleteButton}> delete</button>;
};

export default DeleteButton;
