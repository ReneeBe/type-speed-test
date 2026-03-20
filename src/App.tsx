import { useEffect, useRef, useState } from "react";
import { useTypingTest } from "./hooks/useTypingTest";
import { PassageDisplay } from "./components/PassageDisplay";
import { Stats } from "./components/Stats";

export default function App() {
  const { state, handleInput, reset } = useTypingTest();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (state.status !== "finished") {
      inputRef.current?.focus();
    }
  }, [state.status]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function handleRestart() {
    reset();
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">
          type<span>speed</span>
        </h1>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </header>

      <main className="main">
        <Stats
          wpm={state.wpm}
          accuracy={state.accuracy}
          elapsed={state.elapsed}
          errors={state.errors}
        />

        <div className="test-area" onClick={() => inputRef.current?.focus()}>
          <PassageDisplay passage={state.passage} typed={state.typed} />
          <textarea
            ref={inputRef}
            className="hidden-input"
            value={state.typed}
            onChange={(e) => handleInput(e.target.value)}
            disabled={state.status === "finished"}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>

        {state.status === "idle" && (
          <p className="hint">Start typing to begin the test</p>
        )}

        {state.status === "finished" && (
          <div className="results">
            <p className="results__message">
              {state.accuracy >= 95
                ? "Great job!"
                : state.accuracy >= 80
                  ? "Nice work!"
                  : "Keep practicing!"}
            </p>
            <button className="btn" onClick={handleRestart}>
              Try Again
            </button>
          </div>
        )}

        {state.status === "running" && (
          <button className="btn btn--ghost" onClick={handleRestart}>
            Restart
          </button>
        )}
      </main>
    </div>
  );
}
