import { useEffect, useState } from 'react';
import { getNextRace } from '../services/telemetryService';
import type { NextRace } from '../types';
import LiveTrackPreview from './LiveTrackPreview';
// import { getLeaderboard } from '../services/leaderboardService';

export default function RaceCountdownWidget() {
  const [race, setRace] = useState<NextRace | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [showLiveModal, setShowLiveModal] =
  useState(false);

  // const [leader, setLeader] =
  //   useState('');

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

    const interval = setInterval(
        loadRace,
        60000
  );

  return () => clearInterval(interval);
  }, []);


// useEffect(() => {
//   if (!race) return;

//   const currentRace = race;

//   async function loadLeaderboard() {
//     try {
//       const data = await getLeaderboard(
//         currentRace.race_name
//       );

//       setLeader(data.leader);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   loadLeaderboard();

//   const interval = setInterval(
//     loadLeaderboard,
//     30000
//   );

//   return () => clearInterval(interval);

// }, [race]);

  useEffect(() => {
  if (!race) return;

  if (race.is_live) {
    setCountdown('LIVE');
    return;
  }

  const interval = setInterval(() => {
    const target = new Date(
      race.next_session_time_ist
    );

    const now = new Date();

    const diff =
      target.getTime() - now.getTime();

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
    <>
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
        {/* {race.is_live ? (
            <button
              onClick={() => setShowLiveModal(true)}
              className="
                mt-2
                px-3
                py-2
                bg-[#e10600]
                animate-pulse
                rounded-lg
                text-white
                text-sm
                font-semibold
                cursor-pointer
              "
            >
              🔴 LIVE NOW
            </button>
          ) : (
            countdown
          )} */}

          {race.is_live ? (
            <div
              className="
                mt-2
                px-3
                py-2
                bg-[#e10600]
                rounded-lg
                text-white
                text-sm
                font-semibold
              "
            >
              🔴 LIVE NOW
            </div>
          ) : (
            countdown
          )}
      </div>
    </div>
  
    {showLiveModal && (
      <div
        className="
          fixed
          inset-0
          bg-black/70
          z-[100]
          flex
          items-center
          justify-center
        "
        onClick={() => setShowLiveModal(false)}
      >
              <div
                onClick={(e) => e.stopPropagation()}
                className="
                  w-full
                  max-w-[700px]
                  h-[500px]
                  mx-4
                  bg-[#161616]
                  border
                  border-[#2e2e2e]
                  rounded-2xl
                  p-6
                "
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-white font-bold">
                      🔴 {race.race_name}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      {race.location}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setShowLiveModal(false)
                    }
                    className="
                      text-gray-400
                      hover:text-white
                      cursor-pointer
                    "
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6">
                  <LiveTrackPreview 
                    raceName={race.race_name}
                  />

                  
                {/* <div className="mt-4 text-white text-sm">
                  🏁 Leader: {leader}
                </div> */}
                </div>
              </div>
            </div>
          )}
        </>)
}