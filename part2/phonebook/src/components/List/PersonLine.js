import React from "react";
import DeleteButton from "./DeleteButton.js";

const PersonLine = ({
  person,
  handleDelete,
  handleNotification,
  refreshPersons,
}) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <DeleteButton
        person={person}
        handleDelete={handleDelete}
        handleNotification={handleNotification}
        refreshPersons={refreshPersons}
      />
    </div>
  );
};
export default PersonLine;
