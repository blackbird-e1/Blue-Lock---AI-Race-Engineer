import { useState, useEffect } from 'react';
import { getCalendar } from '../services/calendarService';
import { getWcc } from '../services/wccService';
import { getWdc } from '../services/wdcService';

type Race = {
  race: string;
  date: string;
  status: 'completed' | 'upcoming';
};

export default function CalendarSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const [races, setRaces] =
  useState<Race[]>([]);
  const [wdcData, setWdcData] =
  useState<
    {
      name: string;
      points: number;
      wins: number;
    }[]
  >([]);

  const [wccData, setWccData] =
    useState({
        leader: 'Loading...',
        points: 0,
      });

  useEffect(() => {
    async function loadCalendar() {
        try {
        const data = await getCalendar();
        setRaces(data);
        } catch (error) {
        console.error(error);
        }
    }
    loadCalendar();
    }, []);

    useEffect(() => {
      async function loadWdc() {
        const data = await getWdc();
        setWdcData(data);
      }

      loadWdc();
    }, []);

    useEffect(() => {
      async function loadWcc() {
        const data = await getWcc();
        setWccData(data);
      }

      loadWcc();
    }, []);

    
  const upcomingRaces = races.filter(
    (race) => race.status === 'upcoming'
  );

  const completedRaces = races.filter(
    (race) => race.status === 'completed'
  );

  const leaderPoints =
    wdcData.length > 0
      ? wdcData[0].points
      : 0;

  const leader =
  wdcData.length > 0
    ? wdcData[0]
    : null;

  const challengers =
  wdcData.slice(1);

  return (
    <>
      <button
        className="
          fixed
          left-0
          top-1/2
          -translate-y-1/2
          z-50
          bg-[#161616]
          border
          border-[#2e2e2e]
          rounded-r-lg
          px-2
          py-4
          hover:bg-[#1a1a1a]
          transition-colors
        "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? '←' : '📅'}
      </button>

      <div
        className={[
          'fixed',
          'left-0',
          'top-0',
          'h-screen',
          'w-[1000px]',
          'bg-[#111111]',
          'border-r',
          'border-[#2e2e2e]',
          'z-40',
          'pl-12',
          'pr-6',
          'py-6',
          'overflow-y-auto',
          'transition-transform',
          'duration-300',
          'ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-full">
          <div className="w-[60%] pr-6">
            <h2 className="text-white text-xl font-semibold mb-6">
              F1 Calendar
            </h2>

            <div className="grid grid-cols-2 gap-8">
              
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                Upcoming
              </h3>

              <div className="space-y-1">
                {upcomingRaces.map((race) => (
                  <div
                    key={`${race.race}-${race.date}`}
                    className="
                      flex
                      justify-between
                      items-center
                      border-l-2
                      border-[#e10600]
                      pl-3
                      py-1
                    "
                  >
                    <span className="text-white text-sm">
                      {race.race}
                    </span>

                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {race.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                Completed
              </h3>

              <div className="space-y-1">
                {completedRaces.map((race) => (
                  <div
                    key={`${race.race}-${race.date}`}
                    className="
                      flex
                      justify-between
                      items-center
                      border-b
                      border-[#2e2e2e]
                      py-1
                    "
                  >
                    <span className="text-gray-200 text-sm">
                      ✓ {race.race}
                    </span>

                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {race.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            </div>
          </div>

          <div
            className="
              w-[40%]
              border-l
              border-[#2e2e2e]
              pl-6
            "
          >
            <>
              <h2 className="text-white text-2xl font-semibold mb-6">
                Championship Overview
              </h2>

              <div className="mb-8">
                <div className="text-gray-500 text-sm">
                  WDC Leader
                </div>

                <div className="text-white text-3xl font-bold">
                  {leader?.name}
                </div>

                <div className="text-gray-400 mt-2 mb-6">
                  {leader?.points} pts
                </div>

                <div className="space-y-4">
                  {challengers.map((driver, index) => (
                    <div
                      key={driver.name}
                      className="
                        border-b
                        border-[#2e2e2e]
                        pb-3
                      "
                    >
                      <div className="text-white font-semibold">
                        {index + 2}. {driver.name}
                      </div>

                      <div className="text-gray-400 text-sm">
                        {driver.points} pts
                        {' '}
                        (-{leaderPoints - driver.points})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-gray-500 text-sm">
                  WCC Leader
                </div>

                <div className="text-white text-3xl font-bold">
                  {wccData.leader}
                </div>
                <div className="text-gray-400 mt-2">
                  {wccData.points} pts
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}