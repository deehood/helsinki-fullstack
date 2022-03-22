const Course = ({ course }) => {
  const Total = ({ parts }) => {
    const total = parts.reduce((prev, cur) => prev + cur.exercises, 0);

    return <p>Total of {total} exercises</p>;
  };

  const Header = ({ header }) => {
    console.log();
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

  console.log(course);
  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  console.log(courses);
  return courses.map((course) => <Course course={course} />);
};

export default App;
