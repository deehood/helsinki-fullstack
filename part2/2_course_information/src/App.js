const Course = ({ course }) => {
  const Total = ({ parts }) => {
    console.log(parts);

    let sum = 0;

    for (let i = 0; i < parts.length; i++) {
      sum += parts[i].exercises;
    }

    return <p>Total of {sum} exercises</p>;
  };

  const Header = ({ header }) => {
    return <h2>{header}</h2>;
  };

  const Content = ({ parts }) => {
    const Part = ({ parts }) => {
      return (
        <ul>
          {parts.map((part) => (
            <li key={part.id}>
              {part.name} .... {part.exercises}
            </li>
          ))}
        </ul>
      );
    };

    return <Part parts={parts} />;
  };
  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
