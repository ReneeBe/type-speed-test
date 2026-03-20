import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomPassage } from "../data/passages";

export type TestStatus = "idle" | "running" | "finished";

export interface TypingState {
  passage: string;
  typed: string;
  status: TestStatus;
  startTime: number | null;
  elapsed: number;
  wpm: number;
  accuracy: number;
  errors: number;
}

export function useTypingTest() {
  const [state, setState] = useState<TypingState>({
    passage: getRandomPassage(),
    typed: "",
    status: "idle",
    startTime: null,
    elapsed: 0,
    wpm: 0,
    accuracy: 100,
    errors: 0,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const calcStats = useCallback(
    (typed: string, startTime: number, passage: string) => {
      const elapsed = (Date.now() - startTime) / 1000;
      const minutes = elapsed / 60;
      const wordCount = typed.trim().split(/\s+/).filter(Boolean).length;
      const wpm = minutes > 0 ? Math.round(wordCount / minutes) : 0;

      let errors = 0;
      for (let i = 0; i < typed.length; i++) {
        if (typed[i] !== passage[i]) errors++;
      }
      const accuracy =
        typed.length > 0
          ? Math.round(((typed.length - errors) / typed.length) * 100)
          : 100;

      return { elapsed, wpm, accuracy, errors };
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleInput = useCallback(
    (value: string) => {
      setState((prev) => {
        if (prev.status === "finished") return prev;

        let startTime = prev.startTime;
        let status: TestStatus = prev.status;

        if (prev.status === "idle" && value.length > 0) {
          startTime = Date.now();
          status = "running";
          timerRef.current = setInterval(() => {
            setState((s) => {
              if (s.status !== "running" || !s.startTime) return s;
              const stats = calcStats(s.typed, s.startTime, s.passage);
              return { ...s, elapsed: stats.elapsed };
            });
          }, 100);
        }

        const stats =
          startTime ? calcStats(value, startTime, prev.passage) : null;

        const isFinished = value === prev.passage;
        if (isFinished) {
          status = "finished";
          if (timerRef.current) clearInterval(timerRef.current);
        }

        return {
          ...prev,
          typed: value,
          status,
          startTime,
          ...(stats ? stats : {}),
        };
      });
    },
    [calcStats]
  );

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState({
      passage: getRandomPassage(),
      typed: "",
      status: "idle",
      startTime: null,
      elapsed: 0,
      wpm: 0,
      accuracy: 100,
      errors: 0,
    });
  }, []);

  return { state, handleInput, reset };
}
