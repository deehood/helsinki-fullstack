import Note from "./components/Note";

const App = ({ notes }) => {
  console.log(notes);
  const newNotes = notes.map((note) => note.content);
  console.log(newNotes);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
