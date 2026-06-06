import { useEffect, useState } from 'react';
import { getTrackLayout } from '../services/trackService';

export default function LiveTrackPreview() {
  const [car1Progress, setCar1Progress] = useState(0);
  const [car2Progress, setCar2Progress] = useState(120);
  const [track, setTrack] = useState<{
  x: number[];
  y: number[];
    } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCar1Progress((prev) => (prev + 2));
      setCar2Progress((prev) => (prev + 3));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  async function loadTrack() {
    try {
      const data = await getTrackLayout();

      console.log('TRACK LOADED');
      console.log(data);

      setTrack(data);
    } catch (error) {
      console.error(error);
    }
  }

    loadTrack();
    }, []);


    if (!track) {
  return (
    <div className="text-white">
      Loading track...
    </div>
    );
    }

  const minX = Math.min(...track.x);
const maxX = Math.max(...track.x);

const minY = Math.min(...track.y);
const maxY = Math.max(...track.y);

const width = 600;
const height = 280;
const padding = 40;

const normalizedPoints = track.x.map(
  (x, index) => {
    const y = track.y[index];

    return {
      x:
        ((x - minX) /
          (maxX - minX)) *
          (width - padding * 2) +
        padding,

      y:
        ((y - minY) /
          (maxY - minY)) *
          (height - padding * 2) +
        padding,
    };
  }
);

  const car1Index =
  Math.floor(car1Progress) % normalizedPoints.length;

  const car1 =
  normalizedPoints[car1Index];
  
  const car2Index =
  Math.floor(car2Progress) % normalizedPoints.length;

  const car2 =
  normalizedPoints[car2Index];

const pathData = normalizedPoints
  .map((point, index) =>
    index === 0
      ? `M ${point.x} ${point.y}`
      : `L ${point.x} ${point.y}`
  )
  .join(' ');

  return (
    <div className="flex justify-center">
      <svg
        width="650"
        height="320"
        viewBox="0 0 650 320"
      >
        <path
            d={pathData}
            fill="none"
            stroke="white"
            strokeWidth="4"
        />

        <circle
          cx={car1.x}
          cy={car1.y}
          r="7"
          fill="#f59e0b"
        />

        <text
          x={car1.x + 12}
          y={car1.y - 10}
          fill="white"
          fontSize="12"
        >
          NOR
        </text>

        <circle
          cx={car2.x}
          cy={car2.y}
          r="7"
          fill="#ef4444"
        />

        <text
          x={car2.x + 12}
          y={car2.y - 10}
          fill="white"
          fontSize="12"
        >
          VER
        </text>
      </svg>
    </div>
  );
}