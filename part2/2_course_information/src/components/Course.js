import React from "react";

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

  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
