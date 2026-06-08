import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { TelemetryPoint, TelemetryMetrics } from '../types';
import { useTheme } from '../hooks/useTheme';

interface TelemetryDashboardProps {
  telemetry: TelemetryPoint[];
  metrics: TelemetryMetrics | null;
  issues: string[];
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div
      className="
        bg-white
        dark:bg-[#161616]
        border
        border-gray-200
        dark:border-[#2e2e2e]
        shadow-md
        dark:shadow-none
        rounded-2xl
        p-5
      "
    >
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {title}
      </p>

      <p className="text-xl font-semibold text-black dark:text-white mt-2">
        {value}
      </p>
    </div>
  );
}

export default function TelemetryDashboard({
  telemetry,
  metrics,
}: TelemetryDashboardProps) {
  if (!telemetry.length || !metrics) return null;

  const maxSpeed = Math.max(...telemetry.map((t) => t.speed));
  const avgSpeed =
    telemetry.reduce((sum, t) => sum + t.speed, 0) / telemetry.length;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="space-y-6 mb-8">
      <div>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
          Driver Performance Dashboard
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Max Speed"
            value={`${maxSpeed.toFixed(0)} km/h`}
          />

          <StatCard
            title="Avg Speed"
            value={`${avgSpeed.toFixed(0)} km/h`}
          />

          <StatCard
            title="Avg Throttle"
            value={`${metrics.avg_throttle.toFixed(1)}%`}
          />

          <StatCard
            title="Avg Brake"
            value={`${metrics.avg_brake.toFixed(1)}%`}
          />
        </div>
      </div>

      <div
        className="
          bg-white
          dark:bg-[#161616]
          border
          border-gray-200
          dark:border-[#2e2e2e]
          shadow-md
          dark:shadow-none
          rounded-2xl
          p-5
        "
      >
        <h3 className="text-black dark:text-white font-medium mb-4">
          Speed vs Time
        </h3>

        <ResponsiveContainer   key={`speed-${theme}`} 
          width="100%" height={300}>
          <LineChart data={telemetry}>
            <CartesianGrid stroke={isDark ? "#2a2a2a" : "#e5e7eb"} />
            <XAxis dataKey="time" stroke={isDark ? "#888" : "#6b7280"} />
            <YAxis stroke={isDark ? "#888" : "#6b7280"} />
            <Tooltip/>
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#e10600"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        className="
          bg-white
          dark:bg-[#161616]
          border
          border-gray-200
          dark:border-[#2e2e2e]
          shadow-md
          dark:shadow-none
          rounded-2xl
          p-5
        "
      >
        <h3 className="text-black dark:text-white font-medium mb-4">
          Throttle / Brake Analysis
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={telemetry}>
            <CartesianGrid stroke={isDark ? "#2a2a2a" : "#e5e7eb"} />
            <XAxis dataKey="time" stroke={isDark ? "#888" : "#6b7280"} />
            <YAxis stroke={isDark ? "#888" : "#6b7280"} />
            <Tooltip/>
            <Line
              type="monotone"
              dataKey="throttle"
              stroke="#22c55e"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="brake"
              stroke="#ef4444"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        className="
          bg-white
          dark:bg-[#161616]
          border
          border-gray-200
          dark:border-[#2e2e2e]
          shadow-md
          dark:shadow-none
          rounded-2xl
          p-5
        "
      >
        <h3 className="text-black dark:text-white font-medium mb-4">
          Steering Stability
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={telemetry}>
            <CartesianGrid stroke={isDark ? "#2a2a2a" : "#e5e7eb"} />
            <XAxis dataKey="time" stroke={isDark ? "#888" : "#6b7280"} />
            <YAxis stroke={isDark ? "#888" : "#6b7280"} />
            <Tooltip/>
            <Line
              type="monotone"
              dataKey="steering"
              stroke="#3b82f6"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        className="
          bg-white
          dark:bg-[#161616]
          border
          border-gray-200
          dark:border-[#2e2e2e]
          shadow-md
          dark:shadow-none
          rounded-2xl
          p-5
        "
      >
        <h3 className="text-black dark:text-white font-medium mb-4">
          Gear Change Timeline
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={telemetry}>
            <CartesianGrid stroke={isDark ? "#2a2a2a" : "#e5e7eb"} />
            <XAxis dataKey="time" stroke={isDark ? "#888" : "#6b7280"} />
            <YAxis stroke={isDark ? "#888" : "#6b7280"} />
            <Tooltip/>
            <Line
              type="stepAfter"
              dataKey="gear"
              stroke="#f59e0b"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}