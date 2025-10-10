import React, { useState } from 'react';
function App() {
  const messages = [
    'Learn React ⚛️',
    'Apply for jobs 💼',
    'Invest your new income 🤑',
  ];

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        className="close"
        onClick={e => {
          e.target.textContent = !isOpen ? '✖️' : '☰';
          setIsOpen(state => !state);
        }}
      >
        ✖️
      </div>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`step-1 ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-2 ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-3 ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          <p className="message">
            {`Step ${step}`}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              className="previous"
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={() => setStep(s => (s === 1 ? s : s - 1))}
            >
              Previous
            </button>
            <button
              className="next"
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={() => setStep(s => (s === 3 ? s : s + 1))}
              onClickCapture={e => (e.target.textContent = 'clicked')}
            >
              Next
            </button>
            <button
              className="next"
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={() => setStep(s => (s === 3 ? s : s + 1))}
              onClickCapture={e => (e.target.textContent = 'clicked')}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
