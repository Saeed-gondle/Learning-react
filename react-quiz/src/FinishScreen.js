function FinishScreen({ points, maxPoints }) {
    let emoji = '😐';
    if (points === maxPoints) emoji = '🏆';
    else if (points > maxPoints / 2) emoji = '😊';
    
  return (
    <p className="result">
      you scored{' '}
      <strong>
        {points}/{maxPoints}
      </strong>{' '}
      {Math.ceil((points / maxPoints) * 100)}% correct
      points
    </p>
  );
}

export default FinishScreen;
