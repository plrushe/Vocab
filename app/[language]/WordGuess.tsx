"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import type { DisplayWord } from "@/lib/word-of-the-day";

type ConfettiStyle = CSSProperties & { "--confetti-rotate": string; "--confetti-drift": string };

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function acceptedAnswers(english: string): string[] {
  const variants = new Set<string>();
  for (const part of english.split(";")) {
    const answer = normalize(part);
    if (!answer) continue;
    variants.add(answer);
    if (answer.startsWith("to ")) variants.add(answer.slice(3));
  }
  return [...variants];
}

type Stage = "guessing" | "hint" | "revealed" | "correct";
type CompletedStage = Extract<Stage, "correct" | "revealed">;

const STORAGE_PREFIX = "wotd-guess";

function storageKey(language: string, dateKey: string): string {
  return `${STORAGE_PREFIX}:${language}:${dateKey}`;
}

function readStoredStage(language: string, dateKey: string): CompletedStage | null {
  try {
    const raw = window.localStorage.getItem(storageKey(language, dateKey));
    return raw === "correct" || raw === "revealed" ? raw : null;
  } catch {
    return null;
  }
}

function writeStoredStage(language: string, dateKey: string, stage: CompletedStage): void {
  try {
    window.localStorage.setItem(storageKey(language, dateKey), stage);
  } catch {
    // localStorage unavailable (private browsing, disabled storage, etc.) — completion just won't persist.
  }
}

const CONFETTI_COLORS = ["#16a34a", "#22c55e", "#4ade80", "#065f46", "#86efac"];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.15,
        duration: 0.9 + Math.random() * 0.6,
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 80,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      })),
    [],
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          key={index}
          className="confetti__piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            "--confetti-rotate": `${piece.rotation}deg`,
            "--confetti-drift": `${piece.drift}px`,
          } as ConfettiStyle}
        />
      ))}
    </div>
  );
}

export function WordGuess({
  word,
  pronunciationLang,
  language,
  dateKey,
}: {
  word: DisplayWord;
  pronunciationLang: string;
  language: string;
  dateKey: string;
}) {
  const [stage, setStage] = useState<Stage>("guessing");
  const [guess, setGuess] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const showPronunciation = stage !== "guessing";

  useEffect(() => {
    const stored = readStoredStage(language, dateKey);
    if (stored) setStage(stored);
  }, [language, dateKey]);

  useEffect(() => {
    if (!showConfetti) return;
    const timeout = setTimeout(() => setShowConfetti(false), 1600);
    return () => clearTimeout(timeout);
  }, [showConfetti]);

  // Keeps the word (and the answer box) above the on-screen keyboard: some
  // mobile browsers don't shrink layout viewport units (dvh) or honour the
  // interactive-widget viewport meta when the keyboard opens, so track the
  // real visible height via the VisualViewport API instead and switch to a
  // compact layout whenever it gets keyboard-sized.
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      const compact = viewport.height < 560;
      document.documentElement.style.setProperty("--vvh", `${viewport.height}px`);
      document.documentElement.classList.toggle("is-keyboard-compact", compact);
      // Some browsers scroll the whole page to bring the focused input above
      // the keyboard before this listener runs, using the pre-compact layout
      // — which shoves the hanzi off-screen. Once compact styles guarantee
      // everything fits without scrolling, cancel that scroll out.
      if (compact) window.scrollTo(0, 0);
    };

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
      document.documentElement.classList.remove("is-keyboard-compact");
      document.documentElement.style.removeProperty("--vvh");
    };
  }, []);

  function complete(stage: CompletedStage) {
    setStage(stage);
    writeStoredStage(language, dateKey, stage);
    if (stage === "correct") setShowConfetti(true);
  }

  function submitGuess() {
    const trimmed = guess.trim();
    if (!trimmed) return;

    if (acceptedAnswers(word.english).includes(normalize(trimmed))) {
      complete("correct");
      return;
    }

    if (stage === "guessing") {
      setStage("hint");
      setGuess("");
      // The button steals focus on tap, which dismisses the keyboard — bring
      // it straight back so the user can type their second guess immediately.
      inputRef.current?.focus();
    } else {
      complete("revealed");
    }
  }

  return (
    <div className="word-page__guess">
      {showConfetti && <Confetti />}
      <p
        className={`word-page__pinyin word-page__pinyin--reveal ${showPronunciation ? "is-visible" : ""}`}
        lang={pronunciationLang}
        aria-hidden={!showPronunciation}
      >
        {word.pronunciation}
      </p>

      {stage === "revealed" || stage === "correct" ? (
        <p
          className={`word-page__english word-page__english--reveal is-visible ${
            stage === "correct" ? "word-page__english--correct" : ""
          }`}
        >
          {stage === "revealed" && <span className="word-page__guess-message">The correct answer is:</span>}
          {stage === "correct" && <span className="word-page__guess-message word-page__guess-message--correct">Correct!</span>}
          <span>{word.english}</span>
        </p>
      ) : (
        <form
          className="word-page__guess-form"
          onSubmit={(event) => {
            event.preventDefault();
            submitGuess();
          }}
        >
          <label htmlFor={inputId} className="word-page__guess-label">
            Guess the English meaning
          </label>
          <input
            id={inputId}
            ref={inputRef}
            className="word-page__guess-input"
            type="text"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            placeholder="Type your guess..."
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button type="submit" className="word-page__guess-button">
            Check Answer
          </button>
          {stage === "hint" && (
            <p className="word-page__guess-message">Not quite — here&apos;s a hint. Try again.</p>
          )}
        </form>
      )}
    </div>
  );
}
