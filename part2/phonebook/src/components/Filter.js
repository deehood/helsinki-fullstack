const Filter = ({ filter, handleFilter }) => {
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

export default Filter;
