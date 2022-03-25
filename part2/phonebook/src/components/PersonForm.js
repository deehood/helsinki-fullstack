import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber,
  handleSubmitName,
}) => {
  return (
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
  );
};

export default PersonForm;
