import { useEffect, useState } from 'react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="
    bg-white
    dark:bg-[#161616]
    border
    border-gray-300
    dark:border-[#2e2e2e]
    rounded-xl
    p-4
    ">
        <p className="text-xs text-gray-600 dark:text-gray-400">
            {title}
        </p>

        <p className="text-xl font-semibold text-black dark:text-white mt-2">
            {value}
        </p>
    </div>
  );
}

type Props = {
  sessionId: string;
};

type LapAnalysisResponse = {
  stats: {
    fastestLap: string;
    avgLapTime: string;
    topSpeed: number;
    consistency: number;
  };
  comparisonData: {
    time: number;
    lapA: number;
    lapB: number;
  }[];
  insights: string[];
};

export default function LapAnalysisDashboard({
        sessionId,
        }: Props) 
    {
    const [lapData, setLapData] =
    useState<LapAnalysisResponse | null>(null);

    useEffect(() => {
        if (!sessionId) {
            return;
        }

        fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/lap/analysis/${sessionId}`
        )
            .then((res) => res.json())
            .then((data: LapAnalysisResponse) => setLapData(data))
            .catch((err) => console.error(err));
        }, [sessionId]);

    return (
        <div className="space-y-6 mb-8">
        <div>
            <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
            Lap Intelligence Dashboard
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    title="Fastest Lap"
                    value={lapData ? lapData.stats.fastestLap : '--'}
                />

                <StatCard
                    title="Avg Lap Time"
                    value={lapData ? lapData.stats.avgLapTime : '--'}
                />

                <StatCard
                    title="Top Speed"
                    value={
                        lapData
                        ? `${lapData.stats.topSpeed} km/h`
                        : '--'
                    }
                />

                <StatCard
                    title="Consistency"
                    value={
                        lapData
                        ? `${lapData.stats.consistency}%`
                        : '--'
                    }
                />
            </div>
        </div>

        <div className="
            bg-white
            dark:bg-[#161616]
            border
            border-gray-300
            dark:border-[#2e2e2e]
            rounded-2xl
            p-5
            ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <h3 className="text-black dark:text-white font-medium">
                Lap Comparison
            </h3>

            <div className="flex items-center gap-3">
                <select
                className="
                    bg-white
                    dark:bg-[#1f1f1f]
                    border
                    border-gray-300
                    dark:border-[#2e2e2e]
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    text-black
                    dark:text-white
                "
                >
                <option>Fastest Lap</option>
                <option>Lap 2</option>
                <option>Lap 3</option>
                </select>

                <span className="text-gray-400 text-sm">vs</span>

                <select
                    className="
                        bg-white
                        dark:bg-[#1f1f1f]
                        border
                        border-gray-300
                        dark:border-[#2e2e2e]
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        text-black
                        dark:text-white
                    "
                    >
                <option>Lap 4</option>
                <option>Lap 5</option>
                <option>Lap 6</option>
                </select>
            </div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lapData ? lapData.comparisonData : []}>
                <CartesianGrid stroke="#2a2a2a" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line
                type="monotone"
                dataKey="lapA"
                stroke="#e10600"
                dot={false}
                strokeWidth={2}
                />
                <Line
                type="monotone"
                dataKey="lapB"
                stroke="#3b82f6"
                dot={false}
                strokeWidth={2}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="
            bg-white
            dark:bg-[#161616]
            border
            border-gray-300
            dark:border-[#2e2e2e]
            rounded-2xl
            p-5
            ">
            <h3 className="text-black dark:text-white font-medium mb-4">
            AI Lap Insights
            </h3>

            <div className="space-y-3">
            {(lapData ? lapData.insights : []).map((insight, index) => (
                <div
                key={index}
                className="
                    text-sm
                    text-gray-700
                    dark:text-gray-300
                    bg-gray-100
                    dark:bg-[#1f1f1f]
                    border
                    border-gray-300
                    dark:border-[#2a2a2a]
                    rounded-lg
                    px-3
                    py-2
                    "
                >
                • {insight}
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}