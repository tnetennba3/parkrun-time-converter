'use client';

import { useState } from 'react';

import sss from '@/data/sss';
import { calculateAdjustedTime } from '@/utils/calculateAdjustedTime';

export default function Home() {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [currentParkrun, setCurrentParkrun] = useState('Finsbury Park');
  const [targetParkrun, setTargetParkrun] = useState('Highbury Fields');
  const [adjustedTime, setAdjustedTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convertTime = () => {
    const min = parseInt(minutes);
    const sec = parseInt(seconds);

    // Validation checks
    if (isNaN(min) || min < 13) {
      setError('Please enter a valid number of minutes (13 or more).');
      setAdjustedTime(null);
      return;
    }

    if (isNaN(sec) || sec < 0 || sec >= 60) {
      setError('Seconds must be between 0 and 59.');
      setAdjustedTime(null);
      return;
    }

    setError(null); // Clear any previous error

    const adjusted = calculateAdjustedTime(min, sec, sss[currentParkrun], sss[targetParkrun]);
    setAdjustedTime(adjusted);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Parkrun Time Converter</h1>
      <p>Enter your parkrun time and compare it across different courses.</p>

      <div style={{ marginTop: '1rem' }}>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>
          Current Parkrun:
          <select
            value={currentParkrun}
            onChange={(e) => setCurrentParkrun(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            {Object.keys(sss).map((parkrun) => (
              <option key={parkrun} value={parkrun}>
                {parkrun}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>
          Target Parkrun:
          <select
            value={targetParkrun}
            onChange={(e) => setTargetParkrun(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            {Object.keys(sss).map((parkrun) => (
              <option key={parkrun} value={parkrun}>
                {parkrun}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={convertTime} style={{ marginTop: '1rem' }}>
        Convert
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}

      {adjustedTime && (
        <h2 style={{ marginTop: '1rem' }}>
          Estimated time at {targetParkrun}: {adjustedTime}
        </h2>
      )}
    </main>
  );
}