import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './nextButton';
import Progess from './progess';
import FinishScreen from './FinishScreen';
import ResetButton from './ResetButton';
import Timmer from './Timmer';
import Footer from './Footer';
function App() {
  const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    secondsRemaining: null,
  };
  const SEC_PER_QUESTION = 30;
  function reducer(state, action) {
    switch (action.type) {
      case 'dataRecieved':
        return { ...state, questions: action.payload, status: 'ready' };
      case 'dataFailed':
        return { ...state, status: 'error' };
      case 'start':
        return { ...state, status: 'active', secondsRemaining: state.questions.length * SEC_PER_QUESTION };
      case 'newAnswer':
        const isCorrect =
          state.questions[state.index].correctOption === action.payload;
        return {
          ...state,
          answer: action.payload,
          points: isCorrect
            ? state.points + state.questions[state.index].points
            : state.points,
        };
      case 'nextQuestion':
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case 'finish':
        return {
          ...state,
          status: 'finished',
        };
      case 'tick':
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? 'finished' : state.status,
        };
      case 'reset':
        return { ...initialState, questions: state.questions, status: 'ready' };
      default:
        throw new Error('Action unkown');
    }
  }
  const [{ questions, status, index, answer, points,secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(() => {
    // opentdb.com/api.php?amount=5&type=multiple
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .then(data => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="App">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {(status === 'ready' || status === 'reset') && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progess
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />{' '}
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timmer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen points={points} maxPoints={maxPoints} />
            <ResetButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
