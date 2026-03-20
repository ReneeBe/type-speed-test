interface Props {
  wpm: number;
  accuracy: number;
  elapsed: number;
  errors: number;
}

export function Stats({ wpm, accuracy, elapsed, errors }: Props) {
  const minutes = Math.floor(elapsed / 60);
  const seconds = Math.floor(elapsed % 60);
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="stats">
      <div className="stat">
        <span className="stat__value">{wpm}</span>
        <span className="stat__label">WPM</span>
      </div>
      <div className="stat">
        <span className="stat__value">{accuracy}%</span>
        <span className="stat__label">Accuracy</span>
      </div>
      <div className="stat">
        <span className="stat__value">{timeStr}</span>
        <span className="stat__label">Time</span>
      </div>
      <div className="stat">
        <span className="stat__value">{errors}</span>
        <span className="stat__label">Errors</span>
      </div>
    </div>
  );
}
