import React from "react";
import DeleteButton from "./DeleteButton.js";

const PersonLine = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <DeleteButton handleDelete={handleDelete} person={person} />
    </div>
  );
};
export default PersonLine;
