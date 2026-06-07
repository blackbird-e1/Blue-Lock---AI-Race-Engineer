import { useEffect, useState } from 'react';
import { getTrackLayout } from '../services/trackService';
import { getDrivers } from '../services/driverService';

type Props = {
  raceName: string;
};

export default function LiveTrackPreview({
      raceName,
    }: Props)  {
  const [track, setTrack] = useState<{
  x: number[];
  y: number[];
    } | null>(null);

  const [drivers, setDrivers] = useState<string[]>([]);
  const [carProgress, setCarProgress] =
  useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarProgress((prev) =>
        prev.map(
          (position, index) =>
            position + 2 + (index % 3)
        )
      );
    }, 50);

    return () => clearInterval(interval);
  }, [raceName]);

  useEffect(() => {
  async function loadTrack() {
    try {
      const data = await getTrackLayout(
        raceName
      );

      setTrack(data);
    } catch (error) {
      console.error(error);
    }
  }

    loadTrack();
    }, [raceName]);

    useEffect(() => {
    async function loadDrivers() {
      try {
        const data = await getDrivers(
          raceName
        );

      setDrivers(data.drivers);
        } catch (error) {
          console.error(error);
        }
      }

      loadDrivers();
    }, [raceName]);

    useEffect(() => {
}, [drivers]);

    useEffect(() => {
      if (!drivers.length) return;

      setCarProgress(
        drivers.map(
          (_, index) => index * 80
        )
      );
    }, [drivers]);

    useEffect(() => {
 
    }, [carProgress]);  

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

const pathData = normalizedPoints
  .map((point, index) =>
    index === 0
      ? `M ${point.x} ${point.y}`
      : `L ${point.x} ${point.y}`
  )
  .join(' ');

  const cars = drivers.map(
  (driver, index) => {
    const pointIndex =
      Math.floor(
        carProgress[index] ?? 0
      ) % normalizedPoints.length;

    const point =
      normalizedPoints[pointIndex];

    return {
        driver,
        x: point.x,
        y: point.y,
      };
    }
  );

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

        {cars.map((car) => (
  <g key={car.driver}>
    <circle
      cx={car.x}
      cy={car.y}
      r="5"
      fill="#ef4444"
    />

    <text
      x={car.x + 8}
      y={car.y - 8}
      fill="white"
      fontSize="10"
    >
      {car.driver}
        </text>
      </g>
    ))}
      </svg>
    </div>
  );
}