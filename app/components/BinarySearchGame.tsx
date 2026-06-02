"use client";
import { useState } from "react";

interface GameState {
  arr: number[];
  target: number;
  lo: number;
  hi: number;
  steps: number;
}

function newRound(): GameState {
  const set = new Set<number>();
  while (set.size < 12) set.add(Math.floor(Math.random() * 98) + 2);
  const arr = Array.from(set).sort((a, b) => a - b);
  const targetIdx = Math.floor(Math.random() * arr.length);
  return { arr, target: arr[targetIdx], lo: 0, hi: arr.length - 1, steps: 0 };
}

export default function BinarySearchGame() {
  const [game, setGame] = useState<GameState>(newRound);
  const [found, setFound] = useState(false);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const { arr, target, lo, hi, steps } = game;
  const mid = Math.floor((lo + hi) / 2);
  const midVal = arr[mid];
  const isExact = midVal === target;
  const optimal = Math.ceil(Math.log2(arr.length));

  const go = (dir: "lower" | "higher") => {
    setGame((g) => {
      const m = Math.floor((g.lo + g.hi) / 2);
      const next = {
        ...g,
        lo: dir === "higher" ? m + 1 : g.lo,
        hi: dir === "lower" ? m - 1 : g.hi,
        steps: g.steps + 1,
      };
      if (next.lo > next.hi) setFailed(true);
      return next;
    });
  };

  const restart = () => {
    setGame(newRound());
    setFound(false);
    setFailed(false);
    setShowHints(false);
    setStarted(true);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-72 rounded-2xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-semibold text-violet-400 tracking-wider">
            BINARY SEARCH 🔍
          </span>
          {started && !found && !failed && (
            <span className="text-xs font-mono text-zinc-500">
              step <span className="text-white font-bold">{steps + 1}</span>
            </span>
          )}
        </div>

        {!started ? (
          /* ── START SCREEN ── */
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex gap-1">
              {[3, 9, "?", 21, 35].map((n, i) => (
                <span
                  key={i}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-mono font-bold border ${
                    n === "?"
                      ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                      : "bg-white/5 border-white/10 text-zinc-400"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-200 mb-1">Binary Search Game</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Guide the algorithm to find<br />the target using O(log n) logic
              </p>
            </div>
            <button
              onClick={restart}
              className="px-6 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition-colors"
            >
              Start
            </button>
          </div>
        ) : failed ? (
          /* ── FAILURE SCREEN ── */
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span className="text-3xl">❌</span>
            <div>
              <p className="font-bold text-base text-red-400">Wrong direction!</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                You eliminated <span className="text-violet-300 font-bold">{target}</span> from the search range.<br />
                Remember: go <span className="text-green-400">Higher</span> if mid &lt; target,<br />
                go <span className="text-red-400">Lower</span> if mid &gt; target.
              </p>
            </div>
            <div className="w-full rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-mono text-zinc-400">
              After <span className="text-white font-bold">{steps}</span> step{steps !== 1 ? "s" : ""}, search range was exhausted
            </div>
            <button
              onClick={restart}
              className="mt-1 px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : found ? (
          /* ── FOUND SCREEN ── */
          <div className="flex flex-col items-center gap-2 py-5 text-center">
            <span className="text-3xl">🎯</span>
            <p className="font-bold text-base">
              Found <span className="text-violet-400">{target}</span>!
            </p>
            <div className="flex gap-5 text-xs font-mono mt-1">
              <span className="text-zinc-400">
                Your steps:{" "}
                <strong className={steps <= optimal ? "text-green-400" : "text-yellow-400"}>
                  {steps}
                </strong>
              </span>
              <span className="text-zinc-400">
                Optimal: <strong className="text-zinc-300">~{optimal}</strong>
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {steps <= optimal
                ? "Perfect — O(log n)! 🚀"
                : `${steps - optimal} step${steps - optimal > 1 ? "s" : ""} above optimal`}
            </p>
            <button
              onClick={restart}
              className="mt-2 px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition-colors"
            >
              New Game
            </button>
          </div>
        ) : (
          /* ── GAME SCREEN ── */
          <div className="flex flex-col gap-3">
            {/* Target */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono">Find:</span>
              <span className="font-black font-mono text-violet-300 bg-violet-500/15 border border-violet-500/30 rounded-lg px-3 py-0.5 text-base tracking-wide">
                {target}
              </span>
            </div>

            {/* Array cells */}
            <div className="flex gap-1 flex-wrap justify-center">
              {arr.map((n, i) => {
                const inRange = i >= lo && i <= hi;
                const isMid = i === mid;
                return (
                  <span
                    key={i}
                    className={`w-[38px] h-[38px] flex items-center justify-center rounded-lg text-xs font-mono font-bold border transition-all duration-150 ${
                      isMid
                        ? "bg-violet-500/30 border-violet-400/70 text-violet-100 scale-110 shadow-lg shadow-violet-900/50 z-10 relative"
                        : inRange
                        ? "bg-white/8 border-white/15 text-zinc-300"
                        : "bg-transparent border-white/5 text-zinc-700"
                    }`}
                  >
                    {n}
                  </span>
                );
              })}
            </div>

            {/* Mid label */}
            <p className="text-center text-xs text-zinc-600 font-mono -mt-1">
              mid →{" "}
              <span className="text-violet-300 font-bold">{midVal}</span>
              {isExact && (
                <span className="text-green-400 ml-1">= target!</span>
              )}
            </p>

            {/* Action buttons */}
            {isExact ? (
              <button
                onClick={() => setFound(true)}
                className="w-full py-2.5 rounded-xl bg-green-500/15 border border-green-500/40 text-green-300 font-semibold text-sm hover:bg-green-500/25 transition-colors"
              >
                ✓ That&apos;s it!
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => go("lower")}
                  disabled={lo >= mid}
                  className="py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-semibold hover:bg-white/10 hover:border-violet-500/30 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  ← Lower
                </button>
                <button
                  onClick={() => go("higher")}
                  disabled={hi <= mid}
                  className="py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-semibold hover:bg-white/10 hover:border-violet-500/30 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  Higher →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Cheat Sheet */}
      <div className="w-72">
        <button
          onClick={() => setShowHints((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl border border-white/8 bg-white/3 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:border-white/15 transition-all"
        >
          <span>📖 How to play</span>
          <span className="text-zinc-600">{showHints ? "▲ hide" : "▼ show"}</span>
        </button>
        {showHints && (
          <div className="mt-2 rounded-xl border border-white/8 bg-white/3 p-4 text-xs text-zinc-400 space-y-2 font-mono">
            <p className="text-violet-300 font-bold mb-1">Binary Search Cheat Sheet</p>
            {[
              ["1.", "A target number is shown at the top."],
              ["2.", "The violet cell is the current mid-point of the search range."],
              ["3.", "If mid < target → click Higher →"],
              ["4.", "If mid > target → click ← Lower"],
              ["5.", "If mid = target → click ✓ That's it!"],
              ["6.", "Grey cells are eliminated — don't count them."],
              ["7.", "Optimal = ⌈log₂(n)⌉ steps. Beat it! 🚀"],
            ].map(([num, tip]) => (
              <div key={num} className="flex gap-2">
                <span className="text-violet-500 shrink-0">{num}</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
