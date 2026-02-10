import { useEffect } from 'react';

function Timmer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <div className="timer">
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timmer;
