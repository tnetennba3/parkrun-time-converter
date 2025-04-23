"use client";

import { useState } from "react";

import sss from "@/data/sss";
import { calculateAdjustedTime } from "@/utils/calculateAdjustedTime";

export default function Home() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [currentParkrun, setCurrentParkrun] = useState("Finsbury Park");
  const [targetParkrun, setTargetParkrun] = useState("Highbury Fields");
  const [adjustedTime, setAdjustedTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convertTime = () => {
    const min = parseInt(minutes);
    const sec = parseInt(seconds);

    // Validation checks
    if (isNaN(min) || min < 13) {
      setError("Minutes must be 13 or more.");
      setAdjustedTime(null);
      return;
    }

    if (isNaN(sec) || sec < 0 || sec >= 60) {
      setError("Seconds must be between 0 and 59.");
      setAdjustedTime(null);
      return;
    }

    setError(null); // Clear any previous error

    const adjusted = calculateAdjustedTime(
      min,
      sec,
      sss[currentParkrun],
      sss[targetParkrun],
    );
    setAdjustedTime(adjusted);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="border-border-surface bg-bg-surface w-full max-w-xl space-y-6 rounded-2xl border p-8 shadow-lg sm:p-12">
        <h1 className="text-center text-3xl font-bold">
          Parkrun Time Converter
        </h1>
        <p className="text-text-subdued text-center">
          Enter your parkrun time and compare it with different courses.
        </p>

        <div className="flex space-x-4">
          <label className="flex-1">
            <span className="mb-1 block font-medium">Minutes:</span>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="border-border-input bg-bg-input w-full rounded-lg border p-2 focus:ring-2 focus:outline-none"
            />
          </label>
          <label className="flex-1">
            <span className="mb-1 block font-medium">Seconds:</span>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="border-border-input bg-bg-input w-full rounded-lg border p-2 focus:ring-2 focus:outline-none"
            />
          </label>
        </div>

        <div>
          <label className="mb-1 block font-medium">Current Parkrun:</label>
          <select
            value={currentParkrun}
            onChange={(e) => setCurrentParkrun(e.target.value)}
            className="border-border-input bg-bg-input w-full rounded-lg border p-2 focus:ring-2 focus:outline-none"
          >
            {Object.keys(sss).map((parkrun) => (
              <option key={parkrun} value={parkrun}>
                {parkrun}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block font-medium">Target Parkrun:</label>
          <select
            value={targetParkrun}
            onChange={(e) => setTargetParkrun(e.target.value)}
            className="border-border-input bg-bg-input w-full rounded-lg border p-2 focus:ring-2 focus:outline-none"
          >
            {Object.keys(sss).map((parkrun) => (
              <option key={parkrun} value={parkrun}>
                {parkrun}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={convertTime}
          className="bg-bg-button hover:bg-bg-button-hover w-full rounded-lg py-3 text-lg font-semibold transition focus:ring-2 focus:outline-none"
        >
          Convert
        </button>

        {error && (
          <p className="text-text-error text-center font-bold">{error}</p>
        )}

        {adjustedTime && (
          <p className="text-center text-xl">
            Estimated time at {targetParkrun}:{" "}
            <span className="text-2xl font-semibold">{adjustedTime}</span>
          </p>
        )}
      </div>
    </main>
  );
}
