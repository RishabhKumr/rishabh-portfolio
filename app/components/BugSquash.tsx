"use client";
import { useState, useEffect } from "react";

const GRID = 9;
const BUGS = ["🐛", "🦟", "🐜", "🪲"];

export default function BugSquash() {
  const [activeBug, setActiveBug] = useState<number | null>(null);
  const [bugType, setBugType] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [flash, setFlash] = useState<number | null>(null);

  useEffect(() => {
    if (!started || over) return;
    const speed = Math.max(400, 850 - score * 20);
    const id = setInterval(() => {
      setActiveBug((prev) => {
        if (prev !== null) {
          setLives((l) => {
            const next = l - 1;
            if (next <= 0) setOver(true);
            return Math.max(0, next);
          });
        }
        setBugType(Math.floor(Math.random() * BUGS.length));
        return Math.floor(Math.random() * GRID);
      });
    }, speed);
    return () => clearInterval(id);
  }, [started, over, score]);

  const squash = (i: number) => {
    if (i !== activeBug || over) return;
    setFlash(i);
    setScore((s) => s + 1);
    setActiveBug(null);
    setTimeout(() => setFlash(null), 180);
  };

  const restart = () => {
    setLives(3);
    setScore(0);
    setOver(false);
    setActiveBug(null);
    setStarted(true);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-72 rounded-2xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-semibold text-violet-400 tracking-wider">
            BUG SQUASH 🎮
          </span>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-zinc-400">
              <span className="text-zinc-500">pts </span>
              <span className="text-white font-bold">{score}</span>
            </span>
            <span>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={i < lives ? "text-red-400" : "text-zinc-700"}>
                  ♥
                </span>
              ))}
            </span>
          </div>
        </div>

        {!started ? (
          <div className="flex flex-col items-center gap-3 py-7">
            <span className="text-4xl animate-bounce">🐛</span>
            <p className="text-sm text-zinc-400 text-center leading-snug">
              Click the bugs before
              <br />
              they escape!
            </p>
            <button
              onClick={restart}
              className="mt-1 px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition-colors"
            >
              Start Game
            </button>
          </div>
        ) : over ? (
          <div className="flex flex-col items-center gap-3 py-7">
            <span className="text-3xl">💀</span>
            <p className="font-bold text-base">Game Over!</p>
            <p className="text-sm text-zinc-400">
              Score:{" "}
              <strong className="text-violet-400">{score}</strong>
            </p>
            <button
              onClick={restart}
              className="mt-1 px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: GRID }).map((_, i) => (
              <button
                key={i}
                onClick={() => squash(i)}
                className={`h-[68px] rounded-xl border text-2xl flex items-center justify-center transition-all duration-100 select-none
                  ${
                    flash === i
                      ? "bg-green-500/20 border-green-500/40 scale-90"
                      : activeBug === i
                      ? "bg-white/8 border-white/15 hover:bg-white/12 cursor-pointer animate-pulse"
                      : "bg-white/3 border-white/5 cursor-default"
                  }`}
              >
                {activeBug === i ? BUGS[bugType] : ""}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="text-xs text-zinc-600 font-mono">// a little fun while you browse</p>
    </div>
  );
}
