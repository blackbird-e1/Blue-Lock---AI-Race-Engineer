import { useState, useEffect } from 'react';
import { getCalendar } from '../services/calendarService';
import { getPodium } from '../services/podiumService';

type Race = {
  race: string;
  date: string;
  status: 'completed' | 'upcoming';
  podium?: string[];
};

export default function CalendarSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRace, setHoveredRace] =
    useState<string | null>(null);
  const [races, setRaces] =
  useState<Race[]>([]);
  const [podiums, setPodiums] =
  useState<Record<string, string[]>>({});

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

    async function handleHover(
        raceName: string
        ) {
        setHoveredRace(raceName);

        if (podiums[raceName]) {
            return;
        }

        try {
            const data =
            await getPodium(raceName);

            setPodiums((prev) => ({
            ...prev,
            [raceName]: data,
            }));
        } catch (error) {
            console.error(error);
        }
        }

  const upcomingRaces = races.filter(
    (race) => race.status === 'upcoming'
  );

  const completedRaces = races.filter(
    (race) => race.status === 'completed'
  );

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
          cursor-pointer
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
          'w-80',
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
        <h2 className="text-white text-xl font-semibold mb-6">
          F1 Calendar
        </h2>

        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            Upcoming
          </h3>

          <div className="space-y-3">
            {upcomingRaces.map((race) => (
              <div
                key={race.race}
                className="
                  border-l-2
                  border-[#e10600]
                  pl-3
                  py-2
                "
              >
                <div className="text-white font-medium">
                  🏁 {race.race}
                </div>

                <div className="text-sm text-gray-400">
                  {race.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            Completed
          </h3>

          <div className="space-y-3">
            {completedRaces.map((race) => (
              <div
                key={race.race}
                className="
                  border-b
                  border-[#2e2e2e]
                  pb-3
                  cursor-pointer
                "
                onMouseEnter={() =>
                  handleHover(race.race)
                }
                onMouseLeave={() =>
                  setHoveredRace(null)
                }
              >
                <div className="text-gray-200 font-medium">
                  ✓ {race.race}
                </div>

                <div className="text-sm text-gray-500">
                  {race.date}
                </div>

                {hoveredRace === race.race && (
                    <div className="mt-3 space-y-1 text-sm text-gray-300">
                        {!podiums[race.race] ? (
                        <div className="text-gray-500">
                            Loading podium...
                        </div>
                        ) : (
                        <>
                            <div>
                            🥇 {podiums[race.race][0]}
                            </div>

                            <div>
                            🥈 {podiums[race.race][1]}
                            </div>

                            <div>
                            🥉 {podiums[race.race][2]}
                            </div>
                        </>
                        )}
                    </div>
                    )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}