import { useEffect, useState } from 'react';
import { getNextRace } from '../services/telemetryService';
import type { NextRace } from '../types';

export default function RaceCountdownWidget() {
  const [race, setRace] = useState<NextRace | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    async function loadRace() {
      try {
        const data = await getNextRace();
        setRace(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadRace();
  }, []);

  useEffect(() => {
  if (!race) return;

  console.log('SESSION:', race.next_session_name);
  console.log('TIME:', race.next_session_time_ist);

  const interval = setInterval(() => {
    const target = new Date(
      race.next_session_time_ist
    );

    const now = new Date();

    const diff =
      target.getTime() - now.getTime();

    if (diff <= 0) {
      setCountdown('LIVE');
      return;
    }

    const days = Math.floor(
      diff / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24))
      / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (diff % (1000 * 60 * 60))
      / (1000 * 60)
    );

    setCountdown(
      `${days}D ${hours}H ${minutes}M`
    );
  }, 1000);

  return () => clearInterval(interval);
}, [race]);

  if (!race) return null;

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="
          fixed
          bottom-6
          right-6
          z-50
          bg-[#161616]
          border
          border-[#2e2e2e]
          rounded-xl
          px-4
          py-3
          text-white
          cursor-pointer
        "
      >
        🏎️
      </button>
    );
  }

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-50
        w-64
        bg-[#161616]
        border
        border-[#2e2e2e]
        rounded-2xl
        p-4
        shadow-xl
      "
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-[#e10600] font-bold">
          NEXT RACE
        </span>

        <button
          onClick={() => setCollapsed(true)}
          className="text-gray-400 cursor-pointer"
        >
          −
        </button>
      </div>

      <h3 className="text-white font-semibold">
        {race.race_name}
      </h3>

      <p className="text-gray-400 text-sm">
        {race.location}
      </p>

      <div className="mt-4 text-xl font-bold text-white">
        <p className="text-gray-400 text-sm">
        {race.next_session_name}
        </p>
        {countdown}
      </div>
    </div>
  );
}