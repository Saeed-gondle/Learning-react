import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [date, setDate] = React.useState(new Date().toDateString());

  return (
    <div className="counter-container">
      <h1 className="counter-title">Date Counter</h1>

      <div className="control-group">
        <label className="control-label">Step:</label>
        <div className="control-buttons">
          <button
            className="btn btn-decrement"
            onClick={() => setStep(step => --step)}
          >
            −
          </button>
          <span className="control-value">{+step}</span>
          <button
            className="btn btn-increment"
            onClick={() => setStep(step => ++step)}
          >
            +
          </button>
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Count:</label>
        <div className="control-buttons">
          <button
            className="btn btn-decrement"
            onClick={() => {
              const newCount = count - step;
              setCount(newCount);
              const newDate = new Date();
              newDate.setDate(newDate.getDate() + newCount);
              setDate(newDate.toDateString());
            }}
          >
            −
          </button>
          <span className="control-value">{+count}</span>
          <button
            className="btn btn-increment"
            onClick={() => {
              const newCount = count + step;
              setCount(newCount);
              const newDate = new Date();
              newDate.setDate(newDate.getDate() + newCount);
              setDate(newDate.toDateString());
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="date-display">
        <p className="date-text">
          {count === 0 && 'Today is '}
          {count > 0 &&
            `${count} ${count === 1 ? 'day' : 'days'} from today is `}
          {count < 0 &&
            `${Math.abs(count)} ${Math.abs(count) === 1 ? 'day' : 'days'} ago was `}
          <strong>{date}</strong>
        </p>
      </div>
    </div>
  );
}
export default App;
