import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;

  if (good || neutral || bad)
    return (
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={good + neutral + bad} />
          </tr>
          <tr>
            <StatisticLine
              text="average"
              value={(good - bad) / (good + neutral + bad)}
            />
          </tr>
          <tr>
            <StatisticLine
              text="positive"
              value={`${(good / (good + neutral + bad)) * 100} %`}
            />
          </tr>
        </tbody>
      </table>
    );
  else return <p>No feedback given</p>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
