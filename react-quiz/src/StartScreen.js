function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to React Quiz</h2>
      <h3>{numQuestions} questions to test you react mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({ type: 'start' })}>
        Let's go
      </button>
    </div>
  );
}

export default StartScreen;
