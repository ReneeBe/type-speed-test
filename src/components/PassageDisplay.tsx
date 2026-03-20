interface Props {
  passage: string;
  typed: string;
}

export function PassageDisplay({ passage, typed }: Props) {
  return (
    <div className="passage">
      {passage.split("").map((char, i) => {
        let className = "char char--pending";
        if (i < typed.length) {
          className =
            typed[i] === char ? "char char--correct" : "char char--incorrect";
        } else if (i === typed.length) {
          className = "char char--cursor";
        }
        return (
          <span key={i} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
